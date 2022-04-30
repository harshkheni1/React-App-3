export interface LoginInterface {
  email: string;
  password: string;
}

export interface RegisterInterface extends LoginInterface {
  phone: string;
  name: string;
  customerIds?: string;
}

export interface AuthInterface extends RegisterInterface {
  isRegistering: boolean;
}

export interface ConfirmUserInterface {
  code: string;
  email: string;
}

export interface ResendConfirmationInterface {
  email: string;
}

export interface ForgotPasswordInterface {
  email: string;
}

export interface ResetPasswordInterface {
  email: string;
  code: string;
  newPassword: string;
}

export interface CognitoMappedUserInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  idToken: { payload: { [key: string]: any } };
  refreshToken: string;
  expiresAt: number;
  accessKeyId?: string;
  secretAccessKey?: string;
  sessionToken?: string;
}
