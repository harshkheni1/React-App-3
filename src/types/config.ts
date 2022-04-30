export interface PublicRuntimeConfig {
  CONSUMER_PORTAL_API_URL: string;
  CONSUMER_PORTAL_X_API_KEY: string;

  APP_URL: string;
  TOKEN_REFRESH_INTERVAL: number;

  //Cognito
  AWS_USER_POOL_ID: string;
  AWS_IDENTITY_POOL_ID: string;
  AWS_CLIENT_ID: string;
  AWS_REGION: string;

  //S3
  AWS_S3_BUCKET: string;
  AWS_S3_THUMBNAIL_URL: string;
  AWS_S3_SUPPORTED_FILE_EXTENSIONS: string;
  PDF_THUMBNAIL_URL: string;

  //ga
  NEXT_PUBLIC_GOOGLE_ANALYTICS: string;
}
