import { AuthAction } from './types';
import {
  LoginInterface,
  RegisterInterface,
  ConfirmUserInterface,
  ResendConfirmationInterface,
  ForgotPasswordInterface,
  ResetPasswordInterface,
} from '../../types/auth';

export const loginFlow = (payload: LoginInterface) =>
  ({
    type: AuthAction.LOGIN_REQUEST,
    payload,
  } as const);

export const registerFlow = (payload: RegisterInterface) =>
  ({
    type: AuthAction.REGISTER_REQUEST,
    payload,
  } as const);

export const logoutFlow = () =>
  ({
    type: AuthAction.LOGOUT,
  } as const);

export const confirmUserFlow = (payload: ConfirmUserInterface) =>
  ({
    type: AuthAction.CONFIRM_REQUEST,
    payload,
  } as const);

export const resendConfiramtionCodeFlow = (payload: ResendConfirmationInterface) =>
  ({
    type: AuthAction.RESEND_CONFIRAMTION_CODE,
    payload,
  } as const);

export const forgotPasswordFlow = (payload: ForgotPasswordInterface) => ({
  type: AuthAction.FORGOT_PASSWORD,
  payload,
});

export const resetPasswordAndLoginFlow = (payload: ResetPasswordInterface) => ({
  type: AuthAction.RESET_PASSWORD,
  payload,
});
