import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    const serverApiUrl = process.env.SERVER_API_URL ?? "http://127.0.0.1:4000";

    return [
      {
        source: "/api/admin/:path*",
        destination: `${serverApiUrl}/api/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
