import Router from 'next/router';
import { ServerResponse } from 'http';
import { AxiosError } from 'axios';
import getConfig from 'next/config';

import { PageError } from '../types/page-error';
import { PublicRuntimeConfig } from '../types/config';
import { ValidationErrorsInterface } from 'react-uforms';

const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();
const { APP_URL } = publicRuntimeConfig;

export const nextRedirect = async (
  res: ServerResponse | null,
  href: string,
  as?: string,
  options?: unknown,
): Promise<boolean | void> => {
  const isExternal = href.indexOf('http') === 0;
  const url = as || href;
  if (res) {
    res.writeHead(302, {
      Location: isExternal ? href : `${APP_URL}${url}`,
    });
    return res.end();
  }
  if (isExternal) {
    return window.location.assign(href);
  }
  return Router.push(href, url, options);
};

export const apiErrorToPageError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError | Error | any,
): PageError | never => {
  if (error.response) {
    const {
      response: { statusText, status, data },
    }: AxiosError = error;

    return {
      code: status,
      message: data?.message || statusText,
    };
  }

  throw error;
};

export const urlProtocolFixer = (url: string) => (!/^(?:f|ht)tps?\:\/\//.test(url) ? `https://${url}` : url);

export const truncateString = (string: string, qty: number) =>
  string.length > qty ? `${string.substring(0, qty)}...` : string;

export const toCapitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export type FieldValue = string | string[];

export interface FieldValues {
  [key: string]: FieldValue;
}

export const isValue = (values: FieldValues, name: string): boolean => {
  if (!values) {
    return false;
  }

  return Array.isArray(values[name]) ? values[name].length > 0 : !!values[name];
};

export const isFormNotValidated = (
  fields: string[],
  errors?: ValidationErrorsInterface,
  values?: FieldValues,
): boolean => {
  const formErrors = fields.map((field) => errors[field]).filter((el: string[]) => el && el.length > 0);
  const formValues = fields.find((item) => isValue(values, item));

  return !!(!formValues || formErrors.length > 0);
};

export const getAsString = (value: string | string[]): string => {
  return Array.isArray(value) ? value[0] : value;
};

export const getAsNumber = (value: string | string[], defaultValue?: number): number => {
  const result = +getAsString(value);
  if (defaultValue) {
    return Number.isNaN(result) ? defaultValue : result;
  }
  return result;
};

export const getAsArray = <T = string>(value: T | T[]): Array<T> => (Array.isArray(value) ? value : [value]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pick = (object: { [key: string]: any }, fields: string[]): { [key: string]: any } => {
  return Object.entries(object)
    .filter(([key]) => fields.includes(key))
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key]: value,
      }),
      {},
    );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omit = (object: { [key: string]: any }, fields: string[]): { [key: string]: any } => {
  return Object.entries(object)
    .filter(([key]) => !fields.includes(key))
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key]: value,
      }),
      {},
    );
};
