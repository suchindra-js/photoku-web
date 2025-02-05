import { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["picsum.photos"],
  },
  webpack(config, { isServer }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "app/_components"),
      "@context": path.resolve(__dirname, "app/_context"),
    };
    return config;
  },
};

export default nextConfig;
