// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const { withSentryConfig } = require("@sentry/nextjs");

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
};

const sentryConfig = {
  silent: true,
  include: 'dist/apps/frontend/.next',
  ignore: ['node_modules', 'webpack.config.js'],
  configFile: "dist/apps/frontend/sentry.properties",
  org: 'expensio',
  project: 'frontend'
}

module.exports = withSentryConfig(withNx(nextConfig), sentryConfig);
