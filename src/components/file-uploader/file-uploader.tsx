import React, { ReactNode, useState } from 'react';
import getConfig from 'next/config';
import { connect } from 'react-redux';
import prettyBytes from 'pretty-bytes';

import {
  Box,
  Button,
  Col,
  FormFileField,
  Heading,
  Icon,
  Img,
  Media,
  Modal,
  Row,
  Table,
  Text,
  Loading,
  Hr,
} from '@/ui-kit';
import { ThumbType } from '@/core-types/thumb';
import { UploadedFile } from '@/core-types/uploaded-file';
import { ButtonSectionStyled, FileNameStyled } from './file-uploader.styled';
import { RootState } from '@/store/root-reducer';
import { PublicRuntimeConfig } from '@/core-types/config';

const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();
const { AWS_S3_THUMBNAIL_URL, PDF_THUMBNAIL_URL } = publicRuntimeConfig;

export interface FileUploaderProps {
  onUpload?: (files: FileList) => Promise<unknown>;
  onDelete?: (file: UploadedFile) => Promise<unknown>;
  onError?: (message: string) => void;
  onBeforeUpload?: () => void;
  fileSizeLimit?: number;
  fileCountLimit?: number;
  fileAllowedExtensions?: string[];
  files: UploadedFile[];
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
}

