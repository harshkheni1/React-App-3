import { axiosConsumer } from '../axiosAwsSignedUser';
import { ApiFlatItem } from '@/core-types/general';

const fetchFlatItems = async (route: string): Promise<ApiFlatItem[]> => {
  try {
    const { data } = await axiosConsumer.get(route);
    return data.result;
  } catch (error) {
    return [];
  }
};
export const damageItemTypes = async (): Promise<ApiFlatItem[]> => fetchFlatItems('/v1/get_all_item_type');

export const materialTypes = async (): Promise<ApiFlatItem[]> => fetchFlatItems('/v1/get_all_material');

export const manufacturers = async (): Promise<ApiFlatItem[]> => fetchFlatItems('/v1/get_all_manufacturer');

export const colors = async (): Promise<ApiFlatItem[]> => fetchFlatItems('/v1/get_all_color');

export const actionsTaken = async (): Promise<ApiFlatItem[]> => fetchFlatItems('/v1/get_actions_taken_lookup_values');

export const specificDamages = async (): Promise<ApiFlatItem[]> =>
  fetchFlatItems('/v1/get_specific_damage_lookup_values');

export const howDidOccur = async (): Promise<ApiFlatItem[]> => fetchFlatItems('/v1/get_how_did_it_occur_lookup_values');

export const damageTypes = async (): Promise<ApiFlatItem[]> => fetchFlatItems('/v1/get_damage_type_lookup_values');

export const specificLocations = async (): Promise<ApiFlatItem[]> =>
  fetchFlatItems('/v1/get_specific_location_lookup_values');
