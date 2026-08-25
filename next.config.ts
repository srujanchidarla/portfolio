import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Keep Turbopack rooted on this app (parent Projects/ has another lockfile)
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    qualities: [75, 92],
  },
};

export default nextConfig;
