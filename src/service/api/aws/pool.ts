import { CognitoUserPool } from 'amazon-cognito-identity-js';
import getConfig from 'next/config';

import { PublicRuntimeConfig } from '@/core-types/config';

const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();
const { AWS_USER_POOL_ID, AWS_CLIENT_ID } = publicRuntimeConfig;

const data = {
  UserPoolId: AWS_USER_POOL_ID,
  ClientId: AWS_CLIENT_ID,
};

export const awsUserPool = new CognitoUserPool(data);
