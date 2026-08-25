"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";
import { App } from "@capacitor/app";

/** Native polish when running inside Capacitor (Play Store / App Store shell). */
export default function MobileShell() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    void (async () => {
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        await SplashScreen.hide();
      } catch {
        /* plugins optional in browser */
      }
    })();

    const sub = App.addListener("backButton", ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        void App.exitApp();
      }
    });

    return () => {
      void sub.then((h) => h.remove());
    };
  }, []);

  return null;
}
