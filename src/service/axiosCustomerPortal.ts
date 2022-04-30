import axios from 'axios';
import getConfig from 'next/config';
import { PublicRuntimeConfig } from '../types/config';

const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();
const { CONSUMER_PORTAL_API_URL, CONSUMER_PORTAL_X_API_KEY } = publicRuntimeConfig;

export default axios.create({
  baseURL: CONSUMER_PORTAL_API_URL,
  headers: {
    'X-API-Key': CONSUMER_PORTAL_X_API_KEY,
  },
});
