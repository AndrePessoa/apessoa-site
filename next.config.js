/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize CSS delivery
  experimental: {
    optimizeCss: true, // Enable CSS optimization
  },
  // Enable gzip compression
  compress: true,
  webpack(config) {
    // Handle SVG imports with SVGR
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      // Disable all optimizations that might change structure
                      cleanupIds: false,
                      removeViewBox: false,
                      removeEmptyContainers: false,
                      removeUselessStrokeAndFill: false,
                      removeUnknownsAndDefaults: false,
                      removeUselessDefs: false,
                      removeEditorsNSData: false,
                      removeEmptyAttrs: false,
                      removeHiddenElems: false,
                      removeEmptyText: false,
                      removeDesc: false,
                      removeTitle: false,
                      removeDimensions: false,
                      removeStyleElement: false,
                      removeScriptElement: false,
                      collapseGroups: false,
                      convertShapeToPath: false,
                      mergePaths: false,
                      convertPathData: false,
                      convertTransform: false,
                      removeMetadata: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig