import type { NextConfig } from "next";

const nextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
} as NextConfig;

export default nextConfig;
