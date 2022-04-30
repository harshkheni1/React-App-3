import React, { ReactNode, useState } from 'react';
import getConfig from 'next/config';
import { connect } from 'react-redux';
import prettyBytes from 'pretty-bytes';
import { Box, Button, Col, Heading, Icon, Row, Text, Progress, Loading, Img, styled } from '@/ui-kit';
import { ThumbType } from '@/core-types/thumb';
import { UploadedFile } from '@/core-types/uploaded-file';
import {
  RowStyledContentCenter,
  UploadCompleted,
  ContainerStyled,
  UploadBlock,
  UploadBlockFileArea,
  UploadBlockLabel,
  TextSecondary,
  RowFileStyled,
} from './doc-file-uploader.styled';
import { RootState } from '@/store/root-reducer';
import { PublicRuntimeConfig } from '@/core-types/config';
import ImageUpload from '../../images/upload.png';
import FileImage from '../../images/file-image.png';

const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();
const { AWS_S3_THUMBNAIL_URL, PDF_THUMBNAIL_URL } = publicRuntimeConfig;

export const Bordered = styled('div')`
  border: 1px solid #ddd;
  display: inline-block;
  width: auto;
`;
export const Mobalign = styled('div')`
  @media (max-width: 767px) {
    text-align: center;
  }
`;

export interface FileUploaderProps {
  onUpload?: (files: File[]) => Promise<unknown>;
  onDelete?: (file: UploadedFile) => Promise<unknown>;
  onError?: (message: string) => void;
  onBeforeUpload?: () => void;
  fileSizeLimit?: number;
  fileCountLimit?: number;
  fileAllowedExtensions?: string[];
  name?: string;
  id?: string;
  accept?: string;
  multiple?: boolean;
  title?: string | ReactNode;
  description?: string | ReactNode;
  hideListing?: boolean;
  previewAction?: boolean;
  deleteAction?: boolean;
  isMobile?: boolean;
  hideHeadListingTable?: boolean;
  uploadedFiles?: UploadedFile[];
  fileUploadProgress?: any;
}

