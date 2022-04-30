import {
  ISignUpResult,
  CognitoUserAttribute,
  CognitoUserSession,
  CognitoRefreshToken,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import getConfig from 'next/config';
import * as AWS from 'aws-sdk/global';

import { patchAWSTemporaryCreds } from '../../axiosAwsSignedUser';

import { awsUserPool } from './pool';
import { CognitoMappedUserInterface } from '@/core-types/auth';
import { PublicRuntimeConfig } from '@/core-types/config';
import { CognitoIdentityPoolUserSession } from '@/core-types/session';

const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();
const { AWS_REGION, AWS_IDENTITY_POOL_ID } = publicRuntimeConfig;

export const cognitoLogin = async (email: string, password: string): Promise<CognitoMappedUserInterface | Error> => {
  try {
    (AWS.config.credentials as AWS.CognitoIdentityCredentials)?.clearCachedId();
  } catch (error) {
    AWS.config.region = AWS_REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: AWS_IDENTITY_POOL_ID,
    });
    (AWS.config.credentials as AWS.CognitoIdentityCredentials)?.clearCachedId();
  }

  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: awsUserPool,
    });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.setAuthenticationFlowType('USER_PASSWORD_AUTH');
    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        let userData: CognitoMappedUserInterface = {
          idToken: data.getIdToken(),
          refreshToken: data.getRefreshToken().getToken(),
          expiresAt: data.getAccessToken().getExpiration(),
        };

        AWS.config.region = AWS_REGION;
        const cognitoIdentityCredentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: AWS_IDENTITY_POOL_ID,
          Logins: {
            [`cognito-idp.${AWS_REGION}.amazonaws.com/${awsUserPool.getUserPoolId()}`]: data.getIdToken().getJwtToken(),
          },
        });
        cognitoIdentityCredentials.clearCachedId();
        AWS.config.credentials = cognitoIdentityCredentials;
        (AWS.config.credentials as AWS.Credentials).refresh((error) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            const accessKeyId = AWS.config.credentials.accessKeyId;
            const secretAccessKey = AWS.config.credentials.secretAccessKey;
            const sessionToken = AWS.config.credentials.sessionToken;
            userData = {
              ...userData,
              accessKeyId,
              secretAccessKey,
              sessionToken,
            };
            patchAWSTemporaryCreds({ accessKeyId, secretAccessKey, sessionToken });
          }
          resolve(userData);
        });
      },

      onFailure: (err) => reject(err),
    });
  });
};

export const cognitoConfirm = async (email: string, code: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: awsUserPool,
    });

    user.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

export const cognitoResendConfirmationCode = async (email: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: awsUserPool,
    });

    user.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

export const cognitoUserLogout = () => {
  try {
    (AWS.config.credentials as AWS.CognitoIdentityCredentials)?.clearCachedId();
  } catch (error) {}

  awsUserPool.getCurrentUser()?.signOut();
};

export const cognitoRegister = async (
  username: string,
  password: string,
  userAttributes: CognitoUserAttribute[],
): Promise<ISignUpResult | Error> => {
  return new Promise((resolve, reject) => {
    awsUserPool.signUp(username, password, userAttributes, null, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
};

export const cognitoRefreshSession = async (
  email: string,
  refreshToken: string,
): Promise<CognitoIdentityPoolUserSession | Error> => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: awsUserPool,
    });
    const token = new CognitoRefreshToken({ RefreshToken: refreshToken });

    user.refreshSession(token, (err, result: CognitoUserSession) => {
      if (err) {
        reject(err);
        return;
      }

      AWS.config.region = AWS_REGION;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: AWS_IDENTITY_POOL_ID,
        Logins: {
          [`cognito-idp.${AWS_REGION}.amazonaws.com/${awsUserPool.getUserPoolId()}`]: result.getIdToken().getJwtToken(),
        },
      });

      (AWS.config.credentials as AWS.Credentials).refresh((error) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          const accessKeyId = AWS.config.credentials.accessKeyId;
          const secretAccessKey = AWS.config.credentials.secretAccessKey;
          const sessionToken = AWS.config.credentials.sessionToken;

          patchAWSTemporaryCreds({ accessKeyId, secretAccessKey, sessionToken });

          // const extendedSession = {
          //   accessKeyId,
          //   secretAccessKey,
          //   sessionToken,
          // };
          // resolve({ core: result, ...extendedSession });
        }
      });
    });
  });
};

export const cognitoForgotPassword = async (email: string) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: awsUserPool,
    });

    user.forgotPassword({
      onSuccess: (data) => resolve(data),
      onFailure: (err) => reject(err),
    });
  });
};

export const cognitoResetPassword = async (
  email: string,
  newPassword: string,
  code: string,
): Promise<boolean | Error> => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: awsUserPool,
    });

    user.confirmPassword(code, newPassword, {
      onSuccess: () => resolve(true),
      onFailure: (err) => reject(err),
    });
  });
};
