import { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos"],
  },
  webpack(config, { isServer }) {
    // Add support for .ts and .tsx extensions
    config.resolve.extensions.push(".ts", ".tsx");

    // Add path alias for '@components' to point to 'app/_components'
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "app/_components"),
      "@context": path.resolve(__dirname, "app/_context"),
    };

    // Add a rule for handling .scss files with style-loader, css-loader, and sass-loader
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    });

    // Add a rule for handling .svg files using file-loader
    config.module.rules.push({
      test: /\.svg$/,
      use: ["file-loader"],
    });

    return config;
  },
};

export default nextConfig;
