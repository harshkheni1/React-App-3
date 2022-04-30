import axios from '../axiosCustomerPortal';
import { SearchCustomerDto, VerifyCustomerDto } from '@/core-types/customer';

export const searchCustomer = async (dto: SearchCustomerDto) => {
  const { data } = await axios.post('/v1/search_plan', { ...dto });
  return data;
};

export const verifyCustomer = async (dto: VerifyCustomerDto): Promise<boolean> => {
  const { data } = await axios.post('/v1/search_plan', { ...dto });

  return data?.isFound && data?.isUserExtendedInfoFound;
};
