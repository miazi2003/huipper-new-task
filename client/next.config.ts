import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
    ],
  },
  async rewrites() {
    const serverApiUrl = process.env.SERVER_API_URL ?? "http://127.0.0.1:4000";

    return [
      {
        source: "/api/admin/:path*",
        destination: `${serverApiUrl}/api/admin/:path*`,
      },
      {
        source: "/api/site-settings",
        destination: `${serverApiUrl}/api/site-settings`,
      },
      {
        source: "/api/contact",
        destination: `${serverApiUrl}/api/contact`,
      },
      {
        source: "/api/projects",
        destination: `${serverApiUrl}/api/projects`,
      },
      {
        source: "/api/projects/:path*",
        destination: `${serverApiUrl}/api/projects/:path*`,
      },
      {
        source: "/api/testimonials",
        destination: `${serverApiUrl}/api/testimonials`,
      },
      {
        source: "/api/testimonials/:path*",
        destination: `${serverApiUrl}/api/testimonials/:path*`,
      },
    ];
  },
};

export default nextConfig;
