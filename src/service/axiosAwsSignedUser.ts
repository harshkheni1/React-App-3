import axios from 'axios';
import getConfig from 'next/config';
import aws4 from 'aws4';
import * as nodeUrl from 'url';

import { PublicRuntimeConfig } from '../types/config';
import { getCookieValue } from './cookie-session';

const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();
const { CONSUMER_PORTAL_API_URL, AWS_REGION } = publicRuntimeConfig;

let awsSignOptions = null;

export const patchAWSTemporaryCreds = ({ sessionToken, accessKeyId, secretAccessKey }) => {
  awsSignOptions = { sessionToken, accessKeyId, secretAccessKey };
};

const awsIAMSignedConsumerPortal = axios.create({
  baseURL: CONSUMER_PORTAL_API_URL,
});

export const clearAWSTemporaryCreds = () => {
  awsSignOptions = null;
};

export const getAWSSigningCreds = () => {
  if (!awsSignOptions) {
    try {
      const cookieSigner = {
        sessionToken: getCookieValue('sessionToken'),
        accessKeyId: getCookieValue('accessKeyId'),
        secretAccessKey: getCookieValue('secretAccessKey'),
      };
      patchAWSTemporaryCreds({ ...cookieSigner });
      return cookieSigner;
    } catch (error) {}
  }

  return awsSignOptions;
};

const signInterceptor = async (config) => {
  const URL = typeof window !== 'undefined' && window.URL ? window.URL : nodeUrl.URL;
  const url = config.baseURL ? new URL(`${config.baseURL}${config.url}`) : new URL(config.url);
  const data = config.data ? JSON.stringify(config.data) : '';

  const { sessionToken, accessKeyId, secretAccessKey } = getAWSSigningCreds() ?? {};

  const headers: { [key: string]: string }[] = [];

  if (!new Set(['OPTIONS', 'GET', 'PUT', 'DELETE']).has(config.method.toUpperCase())) {
    headers.push({ 'Content-Type': config.headers['Content-Type'] || 'application/json' });
  }

  const req = aws4.sign(
    {
      service: 'execute-api',
      region: AWS_REGION,
      method: config.method.toUpperCase(),
      path: `${url.pathname}${url.search}`,
      headers: Object.assign({}, ...headers),
      body: data,
      host: url.host,
    },
    { accessKeyId, secretAccessKey, sessionToken },
  );

  delete req.headers['Host'];
  delete req.headers['Content-Length'];

  config.headers = req.headers;
  return config;
};

awsIAMSignedConsumerPortal.interceptors.request.use(signInterceptor);

export { awsIAMSignedConsumerPortal as axiosConsumer };
