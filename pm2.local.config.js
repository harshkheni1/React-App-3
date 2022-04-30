module.exports = {
  apps: [
    {
      name: 'gbs-claims-frontend',
      script: 'yarn',
      args: 'dev',
      // interpreter: '/bin/bash',
      env: {
        NODE_ENV: 'local',
        CONSUMER_PORTAL_API_URL: 'https://dev-api.myprotectall.com/consumer_portal',
        CONSUMER_PORTAL_X_API_KEY: 'sl9L7y45IF3WaDH3c5h1JIuiGnDGhEq3ZliTAqbb',
        APP_URL: 'http://localhost:3025',
        AWS_USER_POOL_ID: 'us-east-1_YcWlxSOF6',
        AWS_CLIENT_ID: '250r81o7qoe82u2k74mnlqs5g9',
        AWS_REGION: 'us-east-1',
        AWS_IDENTITY_POOL_ID: 'us-east-1:5dea8457-f2a1-4106-9c6c-a6bcdd1fdb13',
        AWS_S3_BUCKET: 'gbscustomerportaldev',
        AWS_S3_THUMBNAIL_URL: 'https://dev-media.myprotectall.com/claims_documentation',
        AWS_S3_SUPPORTED_FILE_EXTENSIONS: 'png,jpg,jpeg,pdf',
        NEXT_PUBLIC_GOOGLE_ANALYTICS: 'UA-179981887-1',
      },
    },
  ],
};
