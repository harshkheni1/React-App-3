import { NextPageContext } from 'next';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { CookieSessionInterface, Session, SessionKeys } from '../types/session';

const COOKIE_PREFIX = '_gbs_';
const COOKIE_OPTIONS = {
  maxAge: 30 * 24 * 60 * 60,
  path: '/',
};

export const removeCookieSession = (ctx?: NextPageContext) => {
  SessionKeys.forEach((key) => destroyCookie(ctx, `${COOKIE_PREFIX}${key}`, COOKIE_OPTIONS));
};

export const getCookieSession = (ctx?: NextPageContext): Partial<CookieSessionInterface> | null => {
  const cookies = parseCookies(ctx);
  let params: Partial<CookieSessionInterface> = {};
  for (let i = 0; i < SessionKeys.length; i++) {
    const key = SessionKeys[i];
    const value = cookies[`${COOKIE_PREFIX}${key}`];
    if (typeof value === 'undefined') {
      params = {
        ...params,
        [key]: null,
      };
    } else {
      try {
        params = {
          ...params,
          [key]: JSON.parse(decodeURIComponent(value)),
        };
      } catch (error) {
        removeCookieSession(ctx);
        return null;
      }
    }
  }

  return params;
};

export const getCookieValue = (key: string) => {
  const cookies = parseCookies();
  const value = cookies[`${COOKIE_PREFIX}${key}`];
  return JSON.parse(decodeURIComponent(value));
};

export const setCookieSession = (session: Session, ctx?: NextPageContext) => {
  const { refreshToken, user, expiresAt, sessionToken, secretAccessKey, accessKeyId } = session ?? {};

  expiresAt &&
    setCookie(ctx, `${COOKIE_PREFIX}expiresAt`, encodeURIComponent(JSON.stringify(expiresAt)), COOKIE_OPTIONS);
  refreshToken &&
    setCookie(ctx, `${COOKIE_PREFIX}refreshToken`, encodeURIComponent(JSON.stringify(refreshToken)), COOKIE_OPTIONS);

  sessionToken &&
    setCookie(ctx, `${COOKIE_PREFIX}sessionToken`, encodeURIComponent(JSON.stringify(sessionToken)), COOKIE_OPTIONS);

  secretAccessKey &&
    setCookie(
      ctx,
      `${COOKIE_PREFIX}secretAccessKey`,
      encodeURIComponent(JSON.stringify(secretAccessKey)),
      COOKIE_OPTIONS,
    );

  accessKeyId &&
    setCookie(ctx, `${COOKIE_PREFIX}accessKeyId`, encodeURIComponent(JSON.stringify(accessKeyId)), COOKIE_OPTIONS);

  if (user) {
    setCookie(ctx, `${COOKIE_PREFIX}uemail`, encodeURIComponent(JSON.stringify(user?.email)), COOKIE_OPTIONS);
    const uextid = user['custom:UserExtendedInfoId'] && +user['custom:UserExtendedInfoId'];
    uextid && setCookie(ctx, `${COOKIE_PREFIX}uextid`, encodeURIComponent(JSON.stringify(uextid)), COOKIE_OPTIONS);
  }
};
