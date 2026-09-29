import type { NextConfig } from "next";

// No Content-Security-Policy yet: AdSense, GA4, PostHog and YouTube need an
// allowlist built from observed traffic (start it as Report-Only). No
// X-Frame-Options either: AdSense's ad-preview tool loads the site in a frame.
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
