module.exports = {
  apps: [
    {
      name: 'gbs-claims-frontend',
      script: 'yarn',
      args: 'start',
      // interpreter: '/bin/bash',
      env: {
        NODE_ENV: 'development',
        CONSUMER_PORTAL_API_URL: 'https://dev-api.myprotectall.com/consumer_portal',
        CONSUMER_PORTAL_X_API_KEY: 'sl9L7y45IF3WaDH3c5h1JIuiGnDGhEq3ZliTAqbb',
        APP_URL: 'https://dev-portal.myprotectall.com',
        AWS_USER_POOL_ID: 'us-east-1_YcWlxSOF6',
        AWS_CLIENT_ID: '250r81o7qoe82u2k74mnlqs5g9',
        AWS_REGION: 'us-east-1',
        AWS_IDENTITY_POOL_ID: 'us-east-1:5dea8457-f2a1-4106-9c6c-a6bcdd1fdb13',
        AWS_S3_BUCKET: 'gbscustomerportaldev',
        AWS_S3_THUMBNAIL_URL: 'https://dev-media.myprotectall.com/claims_documentation',
        AWS_S3_SUPPORTED_FILE_EXTENSIONS: 'png,jpg,jpeg,pdf',
        NEXT_PUBLIC_GOOGLE_ANALYTICS: 'UA-179981887-1',
      },
      env_uat: {
        NODE_ENV: 'uat',
        CONSUMER_PORTAL_API_URL: 'https://uat-api.myprotectall.com/consumer_portal',
        CONSUMER_PORTAL_X_API_KEY: 'uzYocEDK4St5CCN7pRdz1QuR69ukgst8ha4Nosvg',
        APP_URL: 'https://uat-portal.myprotectall.com',
        AWS_USER_POOL_ID: 'us-east-1_QAEc5BAFB',
        AWS_CLIENT_ID: '1bg9557cp6u4nao4t18vbq3dp4',
        AWS_REGION: 'us-east-1',
        AWS_IDENTITY_POOL_ID: 'us-east-1:56addb1d-0ede-4cfe-9d04-13a31b2b3959',
        AWS_S3_BUCKET: 'gbscustomerportalqa',
        AWS_S3_THUMBNAIL_URL: 'https://uat-media.myprotectall.com/claims_documentation',
        AWS_S3_SUPPORTED_FILE_EXTENSIONS: 'png,jpg,jpeg,pdf',
        NEXT_PUBLIC_GOOGLE_ANALYTICS: 'UA-179981887-1',
      },
      env_production: {
        NODE_ENV: 'production',
        CONSUMER_PORTAL_API_URL: 'https://api.myprotectall.com/consumer_portal',
        CONSUMER_PORTAL_X_API_KEY: 'T4x8ndqQXi7SQS2qut58a8iF5SyNO1P381HqLWK4',
        APP_URL: 'https://portal.myprotectall.com',
        AWS_USER_POOL_ID: 'us-east-1_CDSV2ZCkJ',
        AWS_CLIENT_ID: '1g8921ci71n0b3lnjargpdej6k',
        AWS_REGION: 'us-east-1',
        AWS_IDENTITY_POOL_ID: 'us-east-1:bbd6834e-de73-48de-a0f5-30bd3a61cf0f',
        AWS_S3_BUCKET: 'gbscustomerportal',
        AWS_S3_THUMBNAIL_URL: 'https://media.myprotectall.com/claims_documentation',
        AWS_S3_SUPPORTED_FILE_EXTENSIONS: 'png,jpg,jpeg,pdf',
        NEXT_PUBLIC_GOOGLE_ANALYTICS: 'UA-179981887-1',
      },
    },
  ],
};
