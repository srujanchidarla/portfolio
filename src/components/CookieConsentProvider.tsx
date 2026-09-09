"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  analyticsAllowed,
  COOKIE_CONSENT_EVENT,
  isLikelyEU,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentValue,
} from "@/lib/cookie-consent";

type CookieConsentContextValue = {
  consent: CookieConsentValue | null;
  isEU: boolean;
  setConsent: (value: CookieConsentValue) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}

function ConsentAnalytics() {
  const [consent, setConsent] = useState<CookieConsentValue | null>(() => {
    if (typeof window === "undefined") return null;

    const stored = readCookieConsent();
    if (stored) return stored;

    const euVisitor = isLikelyEU();
    if (!euVisitor) {
      writeCookieConsent("accepted");
      return "accepted";
    }

    return null;
  });

  const [eu] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return isLikelyEU();
  });

  useEffect(() => {
    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<CookieConsentValue>).detail;
      setConsent(detail);
    };

    if (typeof window === "undefined") return undefined;

    window.addEventListener(COOKIE_CONSENT_EVENT, onChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onChange);
  }, []);

  if (!analyticsAllowed(consent, eu)) return null;
  return null;
}

function CookieConsentBanner() {
  const { consent, isEU, setConsent } = useCookieConsent();

  useEffect(() => {
    if (!isEU || consent !== null) {
      document.body.classList.remove("has-cookie-banner");
      return;
    }
    document.body.classList.add("has-cookie-banner");
    return () => document.body.classList.remove("has-cookie-banner");
  }, [consent, isEU]);

  if (!isEU || consent !== null) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="cookie-banner__inner wrap">
        <div className="cookie-banner__text">
          <p id="cookie-banner-title" className="cookie-banner__title">
            Cookies & analytics
          </p>
          <p id="cookie-banner-desc" className="cookie-banner__desc">
            We use privacy-friendly analytics to understand traffic — no ads or cross-site
            tracking.{" "}
            <Link href="/cookies">Cookie policy</Link> · <Link href="/privacy">Privacy</Link>
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button type="button" className="btn-secondary cookie-banner__btn" onClick={() => setConsent("essential")}>
            Essential only
          </button>
          <button type="button" className="btn-primary cookie-banner__btn" onClick={() => setConsent("accepted")}>
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<CookieConsentValue | null>(() =>
    readCookieConsent()
  );
  const [isEU] = useState(() => isLikelyEU());

  const setConsent = useCallback((value: CookieConsentValue) => {
    writeCookieConsent(value);
    setConsentState(value);
  }, []);

  return (
    <CookieConsentContext.Provider value={{ consent, isEU, setConsent }}>
      {children}
      <CookieConsentBanner />
      <ConsentAnalytics />
    </CookieConsentContext.Provider>
  );
}
