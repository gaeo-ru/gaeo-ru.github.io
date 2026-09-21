from pathlib import Path
import re
import urllib.request

PROD = "https://gaeo.ru"

MAPPING = {
    "https://static.tildacdn.com/tild6664-6331-4739-b932-303038316334/025.jpg": "/assets/articles/geo-sources-research.jpg",
    "https://static.tildacdn.com/tild3963-6361-4061-b334-396633333136/032.jpg": "/assets/articles/geo-sources-by-ai-platform.jpg",
    "https://static.tildacdn.com/tild3236-3035-4239-b464-336230646566/037.jpg": "/assets/articles/geo-source-structure.jpg",
    "https://static.tildacdn.com/tild6663-3161-4366-b931-326364616464/019.jpg": "/assets/articles/neural-networks-for-business.jpg",
    "https://static.tildacdn.com/tild3336-3166-4133-b234-346264623638/020.jpg": "/assets/articles/geo-cost-factors.jpg",
    "https://static.tildacdn.com/tild3833-3863-4161-a266-356534333733/021.jpg": "/assets/articles/ai-popularity-russia-june-2026.jpg",
    "https://static.tildacdn.com/tild3030-6261-4233-a131-323862623163/022.jpg": "/assets/articles/ai-priority-matrix-russia.jpg",
    "https://static.tildacdn.com/tild3766-6436-4537-a436-633537616330/023.jpg": "/assets/articles/ai-selection-by-business-type.jpg",
    "https://static.tildacdn.com/tild3934-3863-4137-b630-363663336362/024.jpg": "/assets/articles/personal-brand-expert.jpg",
    "https://static.tildacdn.com/tild3764-3536-4431-a633-323731393232/026.jpg": "/assets/articles/geo-real-estate.jpg",
    "https://static.tildacdn.com/tild6637-6335-4634-b736-303064323862/039.jpg": "/assets/articles/real-estate-geo-preaudit.jpg",
    "https://static.tildacdn.com/tild3837-6234-4666-b362-643832313137/040.jpg": "/assets/articles/real-estate-buyer-journey-clusters.jpg",
    "https://static.tildacdn.com/tild6339-3636-4737-b061-306161306137/041.jpg": "/assets/articles/real-estate-buyer-path-attribution.jpg",
    "https://static.tildacdn.com/tild3235-6535-4762-a265-643831653062/042.jpg": "/assets/articles/real-estate-geo-maturity-ladder.jpg",
    "https://static.tildacdn.com/tild3834-3233-4561-a364-353934383935/043.jpg": "/assets/articles/real-estate-evidence-architecture.jpg",
    "https://static.tildacdn.com/tild3633-3437-4134-a235-643031366636/027.jpg": "/assets/cases/gaeo-visibility-growth.jpg",
    "https://static.tildacdn.com/tild3136-6563-4232-b033-616531613866/028.jpg": "/assets/cases/gaeo-chatgpt-no1-2026-08-11.jpg",
    "https://static.tildacdn.com/tild3163-6663-4161-b033-333936636265/029.jpg": "/assets/cases/gaeo-google-ai-mode-no1-2026-08-11.jpg",
    "https://static.tildacdn.com/tild3139-3335-4430-a430-633435636138/030.jpg": "/assets/cases/gaeo-yandex-alice-no1-2026-08-11.jpg",
    "https://static.tildacdn.com/tild6338-3065-4165-b938-646462666638/01__6____.jpg": "/assets/cases/prepcenter-6-paying-clients-cover.jpg",
    "https://static.tildacdn.com/tild6561-3766-4563-a636-376261343130/02______.jpg": "/assets/cases/prepcenter-paying-clients-periods.jpg",
    "https://static.tildacdn.com/tild3239-3132-4033-b133-313961663563/03____.jpg": "/assets/cases/prepcenter-first-orders-volume.jpg",
    "https://static.tildacdn.com/tild3634-6665-4739-b430-636661333963/04_____-.jpg": "/assets/cases/prepcenter-real-cases.jpg",
    "https://static.tildacdn.com/tild3634-6534-4331-b561-623137306335/05___-.jpg": "/assets/cases/prepcenter-bmr-growth.jpg",
    "https://static.tildacdn.com/tild3537-3833-4532-a663-396532303134/06____31-08-2026.jpg": "/assets/cases/prepcenter-bmr-by-ai-2026-08-31.jpg",
    "https://static.tildacdn.com/tild3666-6137-4533-b234-363933343438/07____31-08-2026.jpg": "/assets/cases/prepcenter-bmr-by-cluster-2026-08-31.jpg",
    "https://static.tildacdn.com/tild3461-3039-4431-a537-333565376666/004.jpg": "/assets/alexey-yakovlev-biography.jpg",
    "https://static.tildacdn.com/tild3064-6533-4037-b664-363136343731/000.jpg": "/assets/brand/gaeo-logo-schema.jpg",
}

REUSE = {
    "/assets/articles/geo-sources-research.jpg",
    "/assets/articles/neural-networks-for-business.jpg",
    "/assets/articles/personal-brand-expert.jpg",
    "/assets/articles/geo-real-estate.jpg",
    "/assets/alexey-yakovlev-biography.jpg",
}

def download_missing():
    for old, local in MAPPING.items():
        target = Path(local.lstrip("/"))
        target.parent.mkdir(parents=True, exist_ok=True)
        if local in REUSE and target.exists() and target.stat().st_size > 0:
            continue
        req = urllib.request.Request(old, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as response:
            data = response.read()
        if len(data) < 1024:
            raise RuntimeError(f"Downloaded file is unexpectedly small: {old}")
        target.write_bytes(data)
        print(f"downloaded {old} -> {target} ({len(data)} bytes)")

def update_html():
    changed = []
    jsonld_re = re.compile(r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>.*?</script>', re.I | re.S)
    meta_re = re.compile(r'<meta\b[^>]*>', re.I)

    for path in Path(".").rglob("*.html"):
        text = path.read_text(encoding="utf-8")
        original = text
        for old, local in MAPPING.items():
            text = text.replace(old, local)

        def jsonld_abs(match):
            block = match.group(0)
            for local in MAPPING.values():
                block = block.replace(local, PROD + local)
            return block
        text = jsonld_re.sub(jsonld_abs, text)

        def meta_abs(match):
            tag = match.group(0)
            for local in MAPPING.values():
                tag = tag.replace(f'content="{local}"', f'content="{PROD}{local}"')
                tag = tag.replace(f"content='{local}'", f"content='{PROD}{local}'")
            return tag
        text = meta_re.sub(meta_abs, text)

        if text != original:
            path.write_text(text, encoding="utf-8")
            changed.append(str(path))

    if not changed:
        raise RuntimeError("No HTML files changed.")
    return changed

def verify():
    leftovers = []
    missing = []
    for path in Path(".").rglob("*.html"):
        text = path.read_text(encoding="utf-8")
        if "static.tildacdn.com" in text:
            leftovers.append(str(path))
        for ref in re.findall(r'(?:src|content)=["\'](/assets/[^"\']+)', text):
            clean_ref = ref.split("?", 1)[0].split("#", 1)[0]
            target = Path(clean_ref.lstrip("/"))
            if not target.exists():
                missing.append((str(path), ref))
    if leftovers:
        raise RuntimeError("Remaining Tilda CDN references: " + ", ".join(leftovers))
    if missing:
        raise RuntimeError("Missing local assets: " + repr(missing[:20]))

if __name__ == "__main__":
    download_missing()
    changed = update_html()
    verify()
    print(f"Updated {len(changed)} HTML files.")
