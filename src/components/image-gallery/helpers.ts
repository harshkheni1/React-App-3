import getConfig from 'next/config';

import { UploadedFile } from '../../types/uploaded-file';
import { ThumbType } from '@/core-types/thumb';
import { PublicRuntimeConfig } from '@/core-types/config';

const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();
const { AWS_S3_THUMBNAIL_URL } = publicRuntimeConfig;

export const getThumb = ({ claimId, name }: UploadedFile, type: ThumbType) =>
  `${AWS_S3_THUMBNAIL_URL}/CL-${claimId}/photos-consumer/${type}/${name}`;