const DocFileUploader: React.FC<FileUploaderProps> = ({
  id,
  name,
  onUpload,
  onError,
  onDelete,
  fileSizeLimit,
  fileCountLimit,
  fileAllowedExtensions,
  accept,
  multiple,
  title,
  isMobile,
  uploadedFiles,
  fileUploadProgress,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isFullLoading, setFullLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files: inputFiles },
    } = event;
    event.persist();
    if (!inputFiles) {
      return;
    }

    const fileArray = Array.from(inputFiles);
    if (fileCountLimit && fileArray.length > fileCountLimit) {
      onError && onError(`You can upload not more than ${fileCountLimit} files at once.`);
      return;
    }

    for (const idx in fileArray) {
      const file = fileArray[idx];
      if (fileSizeLimit && file.size > fileSizeLimit) {
        onError && onError(`File ${file.name} is too big. Should be less then ${prettyBytes(fileSizeLimit)}`);
        return;
      }
      const fileName = file.name;
      const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
      if (!fileAllowedExtensions.includes(fileExtension.toLowerCase())) {
        onError && onError(`File ${file.name} is not supported`);
        return;
      }
    }

    setFiles([...files, ...fileArray]);
    event.target.value = null;
  };

  const handleFileDeleteLocal = (indexToDelete: number) => {
    const fls = files;
    fls.splice(indexToDelete, 1);

    setFiles([...fls]);
  };

  const handleFileDelete = async (file: UploadedFile) => {
    if (onDelete) {
      setFullLoading(true);
      await onDelete(file);
      setFullLoading(false);
    }
  };

  const getThumb = ({ claimId, name }: UploadedFile, type: ThumbType) =>
    `${AWS_S3_THUMBNAIL_URL}/CL-${claimId}/photos-consumer/${type}/${name}`;

  return (
    <RowStyledContentCenter>
      <Col md={10}>
        <ContainerStyled>
          <div style={{ borderBottom: '1px solid #ddd' }}>
            <Heading as="h5" p={[16, 24, 8]}>
              <TextSecondary>
                Document Name {title && '- '}
                {title && (
                  <Text as="span" color="primary">
                    {title}
                  </Text>
                )}
              </TextSecondary>
            </Heading>
          </div>
          <Box p={[20]}>
            <UploadBlock>
              <TextSecondary>Attach Document</TextSecondary>
              <UploadBlockLabel>
                <UploadBlockFileArea
                  type="file"
                  onChange={handleFileChange}
                  multiple={multiple}
                  accept={accept}
                  name={name}
                  id={id}
                  placeholder="No files attached yet"
                />
                <img src={ImageUpload} alt="upload" />
                <Text mb={0}>Drag And Drop Here</Text>
                <Text mb={0} mt={0}>
                  Or
                </Text>
                <Text mb={0} mt={0} as="p" color="primary">
                  Browse File
                </Text>
              </UploadBlockLabel>
              <TextSecondary>Accepted File Type: JPG, PNG, PDF</TextSecondary>
            </UploadBlock>
            {files.map((file, idx) => (
              <RowFileStyled key={idx}>
                <Col md={1} alignSelf="center">
                  <img src={FileImage} alt="Upload File" />
                </Col>
                <Col md={10}>
                  <Text mt={0} mb={0}>
                    {file.name}
                  </Text>
                  {fileUploadProgress[idx] > 0 && (
                    <Progress color="primary" percentage={fileUploadProgress[idx]} bg={'gray500'} />
                  )}
                </Col>
                <Col md={1} alignSelf="center">
                  <Icon
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      handleFileDeleteLocal(idx);
                    }}
                    name="delete"
                    color="redDark"
                    measure={16}
                    mr={8}
                  />{' '}
                  {isMobile && 'remove file'}
                </Col>
              </RowFileStyled>
            ))}
            {uploadedFiles.length > 0 && (
              <Text mb={5} color="green">
                File Uploaded Successfully
              </Text>
            )}
            {uploadedFiles.map((file, idx) => (
              <UploadCompleted key={idx}>
                <Col md={2} alignSelf="center">
                  <Mobalign>
                    <Bordered>
                      <Img
                        src={file.type == '3003' ? getThumb(file, ThumbType.SM) : PDF_THUMBNAIL_URL}
                        alt={file.name}
                        fit="contain"
                        width={isMobile ? 100 : 64}
                        height={isMobile ? 100 : 64}
                      />
                    </Bordered>
                  </Mobalign>
                </Col>
                <Col md={9}>
                  <Mobalign>
                    <Text mb={10} mt={10}>
                      {file.name}
                    </Text>
                  </Mobalign>
                </Col>
                <Col md={1} alignSelf="center">
                  <Mobalign>
                    <Icon
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handleFileDelete(file);
                      }}
                      name="delete"
                      color="redDark"
                      measure={16}
                      mr={8}
                    />
                  </Mobalign>
                  {isMobile && 'remove file'}
                </Col>
              </UploadCompleted>
            ))}
          </Box>
          <Row>
            <Col md={12}>
              <Text as="div" align="center" mb={30}>
                <Button
                  disabled={isLoading || files.length <= 0}
                  onClick={async () => {
                    setLoading(true);
                    await onUpload(files);
                    setFiles([]);
                    setLoading(false);
                  }}
                  uppercase={false}
                  color="primary"
                >
                  {isLoading ? 'Uploading...' : 'Upload'}
                </Button>
              </Text>
            </Col>
          </Row>
          {isFullLoading && <Loading full={true} bg="white" color="gray800" />}
        </ContainerStyled>
      </Col>
    </RowStyledContentCenter>
  );
};

const mapStateToProps = (state: RootState) => ({
  isMobile: state.app.isMobile,
});

export default connect(mapStateToProps)(DocFileUploader);
