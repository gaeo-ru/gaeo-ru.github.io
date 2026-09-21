package main

import (
	"bufio"
	"context"
	"crypto/sha256"
	"crypto/tls"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"mime"
	"net"
	"net/http"
	"net/mail"
	"net/smtp"
	"net/url"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"
)

type config struct {
	listen         string
	allowedOrigins map[string]bool
	smtpHost       string
	smtpPort       int
	smtpUser       string
	smtpPassword   string
	from           string
	to             string
}

type leadRequest struct {
	Site          string            `json:"site"`
	Lang          string            `json:"lang"`
	FullName      string            `json:"full_name"`
	Phone         string            `json:"phone"`
	PhoneCountry  string            `json:"phone_country"`
	Email         string            `json:"email"`
	Comment       string            `json:"comment"`
	Honeypot      string            `json:"company_website"`
	PageURL       string            `json:"page_url"`
	Referrer      string            `json:"referrer"`
	UTM           map[string]string `json:"utm"`
	FormStartedAt string            `json:"form_started_at"`
	SubmittedAt   string            `json:"submitted_at"`
}

type memoryGuard struct {
	mu         sync.Mutex
	requests   map[string][]time.Time
	duplicates map[[32]byte]time.Time
}

func main() {
	cfg := mustConfig()
	guard := &memoryGuard{requests: map[string][]time.Time{}, duplicates: map[[32]byte]time.Time{}}

	mux := http.NewServeMux()
	mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		w.WriteHeader(http.StatusOK)
		_, _ = io.WriteString(w, "ok\n")
	})
	mux.HandleFunc("/v1/lead", leadHandler(cfg, guard))

	srv := &http.Server{
		Addr:              cfg.listen,
		Handler:           securityHeaders(mux),
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      15 * time.Second,
		IdleTimeout:       30 * time.Second,
	}

	log.Printf("GAEO forms listening on %s", cfg.listen)
	if err := srv.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
		log.Fatal(err)
	}
}

func mustConfig() config {
	port := envInt("GAEO_FORMS_SMTP_PORT", 587)
	origins := map[string]bool{}
	for _, v := range strings.Split(os.Getenv("GAEO_FORMS_ALLOWED_ORIGINS"), ",") {
		v = strings.TrimSpace(v)
		if v != "" {
			origins[v] = true
		}
	}
	cfg := config{
		listen:         envDefault("GAEO_FORMS_LISTEN", "127.0.0.1:8787"),
		allowedOrigins: origins,
		smtpHost:       envDefault("GAEO_FORMS_SMTP_HOST", "smtp.yandex.ru"),
		smtpPort:       port,
		smtpUser:       strings.TrimSpace(os.Getenv("GAEO_FORMS_SMTP_USER")),
		smtpPassword:   os.Getenv("GAEO_FORMS_SMTP_PASSWORD"),
		from:           strings.TrimSpace(os.Getenv("GAEO_FORMS_FROM")),
		to:             strings.TrimSpace(os.Getenv("GAEO_FORMS_TO")),
	}
	for name, value := range map[string]string{
		"GAEO_FORMS_SMTP_USER": cfg.smtpUser,
		"GAEO_FORMS_SMTP_PASSWORD": cfg.smtpPassword,
		"GAEO_FORMS_FROM": cfg.from,
		"GAEO_FORMS_TO": cfg.to,
	} {
		if value == "" {
			log.Fatalf("%s is required", name)
		}
	}
	return cfg
}

func leadHandler(cfg config, guard *memoryGuard) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		origin := strings.TrimSpace(r.Header.Get("Origin"))
		if origin != "" {
			if !cfg.allowedOrigins[origin] {
				http.Error(w, "origin not allowed", http.StatusForbidden)
				return
			}
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin")
			w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		}
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		if r.Method != http.MethodPost {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}
		if ct := strings.ToLower(r.Header.Get("Content-Type")); !strings.HasPrefix(ct, "application/json") {
			http.Error(w, "application/json required", http.StatusUnsupportedMediaType)
			return
		}

		clientIP := realIP(r)
		if !guard.allow(clientIP, 10, 10*time.Minute) {
			writeJSON(w, http.StatusTooManyRequests, map[string]any{"ok": false, "error": "rate_limited"})
			return
		}

		r.Body = http.MaxBytesReader(w, r.Body, 32*1024)
		dec := json.NewDecoder(r.Body)
		dec.DisallowUnknownFields()
		var lead leadRequest
		if err := dec.Decode(&lead); err != nil {
			writeJSON(w, http.StatusBadRequest, map[string]any{"ok": false, "error": "invalid_json"})
			return
		}
		if dec.Decode(&struct{}{}) != io.EOF {
			writeJSON(w, http.StatusBadRequest, map[string]any{"ok": false, "error": "invalid_json"})
			return
		}

		lead = cleanLead(lead)

		// Honeypot: pretend success so simple bots do not learn how they were caught.
		if lead.Honeypot != "" {
			writeJSON(w, http.StatusOK, map[string]any{"ok": true})
			return
		}

		if err := validateLead(lead); err != nil {
			writeJSON(w, http.StatusUnprocessableEntity, map[string]any{"ok": false, "error": err.Error()})
			return
		}

		hash := duplicateHash(lead)
		if guard.isDuplicate(hash, 15*time.Minute) {
			writeJSON(w, http.StatusOK, map[string]any{"ok": true, "duplicate": true})
			return
		}

		ctx, cancel := context.WithTimeout(r.Context(), 12*time.Second)
		defer cancel()
		if err := sendMail(ctx, cfg, lead, r.UserAgent()); err != nil {
			log.Printf("mail send failed: %v", err)
			writeJSON(w, http.StatusBadGateway, map[string]any{"ok": false, "error": "delivery_failed"})
			return
		}
		guard.remember(hash)
		log.Printf("lead delivered site=%s lang=%s", safeLog(lead.Site), safeLog(lead.Lang))
		writeJSON(w, http.StatusOK, map[string]any{"ok": true})
	}
}

