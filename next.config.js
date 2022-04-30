/* eslint-disable @typescript-eslint/no-var-requires */
// next.config.js
const withImages = require('next-images');
const withSourceMaps = require('@zeit/next-source-maps');

module.exports = withSourceMaps({
  ...withImages({
    basePath: '', //configure if using subdomain
    assetPrefix: process.env.ASSET_PREFIX || '',
    inlineImageLimit: 16384,
    publicRuntimeConfig: {
      CONSUMER_PORTAL_API_URL:
        process.env.CONSUMER_PORTAL_API_URL || 'https://dev-api.myprotectall.com/consumer_portal',
      CONSUMER_PORTAL_X_API_KEY: process.env.CONSUMER_PORTAL_X_API_KEY || 'sl9L7y45IF3WaDH3c5h1JIuiGnDGhEq3ZliTAqbb',
      AWS_USER_POOL_ID: process.env.AWS_USER_POOL_ID || 'us-east-1_YcWlxSOF6',
      AWS_CLIENT_ID: process.env.AWS_CLIENT_ID || '250r81o7qoe82u2k74mnlqs5g9',
      APP_URL: process.env.APP_URL || 'http://localhost:3025',
      TOKEN_REFRESH_INTERVAL: process.env.TOKEN_REFRESH_INTERVAL || 60 * 5,
      AWS_REGION: process.env.AWS_REGION || 'us-east-1',
      AWS_IDENTITY_POOL_ID: process.env.AWS_IDENTITY_POOL_ID || 'us-east-1:5dea8457-f2a1-4106-9c6c-a6bcdd1fdb13',
      AWS_S3_BUCKET: process.env.AWS_S3_BUCKET || 'gbscustomerportaldev',
      AWS_S3_THUMBNAIL_URL:
        process.env.AWS_S3_THUMBNAIL_URL || 'https://dev-media.myprotectall.com/claims_documentation',
      AWS_S3_SUPPORTED_FILE_EXTENSIONS: process.env.AWS_S3_SUPPORTED_FILE_EXTENSIONS || 'png,jpg,jpeg,pdf',
      PDF_THUMBNAIL_URL: process.env.PDF_THUMBNAIL_URL || 'https://gbspublicassets.s3.amazonaws.com/pdf.png',
      NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || 'UA-179981887-1',
    },
    distDir: '.next',
    cssModules: false,
    webpack: (config, { webpack }) => {
      config.module.rules.push({
        loader: 'url-loader',
        test: /\.(eot|ttf|woff|woff2)?$/,
      });
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
      });
      config.plugins = [...config.plugins, new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/)];

      // Further custom configuration here
      return config;
    },
  }),
});
