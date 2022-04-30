export interface UploadedFile {
  id: number;
  name: string;
  claimId: number; //ref_id

  type?: string;

  addedBy?: string; //system
  addedDate?: Date; //system

  docDef?: string; //Ignore
  fileType?: string; //Ignore
  linkKey?: string; //Ignore
  metaTag1?: string; //Ignore
  metaTag2?: string; //Ignore
  notes?: string; //Ignore
  tempFlag?: string; //Ignore
  ts?: Date; //useless for CP app

  cliamItemsDamageId?: number;
  claimItemsId?: number;
}

export interface UploadPhotoDto {
  claimId: number;
  cliamItemsDamageId?: number;
  claimItemsId?: number;

  file: File;
}
