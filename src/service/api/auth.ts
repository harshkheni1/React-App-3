import { ISignUpResult, CognitoUserAttribute } from 'amazon-cognito-identity-js';

import { CognitoIdentityPoolUserSession, Session } from '../../types/session';
import { RegisterInterface, ConfirmUserInterface, LoginInterface, CognitoMappedUserInterface } from '../../types/auth';
import {
  cognitoRefreshSession,
  cognitoResendConfirmationCode,
  cognitoConfirm,
  cognitoLogin,
  cognitoUserLogout,
  cognitoRegister,
} from './aws';
import { cognitoForgotPassword, cognitoResetPassword } from './aws/cognito';

export const resendConfirmationCode = async (email: string): Promise<string> => cognitoResendConfirmationCode(email);

export const confirmUser = async ({ email, code }: ConfirmUserInterface): Promise<string> =>
  cognitoConfirm(email, code);

export const login = async ({ email, password }: LoginInterface): Promise<Session> => {
  const login = await cognitoLogin(email, password);

  const {
    idToken,
    expiresAt,
    refreshToken,
    sessionToken,
    accessKeyId,
    secretAccessKey,
  } = login as CognitoMappedUserInterface;

  return {
    user: { email, ...idToken.payload },
    expiresAt,
    refreshToken,
    accessKeyId,
    secretAccessKey,
    sessionToken,
  };
};

export const register = async ({
  email,
  password,
  phone: phoneRaw,
  name,
  customerIds,
}: RegisterInterface): Promise<ISignUpResult | Error> => {
  const phone = `+1${phoneRaw.replace(/\D/g, '')}`;
  const attributes: CognitoUserAttribute[] = [
    new CognitoUserAttribute({
      Name: 'phone_number',
      Value: phone,
    }),
    new CognitoUserAttribute({
      Name: 'name',
      Value: name,
    }),
    new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    }),
    new CognitoUserAttribute({
      Name: 'custom:AllowSMSNotification',
      Value: '1',
    }),
    new CognitoUserAttribute({
      Name: 'custom:PreferredPhoneNumber',
      Value: phoneRaw,
    }),
    new CognitoUserAttribute({
      Name: 'custom:MobilePhone',
      Value: phoneRaw,
    }),
    new CognitoUserAttribute({
      Name: 'custom:HomePhone',
      Value: phoneRaw,
    }),
    new CognitoUserAttribute({
      Name: 'custom:clientSource',
      Value: 'CP2.0',
    }),
    customerIds &&
      new CognitoUserAttribute({
        Name: 'custom:CustomerId',
        Value: customerIds,
      }),
  ];

  return cognitoRegister(email, password, attributes);
};

export const logout = async (): Promise<void> => cognitoUserLogout();

export const refreshSession = async (email: string, refreshToken: string): Promise<Session> => {
  const cognitoSession = (await cognitoRefreshSession(email, refreshToken)) as CognitoIdentityPoolUserSession;

  return {
    expiresAt: cognitoSession.core.getAccessToken().getExpiration(),
    refreshToken: cognitoSession.core.getRefreshToken().getToken(),
    user: {
      email,
      ...cognitoSession.core.getIdToken().payload,
    },
    accessKeyId: cognitoSession.accessKeyId,
    secretAccessKey: cognitoSession.secretAccessKey,
    sessionToken: cognitoSession.sessionToken,
  };
};

export const forgotPassword = async (email: string) => cognitoForgotPassword(email);

export const resetPassword = async ({ email, code, newPassword }) => cognitoResetPassword(email, newPassword, code);
