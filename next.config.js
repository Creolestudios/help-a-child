/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  images: {
    domains: [
      "admin.villapinedo.nl",
      "randomuser.me",
      "picsum.photos",
      "www.villapinedo.nl",
      "admin-stg.villapinedo.nl",
    ],
  },
  experimental: {
    largePageDataBytes: 2048 * 10000,
  },
};

if (!process.env.LOCAL) {
  moduleExports.sentry = {
    hideSourceMaps: true,
  };
}

const sentryWebpackPluginOptions = {
  token: process.env.SENTRY_AUTH_TOKEN,
  // silent: true, // Suppresses all logs
};

module.exports = !process.env.LOCAL
  ? withSentryConfig(moduleExports, sentryWebpackPluginOptions)
  : moduleExports;