func cleanLead(v leadRequest) leadRequest {
	v.Site = strings.TrimSpace(v.Site)
	v.Lang = strings.TrimSpace(v.Lang)
	v.FullName = strings.TrimSpace(v.FullName)
	v.Phone = strings.TrimSpace(v.Phone)
	v.PhoneCountry = strings.TrimSpace(v.PhoneCountry)
	v.Email = strings.TrimSpace(v.Email)
	v.Comment = strings.TrimSpace(v.Comment)
	v.Honeypot = strings.TrimSpace(v.Honeypot)
	v.PageURL = strings.TrimSpace(v.PageURL)
	v.Referrer = strings.TrimSpace(v.Referrer)
	if v.UTM == nil {
		v.UTM = map[string]string{}
	}
	return v
}

func validateLead(v leadRequest) error {
	if v.Site != "gaeo" {
		return errors.New("invalid_site")
	}
	if v.Lang != "ru" && v.Lang != "en" && v.Lang != "cn" {
		return errors.New("invalid_lang")
	}
	if len([]rune(v.FullName)) < 2 || len([]rune(v.FullName)) > 180 {
		return errors.New("invalid_name")
	}
	if v.Phone == "" && v.Email == "" {
		return errors.New("contact_required")
	}
	if v.Phone != "" {
		if !validPhone(v.Phone) {
			return errors.New("invalid_phone")
		}
		if len(v.PhoneCountry) != 2 {
			return errors.New("invalid_phone_country")
		}
	}
	if v.Email != "" {
		if len(v.Email) > 254 {
			return errors.New("invalid_email")
		}
		addr, err := mail.ParseAddress(v.Email)
		if err != nil || !strings.EqualFold(addr.Address, v.Email) {
			return errors.New("invalid_email")
		}
	}
	if len([]rune(v.Comment)) > 3000 {
		return errors.New("comment_too_long")
	}
	if len(v.PageURL) > 2000 || len(v.Referrer) > 2000 {
		return errors.New("url_too_long")
	}
	if v.PageURL != "" {
		u, err := url.ParseRequestURI(v.PageURL)
		if err != nil || (u.Scheme != "http" && u.Scheme != "https") {
			return errors.New("invalid_page_url")
		}
	}
	for k, val := range v.UTM {
		if len(k) > 64 || len(val) > 500 {
			return errors.New("invalid_utm")
		}
	}
	return nil
}

func validPhone(s string) bool {
	if !strings.HasPrefix(s, "+") {
		return false
	}
	digits := 0
	for i, r := range s {
		if i == 0 {
			continue
		}
		if r < '0' || r > '9' {
			return false
		}
		digits++
	}
	return digits >= 7 && digits <= 18
}

func (g *memoryGuard) allow(ip string, max int, window time.Duration) bool {
	now := time.Now()
	g.mu.Lock()
	defer g.mu.Unlock()
	arr := g.requests[ip]
	cut := now.Add(-window)
	out := arr[:0]
	for _, t := range arr {
		if t.After(cut) {
			out = append(out, t)
		}
	}
	if len(out) >= max {
		g.requests[ip] = out
		return false
	}
	g.requests[ip] = append(out, now)
	return true
}

func (g *memoryGuard) isDuplicate(h [32]byte, ttl time.Duration) bool {
	g.mu.Lock()
	defer g.mu.Unlock()
	t, ok := g.duplicates[h]
	return ok && time.Since(t) < ttl
}

func (g *memoryGuard) remember(h [32]byte) {
	g.mu.Lock()
	defer g.mu.Unlock()
	now := time.Now()
	g.duplicates[h] = now
	for k, t := range g.duplicates {
		if now.Sub(t) > time.Hour {
			delete(g.duplicates, k)
		}
	}
}

