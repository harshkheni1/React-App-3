import getConfig from 'next/config';
import * as AWS from 'aws-sdk/global';
import AWSService, { AWSError } from 'aws-sdk';
import { DeleteObjectOutput, PutObjectRequest } from 'aws-sdk/clients/s3';

import { PublicRuntimeConfig } from '@/core-types/config';

const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();
const { AWS_REGION, AWS_S3_BUCKET } = publicRuntimeConfig;

const buketKey = (claimId: number | string, fileName: string) =>
  `claims_documentation/CL-${claimId}/photos-consumer/${fileName}`;

const retrieveS3 = (credentials) => {
  AWS.config.update({ region: AWS_REGION, credentials });
  return new AWSService.S3({ apiVersion: 'latest' });
};

export const s3UploadFile = async ({ claimId, fileName, fileType, data }, credentials) => {
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);

  const uploadParams: PutObjectRequest = {
    Bucket: AWS_S3_BUCKET,
    Key: buketKey(claimId, fileName),
    Body: data,
    Expires: expirationDate,
    ContentType: fileType,
    ACL: 'public-read',
  };

  return new Promise((resolve, reject) => {
    retrieveS3(credentials).upload(uploadParams, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(data.Key);
      }
    });
  });
};

export const s3Get = ({ claimId, fileName }, credentials) => {
  return new Promise((resolve, reject) => {
    retrieveS3(credentials).getObject(
      {
        Bucket: AWS_S3_BUCKET,
        Key: buketKey(claimId, fileName),
      },
      (err, data) => {
        if (err) {
          reject(err);
        }

        if (data) {
          resolve(data.Body);
        }
      },
    );
  });
};

export const s3Remove = ({ claimId, fileName }, credentials) => {
  return new Promise((resolve, reject) => {
    retrieveS3(credentials).deleteObject(
      {
        Bucket: AWS_S3_BUCKET,
        Key: buketKey(claimId, fileName),
      },
      (err: AWSError, data: DeleteObjectOutput) => {
        if (err) {
          reject(err);
        }

        if (data) {
          resolve(data);
        }
      },
    );
  });
};
