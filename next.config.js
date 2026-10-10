/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Standalone output keeps Render/Docker images small;
  // Vercel ignores it safely.
  output: "standalone",
  // Serve images directly from the CDN (Unsplash already returns sized,
  // format-optimised files via its own URL params) — avoids a double hop.
  images: { unoptimized: true, remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
