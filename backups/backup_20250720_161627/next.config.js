/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // ⚡ Minification rapide avec SWC
  trailingSlash: true, // ✅ Évite les 404 sur pages statiques

  experimental: { appDir: true }, // ✅ Activation AppDir sans écraser la config

  // 🌐 Redirections pour forcer HTTPS et www
  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [{ type: "host", value: "oradia.fr" }],
        permanent: true,
        destination: "https://www.oradia.fr/:1"
      }
    ];
  },

  // 🔁 Réécritures pour proxy API Railway
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://backend-oradia-production.up.railway.app/api/:path*"
      }
    ];
  },

  // 🛡️ Headers CORS pour l’API
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