func duplicateHash(v leadRequest) [32]byte {
	s := strings.ToLower(strings.Join([]string{
		v.FullName, v.Phone, v.Email, v.Comment, v.PageURL,
	}, "\n"))
	return sha256.Sum256([]byte(s))
}

func sendMail(ctx context.Context, cfg config, lead leadRequest, userAgent string) error {
	subject := mime.QEncoding.Encode("UTF-8", "GAEO.ru: новая заявка")
	body := buildMailBody(lead, userAgent)
	msg := strings.Join([]string{
		"From: GAEO.ru <" + cfg.from + ">",
		"To: " + cfg.to,
		"Subject: " + subject,
		"Date: " + time.Now().Format(time.RFC1123Z),
		"MIME-Version: 1.0",
		"Content-Type: text/plain; charset=UTF-8",
		"Content-Transfer-Encoding: 8bit",
		"",
		body,
	}, "\r\n")

	addr := net.JoinHostPort(cfg.smtpHost, strconv.Itoa(cfg.smtpPort))
	dialer := &net.Dialer{Timeout: 8 * time.Second}
	conn, err := dialer.DialContext(ctx, "tcp", addr)
	if err != nil {
		return err
	}
	defer conn.Close()

	client, err := smtp.NewClient(conn, cfg.smtpHost)
	if err != nil {
		return err
	}
	defer client.Close()

	tlsCfg := &tls.Config{ServerName: cfg.smtpHost, MinVersion: tls.VersionTLS12}
	if err := client.StartTLS(tlsCfg); err != nil {
		return err
	}
	auth := smtp.PlainAuth("", cfg.smtpUser, cfg.smtpPassword, cfg.smtpHost)
	if err := client.Auth(auth); err != nil {
		return err
	}
	if err := client.Mail(cfg.from); err != nil {
		return err
	}
	if err := client.Rcpt(cfg.to); err != nil {
		return err
	}
	w, err := client.Data()
	if err != nil {
		return err
	}
	bw := bufio.NewWriter(w)
	if _, err := bw.WriteString(msg); err != nil {
		_ = w.Close()
		return err
	}
	if err := bw.Flush(); err != nil {
		_ = w.Close()
		return err
	}
	if err := w.Close(); err != nil {
		return err
	}
	return client.Quit()
}

func buildMailBody(v leadRequest, userAgent string) string {
	var b strings.Builder
	fmt.Fprintf(&b, "Новая заявка с GAEO.ru\n\n")
	fmt.Fprintf(&b, "ФИО: %s\n", v.FullName)
	fmt.Fprintf(&b, "Телефон: %s\n", dash(v.Phone))
	fmt.Fprintf(&b, "Страна телефона: %s\n", dash(strings.ToUpper(v.PhoneCountry)))
	fmt.Fprintf(&b, "Email: %s\n", dash(v.Email))
	fmt.Fprintf(&b, "Язык страницы: %s\n", v.Lang)
	fmt.Fprintf(&b, "\nКомментарий:\n%s\n", dash(v.Comment))
	fmt.Fprintf(&b, "\nСтраница: %s\n", dash(v.PageURL))
	fmt.Fprintf(&b, "Referrer: %s\n", dash(v.Referrer))
	if len(v.UTM) > 0 {
		fmt.Fprintf(&b, "\nАтрибуция:\n")
		keys := []string{"utm_source","utm_medium","utm_campaign","utm_content","utm_term","gclid","yclid"}
		for _, k := range keys {
			if val := strings.TrimSpace(v.UTM[k]); val != "" {
				fmt.Fprintf(&b, "%s: %s\n", k, val)
			}
		}
	}
	fmt.Fprintf(&b, "\nUser-Agent: %s\n", dash(strings.TrimSpace(userAgent)))
	fmt.Fprintf(&b, "Получено сервером: %s\n", time.Now().Format(time.RFC3339))
	return b.String()
}

func realIP(r *http.Request) string {
	if v := strings.TrimSpace(r.Header.Get("X-Real-IP")); net.ParseIP(v) != nil {
		return v
	}
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err == nil && net.ParseIP(host) != nil {
		return host
	}
	return "unknown"
}

func securityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Cache-Control", "no-store")
		w.Header().Set("Referrer-Policy", "no-referrer")
		next.ServeHTTP(w, r)
	})
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func dash(s string) string {
	if strings.TrimSpace(s) == "" {
		return "—"
	}
	return s
}

func safeLog(s string) string {
	s = strings.ReplaceAll(s, "\n", " ")
	s = strings.ReplaceAll(s, "\r", " ")
	if len(s) > 40 {
		s = s[:40]
	}
	return s
}

func envDefault(k, d string) string {
	if v := strings.TrimSpace(os.Getenv(k)); v != "" {
		return v
	}
	return d
}

func envInt(k string, d int) int {
	v := strings.TrimSpace(os.Getenv(k))
	if v == "" {
		return d
	}
	n, err := strconv.Atoi(v)
	if err != nil {
		log.Fatalf("%s must be an integer", k)
	}
	return n
}
