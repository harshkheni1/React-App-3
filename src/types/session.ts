import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { User } from './user';

export interface Session {
  user: User;
  expiresAt?: number;
  refreshToken?: string;

  //identitiy pool credentials
  accessKeyId?: string;
  secretAccessKey?: string;
  sessionToken?: string;
}

export const SessionKeys = [
  'expiresAt',
  'uemail',
  'refreshToken',
  'uextid',
  'accessKeyId',
  'secretAccessKey',
  'sessionToken',
];

export type CookieSessionInterface = {
  readonly uemail: string;
  readonly uextid?: number;
  readonly refreshToken: string;
  readonly expiresAt: number;

  readonly accessKeyId?: string;
  readonly secretAccessKey?: string;
  readonly sessionToken?: string;
};

export interface CognitoIdentityPoolUserSession {
  core: CognitoUserSession;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
}