const FileUploader: React.FC<FileUploaderProps> = ({
  id,
  name,
  onUpload,
  onError,
  onBeforeUpload,
  onDelete,
  fileSizeLimit,
  fileCountLimit,
  fileAllowedExtensions,
  files,
  accept,
  multiple,
  title,
  description,
  previewAction,
  deleteAction,
  hideListing,
  isMobile,
  hideHeadListingTable = false,
}) => {
  const [activeFilePreview, setActiveFilePreview] = useState<UploadedFile | null>(null);
  const [isLoading, setLoading] = useState(false);
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    event.persist();
    if (!files) {
      return;
    }

    if (fileCountLimit && Array.from(files).length > fileCountLimit) {
      onError && onError(`You can upload not more than ${fileCountLimit} files at once.`);
      return;
    }
    for (const file of Array.from(files)) {
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

    if (onBeforeUpload) {
      onBeforeUpload();
    }
    setLoading(true);
    await onUpload(files);

    event.target.value = null;
    setLoading(false);
  };
  const handleFileDelete = async (file: UploadedFile) => {
    if (onDelete) {
      setLoading(true);
      await onDelete(file);
      setLoading(false);
    }
  };
  const handleFilePreview = (file: UploadedFile) => {
    if (file.type == '3003') {
      setActiveFilePreview(file);
    } else {
      window.open(
        `${AWS_S3_THUMBNAIL_URL}/CL-${file.claimId}/photos-consumer/${file.name}`,
        '_blank',
        'fullscreen=yes',
      );
    }
  };

  const getThumb = ({ claimId, name }: UploadedFile, type: ThumbType) =>
    `${AWS_S3_THUMBNAIL_URL}/CL-${claimId}/photos-consumer/${type}/${name}`;

  const previewModal = activeFilePreview ? (
    <Modal isOpen={true} onClose={() => setActiveFilePreview(null)} measure="lg">
      <Modal.Header>
        <Heading as="h5">Preview image</Heading>
      </Modal.Header>
      <Modal.Body fullWidth pl={30} pr={30}>
        <Img
          src={getThumb(activeFilePreview, ThumbType.XXL)}
          fit="contain"
          height={440}
          placeholder
          fullWidth
          alt="preview"
        />
        {isLoading && <Loading full={false} color="gray800" />}
      </Modal.Body>
      <Modal.Footer fullWidth p={[30]}>
        <Box clearfix>
          <Box float="left">
            <Text m={[0]}>{activeFilePreview.name}</Text>
          </Box>
          {deleteAction && (
            <Box float="right">
              <Button
                variant="link"
                color="danger"
                fontWeight="normal"
                onClick={async () => {
                  setActiveFilePreview(null);
                  await handleFileDelete(activeFilePreview);
                }}
                borderRadius={0}
              >
                <Icon name="delete" color="danger" measure={16} /> Delete image
              </Button>
            </Box>
          )}
        </Box>
      </Modal.Footer>
    </Modal>
  ) : null;

  const previewFile = (file) => (
    <ButtonSectionStyled
      m={[10, 0]}
      variant="link"
      color="gray800"
      fontWeight="normal"
      onClick={() => handleFilePreview(file)}
      borderRadius={0}
    >
      <Icon name="image" measure={16} mr={8} /> preview file
    </ButtonSectionStyled>
  );

  const removeFile = (file) => (
    <ButtonSectionStyled
      m={[10, 0]}
      variant="link"
      color="danger"
      onClick={() => handleFileDelete(file)}
      borderRadius={0}
    >
      <Icon name="delete" color="danger" measure={16} mr={8} /> {isMobile && 'remove file'}
    </ButtonSectionStyled>
  );

  return (
    <Row>
      {previewModal}
      <Col col={12}>
        <Row>
          <Col sm={9}>
            {title && (
              <Text as="p" color="gray800" measure="sm" fontWeight="sbold" lineHeight={20} m={[0, 0, 2]}>
                {title}
              </Text>
            )}
          </Col>
          <Col sm={3}>
            <Text as="p" measure="sm" m={[0, 0, 2]} float={{ sm: 'right' }}>
              {description}
            </Text>
          </Col>
        </Row>

        <FormFileField
          multiple={multiple}
          accept={accept}
          name={name}
          id={id}
          onChange={handleFileChange}
          buttonTitle="browse"
          buttonStyle="primary"
          mb={10}
          placeholder="No files attached yet"
        />
        {!hideListing && !!files?.length && (
          <Table mt={15}>
            {!hideHeadListingTable && (
              <Table.Row>
                <Table.Cell type="head">Image Details</Table.Cell>
                {previewAction && !isMobile && (
                  <Table.Cell display={{ xs: 'none', sm: 'table-cell' }} type="head" name="fileListingAction">
                    Actions
                  </Table.Cell>
                )}
                {deleteAction && !isMobile && <Table.Cell type="head" name="action" />}
              </Table.Row>
            )}
            {files.map((file) => (
              <Table.Row key={file.id}>
                <Table.Cell pl={0}>
                  <Media>
                    <Media.Aside mr={15} width={64} align="center">
                      <Button variant="link" onClick={() => handleFilePreview(file)} borderRadius={1}>
                        <Img
                          src={file.type == '3003' ? getThumb(file, ThumbType.MD) : PDF_THUMBNAIL_URL}
                          width={isMobile ? 100 : 64}
                          height={isMobile ? 100 : 64}
                          alt={name}
                          fit="contain"
                        />
                      </Button>
                    </Media.Aside>
                    <Media.Body vertical="center">
                      {!isMobile && (
                        <FileNameStyled measure="sm" m={[0, 0, 12]} fontWeight="light">
                          {file.name || 'N/A'}
                        </FileNameStyled>
                      )}
                      {/* <Text measure="xs" fontWeight="light" m={[0]}>
                        {prettyBytes(file.size)}
                      </Text> */}
                    </Media.Body>
                  </Media>
                  {isMobile && (
                    <>
                      <Row>
                        <Col col={12}>{previewFile(file)}</Col>
                        <Col col={12}>{removeFile(file)}</Col>
                      </Row>
                      <Hr color="gray200" />
                    </>
                  )}
                </Table.Cell>
                {previewAction && !isMobile && (
                  <Table.Cell display={{ xs: 'none', sm: 'table-cell' }}>{previewFile(file)}</Table.Cell>
                )}
                {deleteAction && !isMobile && <Table.Cell align="center">{removeFile(file)}</Table.Cell>}
              </Table.Row>
            ))}
          </Table>
        )}
        {isLoading && <Loading full={true} bg="white" color="gray800" />}
      </Col>
    </Row>
  );
};

const mapStateToProps = (state: RootState) => ({
  isMobile: state.app.isMobile,
});

export default connect(mapStateToProps)(FileUploader);
