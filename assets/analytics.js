(function () {
  'use strict';

  var COUNTER_ID = 109744589;
  var CONSENT_MODE = 'none'; // Change to "required" when a consent banner is enabled.
  var CONSENT_KEY = 'gaeo_analytics_consent';
  var TRACKING_KEY = 'gaeo_tracking_v1';
  var TRACKING_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'utm_id',
    'gclid',
    'yclid',
    'ysclid'
  ];

  function safeStorage(storage) {
    try {
      var probe = '__gaeo_probe__';
      storage.setItem(probe, '1');
      storage.removeItem(probe);
      return storage;
    } catch (e) {
      return null;
    }
  }

  var session = safeStorage(window.sessionStorage);
  var local = safeStorage(window.localStorage);

  function queryTracking() {
    var result = {};
    var params = new URLSearchParams(window.location.search);
    TRACKING_KEYS.forEach(function (key) {
      var value = params.get(key);
      if (value) result[key] = value.slice(0, 500);
    });
    return result;
  }

  function storedTracking() {
    if (!session) return {};
    try {
      var parsed = JSON.parse(session.getItem(TRACKING_KEY) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function persistTracking() {
    var current = queryTracking();
    var previous = storedTracking();
    var merged = Object.assign({}, previous, current);
    if (session && Object.keys(merged).length) {
      try {
        session.setItem(TRACKING_KEY, JSON.stringify(merged));
      } catch (e) {}
    }
    return merged;
  }

  var tracking = persistTracking();

  function consentValue() {
    if (!local) return null;
    try {
      return local.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function consentAllowsAnalytics() {
    return CONSENT_MODE !== 'required' || consentValue() === 'granted';
  }

  function ensureQueue() {
    if (typeof window.ym === 'function') return;
    window.ym = function () {
      (window.ym.a = window.ym.a || []).push(arguments);
    };
    window.ym.l = 1 * new Date();
  }

  function loadLibrary() {
    if (document.querySelector('script[data-gaeo-metrika-library]')) return;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://mc.yandex.ru/metrika/tag.js';
    script.setAttribute('data-gaeo-metrika-library', 'true');
    var first = document.getElementsByTagName('script')[0];
    if (first && first.parentNode) {
      first.parentNode.insertBefore(script, first);
    } else {
      document.head.appendChild(script);
    }
  }

  function start() {
    if (window.__gaeoMetrikaInitialized || !consentAllowsAnalytics()) return false;
    window.__gaeoMetrikaInitialized = true;
    window.mainMetrikaId = COUNTER_ID;

    ensureQueue();
    loadLibrary();

    window.ym(COUNTER_ID, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    });

    if (Object.keys(tracking).length) {
      window.ym(COUNTER_ID, 'params', {
        gaeo_tracking: tracking
      });
    }

    return true;
  }

  function goal(name, params) {
    if (!name || !consentAllowsAnalytics()) return false;
    start();
    if (typeof window.ym !== 'function') return false;
    window.ym(COUNTER_ID, 'reachGoal', name, params || {});
    return true;
  }

  function setConsent(value) {
    if (value !== 'granted' && value !== 'denied') {
      throw new Error('Analytics consent must be "granted" or "denied".');
    }
    if (local) {
      try {
        local.setItem(CONSENT_KEY, value);
      } catch (e) {}
    }
    if (value === 'granted') start();
  }

  document.addEventListener('gaeo:lead-success', function (event) {
    var detail = event && event.detail ? event.detail : {};
    goal('lead_submit_success', {
      form_mode: detail.mode || 'unknown',
      lang: detail.lang || document.documentElement.lang || 'unknown',
      page_path: window.location.pathname
    });
  });

  window.GAEOAnalytics = {
    counterId: COUNTER_ID,
    consentMode: CONSENT_MODE,
    getTracking: function () {
      return Object.assign({}, storedTracking(), queryTracking());
    },
    goal: goal,
    setConsent: setConsent,
    start: start
  };

  if (consentAllowsAnalytics()) start();
})();
