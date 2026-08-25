import { Capacitor } from "@capacitor/core";
import { Share } from "@capacitor/share";
import { SITE } from "@/lib/site";

export async function sharePortfolio(): Promise<boolean> {
  const payload = {
    title: `${SITE.name} — Portfolio`,
    text: SITE.tagline,
    url: SITE.website,
    dialogTitle: "Share portfolio",
  };

  if (Capacitor.isNativePlatform()) {
    try {
      await Share.share(payload);
      return true;
    } catch {
      return false;
    }
  }

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share(payload);
      return true;
    } catch {
      return false;
    }
  }

  return false;
}

export function canSharePortfolio(): boolean {
  if (Capacitor.isNativePlatform()) return true;
  return typeof navigator !== "undefined" && Boolean(navigator.share);
}
