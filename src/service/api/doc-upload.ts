import axios from 'axios';
import { PublicRuntimeConfig } from '../../types/config';
import getConfig from 'next/config';

const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();
const { CONSUMER_PORTAL_API_URL } = publicRuntimeConfig;

const emConsumerPortal = (em) => {
  return axios.create({
    baseURL: CONSUMER_PORTAL_API_URL,
    headers: {
      Authorization: em,
    },
  });
};

export const getTempCred = (em: string) => {
  const emAxiosConsumer = emConsumerPortal(em);
  return emAxiosConsumer.get('/v1/get_temp_cred');
};

export const getClaimDetails = (em: string) => {
  const emAxiosConsumer = emConsumerPortal(em);
  return emAxiosConsumer.get('/v1/get_claim_by_id');
};

export const uploadClaimPhotoOpen = (
  em: string,
  file: Blob,
  updateFileProgress: (idx: number, percentage: number) => unknown,
  idx: number,
) => {
  const emAxiosConsumer = emConsumerPortal(em);
  const bodyFormData = new FormData();
  bodyFormData.append('file', file);
  return emAxiosConsumer.post('/v1/upload_claim_file', bodyFormData, {
    onUploadProgress: async (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      await updateFileProgress(idx, percentCompleted);
    },
  });
};

export const deleteClaimPhotoOpen = (em: string, fileName: string, documentId: number) => {
  const emAxiosConsumer = emConsumerPortal(em);
  const bodyData = { fileName };
  return emAxiosConsumer.delete(`/v1/delete_claim_document/${documentId}`, { data: bodyData });
};
