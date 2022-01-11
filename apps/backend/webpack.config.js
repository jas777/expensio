const SentryWebpackPlugin = require('@sentry/webpack-plugin');

module.exports = (config, context) => {
  return {
    ...config,
    // other webpack configuration
    devtool: 'source-map',
    plugins: [
      new SentryWebpackPlugin({
        // sentry-cli configuration - can also be done directly through sentry-cli
        // see https://docs.sentry.io/product/cli/configuration/ for details
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        release:
          context.configuration === 'production'
            ? process.env.SENTRY_RELEASE
            : 'development',

        // other SentryWebpackPlugin configuration
        include: 'dist/apps/backend',
        ignore: ['node_modules', 'webpack.config.js'],
      }),
    ],
  };
};
