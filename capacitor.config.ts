import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Hybrid app: native shell loads the live portfolio (API routes stay on Vercel).
 * Set CAPACITOR_SERVER_URL=http://YOUR_LAN_IP:3000 for local dev on device.
 */
const devServer = process.env.CAPACITOR_SERVER_URL;
const productionUrl = process.env.CAPACITOR_PRODUCTION_URL ?? "https://srujanchidarla.com";

const config: CapacitorConfig = {
  appId: "com.srujanchidarla.portfolio",
  appName: "Srujan Chidarla",
  webDir: "mobile/www",
  server: devServer
    ? { url: devServer, cleartext: true }
    : { url: productionUrl, androidScheme: "https" },
  android: {
    allowMixedContent: false,
  },
  ios: {
    contentInset: "automatic",
    preferredContentMode: "mobile",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      launchAutoHide: true,
      backgroundColor: "#0a0a0c",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#0a0a0c",
    },
  },
};

export default config;
