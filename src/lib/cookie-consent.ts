export const COOKIE_CONSENT_KEY = "cookie-consent";
export const COOKIE_CONSENT_EVENT = "cookie-consent-change";

export type CookieConsentValue = "accepted" | "essential";

/** EEA, UK, and Switzerland — common ePrivacy banner scope */
const EU_REGIONS = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "IS",
  "LI",
  "NO",
  "GB",
  "CH",
]);

export function readCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  if (stored === "accepted" || stored === "essential") return stored;
  return null;
}

export function writeCookieConsent(value: CookieConsentValue): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
}

export function isLikelyEU(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;

  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const lang of langs) {
    const region = lang.split("-")[1]?.toUpperCase();
    if (region && EU_REGIONS.has(region)) return true;
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith("Europe/")) return true;
  } catch {
    /* ignore */
  }

  return false;
}

export function analyticsAllowed(consent: CookieConsentValue | null, eu: boolean): boolean {
  if (consent === "essential") return false;
  if (consent === "accepted") return true;
  return !eu;
}
