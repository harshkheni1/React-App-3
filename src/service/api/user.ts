import { axiosConsumer } from '../axiosAwsSignedUser';

export const plans = async (): Promise<unknown> => {
  const { data } = await axiosConsumer.get(`/v1/get_protection_plans/`);

  return data;
};

export const claims = async (status?: 'open' | 'closed' | 'in-process'): Promise<unknown> => {
  const fetchUrl = status ? `/v1/get_claim_list/?claimStatus=${status}` : '/v1/get_claim_list/';
  const { data } = await axiosConsumer.get(fetchUrl);

  return data;
};

export const detailedClaims = async (status?: 'open' | 'closed' | 'in-process'): Promise<unknown> => {
  const fetchUrl = status
    ? `/v1/get_claim_list_with_details/?claimStatus=${status}`
    : '/v1/get_claim_list_with_details/';
  const { data } = await axiosConsumer.get(fetchUrl);

  return data;
};
