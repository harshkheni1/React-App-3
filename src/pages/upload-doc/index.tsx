import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Page, Container, Row, Col, Heading, Text, Loading, styled } from '@/ui-kit';
import getConfig from 'next/config';
import { FunctionalPage } from '@/store/service-types';
import Layout from '../../containers/layout';
import { useRouter } from 'next/router';
import { getAsString } from '../../service/helpers';
import { UploadedFile } from '@/core-types/uploaded-file';
import { getScopeError } from '@/store/scope-error/helpers';
import { isScopeLoading } from '@/store/scope-loading/helpers';
import { AuthScope } from '@/store/auth/types';
import { RootState } from '@/store/root-reducer';
import { useNotification } from '@/components/notification/hooks';
import { NotificationType } from '@/components/notification/types';
import { ApiError } from '@/core-types/api-error';
import { getTempCred, uploadClaimPhotoOpen, deleteClaimPhotoOpen } from '../../service/api/doc-upload';
import DocFileUploader from '@/components/doc-file-uploader/doc-file-uploader';
import { PublicRuntimeConfig } from '@/core-types/config';
import { mapApiInsertedFile } from '@/store/user/helpers';

const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();
const { AWS_S3_SUPPORTED_FILE_EXTENSIONS } = publicRuntimeConfig;

const RowStyled = styled(Row)`
  text-align: center;
`;

export const UploadDoc: FunctionalPage<{
  errors: ApiError | null;
  loading: boolean;
}> = ({ errors, loading }) => {
  const pushNotification = useNotification();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [fileUploadProgress, setFileUploadProgress] = useState<any>({});

  const query = useRouter().query;
  const em = getAsString(query.em);

  useEffect(() => {
    setIsLoading(true);
    getTempCred(em)
      .then(() => {
        setIsValid(true);
        setIsLoading(false);
      })
      .catch((err) => {
        pushNotification(NotificationType.ERROR, err.message || 'Invalid Url.');
        setIsLoading(false);
      });
  }, [em]);

  useEffect(() => {
    if (errors) {
      pushNotification(NotificationType.ERROR, errors.message);
    }
  }, [errors]);

  // const updateFileProgress = (idx: number, percentage: number) => {
  //   let fileProgress = fileUploadProgress;
  //   fileProgress[idx] = percentage;
  //   setFileUploadProgress({ ...fileProgress });
  // }

  const updateFileProgress = useCallback(
    (idx: number, percentage: number) => {
      const fileProgress = fileUploadProgress;
      fileProgress[idx] = percentage;
      setFileUploadProgress({ ...fileProgress });
    },
    [setFileUploadProgress],
  );

  return (
    <Layout>
      <Page>
        <Container>
          <RowStyled>
            <Col md={12}>
              <Heading align="center" as="h4" mb={20}>
                Document Upload
              </Heading>
            </Col>
            <Col md={12}>
              {isValid ? (
                <DocFileUploader
                  onUpload={async (fileList: File[]) => {
                    const uFileList: UploadedFile[] = [];
                    for (let idx = 0; idx < fileList.length; ++idx) {
                      try {
                        await uploadClaimPhotoOpen(em, fileList[idx], updateFileProgress, idx)
                          .then(({ data }) => {
                            const { message, result } = data ?? {};
                            uFileList.push(message === 'Succeed' && result ? mapApiInsertedFile(result[0]) : null);
                          })
                          .catch((err) => {
                            pushNotification(
                              NotificationType.ERROR,
                              err.message || 'Some error. Try a bit later please',
                            );
                          });
                      } catch (err) {
                        pushNotification(NotificationType.ERROR, err.message || 'Some error. Try a bit later please');
                      }
                      if (idx == fileList.length - 1) {
                        setFileUploadProgress({});
                        setUploadedFiles([...uploadedFiles, ...uFileList]);
                      }
                    }
                  }}
                  onDelete={async (deleteFile: UploadedFile) => {
                    try {
                      await deleteClaimPhotoOpen(em, deleteFile.name, deleteFile.id)
                        .then(() => {
                          setUploadedFiles(uploadedFiles.filter((file) => file.id !== deleteFile.id));
                          return true;
                        })
                        .catch((err) => {
                          pushNotification(NotificationType.ERROR, err.message || 'The file is not deleted.');
                          return false;
                        });
                    } catch (error) {
                      pushNotification(NotificationType.ERROR, error?.message ?? 'The file is not deleted.');
                    }
                  }}
                  onError={(message) => pushNotification(NotificationType.ERROR, message)}
                  onBeforeUpload={() => null}
                  fileSizeLimit={5 * 1024 * 1024}
                  fileCountLimit={4}
                  name={`uploader1`}
                  id={`uploader1`}
                  accept="image/jpeg, image/png, application/pdf"
                  fileAllowedExtensions={AWS_S3_SUPPORTED_FILE_EXTENSIONS.split(',')}
                  title="The Receipt"
                  multiple
                  deleteAction
                  previewAction
                  uploadedFiles={uploadedFiles}
                  fileUploadProgress={fileUploadProgress}
                />
              ) : (
                <Text>{isLoading ? 'Loading...' : 'Invalid URL.'}</Text>
              )}
            </Col>
          </RowStyled>
          {loading || (isLoading && <Loading full={false} color="gray800" />)}
        </Container>
      </Page>
    </Layout>
  );
};

const mapStateToProps = ({ scopeError, scopeLoading }: RootState) => ({
  errors: getScopeError(scopeError, AuthScope),
  loading: isScopeLoading(scopeLoading, AuthScope),
});

export default connect(mapStateToProps)(UploadDoc);
