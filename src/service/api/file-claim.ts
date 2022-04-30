import { axiosConsumer, getAWSSigningCreds } from '../axiosAwsSignedUser';
import { ApiFlatItem } from '@/core-types/general';
import { InsertClaimDto, InsertClaimItemDto } from '@/core-types/claim';
import { InsertDamageDto } from '@/core-types/damage';
import { InsertWarrantyItemDto } from '@/core-types/warranty-item';
import { UploadedFile, UploadPhotoDto } from '@/core-types/uploaded-file';
import { s3Get, s3Remove, s3UploadFile } from './aws/s3';
import { mapApiInsertedFile } from '@/store/user/helpers';

export const insertClaim = async (dto: InsertClaimDto): Promise<ApiFlatItem[]> => {
  const { data } = await axiosConsumer.post('/v1/insert_claim', dto);
  return data?.result;
};

export const getClaimItems = async (claimId: number | string): Promise<unknown[]> => {
  const { data } = await axiosConsumer.get(`/v1/get_claim_items/${claimId}`);
  return data?.items;
};

export const getClaimDocuments = async (claimId: number | string): Promise<unknown[]> => {
  const { data } = await axiosConsumer.get(`/v1/get_uploaded_documents_of_claim/${claimId}`);
  return data?.docs;
};

export const breakOutUnclaimedPlanItems = async (
  warrantyId: number | string,
  claimId: number | string,
): Promise<unknown[]> => {
  const { data } = await axiosConsumer.get(`/v1/get_break_out_warrenty_items/${warrantyId}/${claimId}`);
  return data?.items;
};

export const getClaimDamages = async (claimId: number | string): Promise<unknown[]> => {
  const { data } = await axiosConsumer.get(`/v1/get_claim_damage_areas_disp/${claimId}`);
  return data?.result;
};

export const insertClaimItem = async (dto: InsertClaimItemDto): Promise<boolean | null> => {
  const { data } = await axiosConsumer.post('/v1/insert_claim_item_update_warrenty_item', dto);
  return data?.message === 'Succeed';
};

export const deleteClaim = async (claimId: string | number): Promise<boolean> => {
  const { data } = await axiosConsumer.delete(`/v1/delete_draft_claim/${claimId}`); //why test ?

  return data.message === 'Succeed' && !data.result;
};

export const insertClaimItemDamage = async (dto: InsertDamageDto): Promise<boolean> => {
  let fl = false;
  await axiosConsumer
    .post('/v1/insert_claim_item_damage_areas', dto)
    .then(({ data }) => {
      fl = data?.message === 'Succeed';
    })
    .catch((err) => {
      console.log(err);
      fl = false;
    });
  return fl;
};

export const submitClaim = async (id: string | number): Promise<boolean> => {
  const { data } = await axiosConsumer.put(`/v1/submit_claim/${id}`);
  return data?.message === 'Succeed' && !data.result;
};

export const deleteDamage = async (damageId: string | number): Promise<boolean> => {
  const { data } = await axiosConsumer.delete(`/v1/delete_damage_area/${damageId}`);
  return data?.message === 'Succeed';
};

export const insertManualWarrantyItem = async (dto: InsertWarrantyItemDto): Promise<boolean> => {
  const { data } = await axiosConsumer.post('/v1/insert_manual_warr_claim_items', dto);

  return data?.message === 'Succeed';
};

export const deleteClaimItem = async (claimItemId: string | number): Promise<boolean> => {
  const { data } = await axiosConsumer.delete(`/v1/remove_claim_items/${claimItemId}`);

  return data?.message === 'Succeed';
};

export const uploadClaimPhoto = async (dto: UploadPhotoDto): Promise<UploadedFile | null> => {
  const {
    claimId,
    claimItemsId,
    cliamItemsDamageId,
    file: { name: fileName, type: fileType },
    file,
  } = dto;

  const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
  const calculatedFileName = `${new Date().getTime()}.${fileExtension}`;

  const attachment =
    file &&
    (await s3UploadFile(
      {
        claimId,
        fileName: calculatedFileName,
        fileType,
        data: file,
      },
      getAWSSigningCreds(),
    ));

  if (attachment) {
    const body = {
      claimId,
      claimItemsId,
      cliamItemsDamageId,
      docName: calculatedFileName,
    };

    const { data } = await axiosConsumer.post('/v1/insert_linked_and_embedded_files', body);
    const { message, result } = data ?? {};
    return message === 'Succeed' && result ? mapApiInsertedFile(result[0]) : null;
  }

  return null;
};

export const getClaimPhoto = async ({ claimId, fileName }) => {
  return s3Get({ claimId, fileName }, getAWSSigningCreds());
};

export const deleteClaimDocument = async (file: UploadedFile): Promise<boolean | null> => {
  const { claimId, name } = file ?? {};
  try {
    const s3Removed = await s3Remove({ claimId, fileName: name }, getAWSSigningCreds());

    if (s3Removed) {
      const { data } = await axiosConsumer.delete(`/v1/delete_uploaded_documents_of_claim/${file.id}`);
      return data?.message === 'Succeed';
    }
  } catch (error) {
    throw new Error(error?.message ?? 'Network error');
  }

  return false;
};
