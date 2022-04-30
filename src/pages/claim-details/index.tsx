import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Page, Container, Row, Col, Heading, Img, Text, Loading, Box, Section, A, Hr, Tag } from '@/ui-kit';
import { TagVariantType } from '../../components/ui-kit/components/tag/const';
import { ModalContainerStyled } from '@/components/modal-content.styled';
import { ImageStyled, ImageWrapperStyled } from '@/components/image-gallery/image-gallery.styled';
import moment from 'moment';
import ImagePreview from '@/components/image-gallery/image-preview';
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
import { getClaimDetails } from '../../service/api/doc-upload';
import { ClaimItem } from '../../components/claim-item';
import { PublicRuntimeConfig } from '@/core-types/config';
import {
  mapApiPlan,
  mapApiClaim,
  mapApiClaimItem,
  mapApiClaimDamage,
  mapApiUploadedFile,
} from '../../store/user/helpers';
import { getThumb } from '../../components/image-gallery/helpers';
import { ClaimItem as ClaimItemType } from '@/core-types/claim-item';
import { Damage } from '@/core-types/damage';
import { Claim as ClaimType, ClaimStatusToUI, ClaimStatus } from '@/core-types/claim';
import { ThumbType } from '@/core-types/thumb';
import { Plan } from '@/core-types/plan';

const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();
const { AWS_S3_THUMBNAIL_URL, PDF_THUMBNAIL_URL } = publicRuntimeConfig;

export const ClaimDetails: FunctionalPage<{
  errors: ApiError | null;
  loading: boolean;
}> = ({ errors, loading }) => {
  const pushNotification = useNotification();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [claim, setClaim] = useState<ClaimType>(null);

  const [modalFiles, setModalFiles] = useState<{ filteredFiles: UploadedFile[]; current: number }>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [shownImages, setShowImages] = useState<UploadedFile[]>([]);
  const [statusColor, setStatusColor] = useState<TagVariantType>('open');
  const [statusText, setStatusText] = useState<string>('');

  const query = useRouter().query;
  const em = getAsString(query.em);

  useEffect(() => {
    setIsLoading(true);
    getClaimDetails(em)
      .then(({ data }) => {
        const rawClaim = data.claim;
        const mappedClaim = mapApiClaim(rawClaim);

        const mappedUploadedFiles: UploadedFile[] = rawClaim['documents']?.map((rawFile: unknown) =>
          mapApiUploadedFile(rawFile),
        );

        const mappedDamages: Damage[] = rawClaim['damageAreasDisp']?.map((rawDamage: unknown) => {
          const mappedDamage = mapApiClaimDamage(rawDamage);
          return {
            ...mappedDamage,
            files: mappedUploadedFiles.filter((file: UploadedFile) => file.cliamItemsDamageId === mappedDamage.id),
          };
        });

        const mappedItems: ClaimItemType[] = rawClaim['items']?.map((rawClaimItem: unknown) => {
          const mappedItem = mapApiClaimItem(rawClaimItem);
          return {
            ...mappedItem,
            damages: mappedDamages.filter((damage: Damage) => damage.claimItemId === mappedItem.id),
            files: mappedUploadedFiles.filter((file: UploadedFile) => file.claimItemsId === mappedItem.id),
          };
        });
        const { color, text } = ClaimStatusToUI[mappedClaim.status];
        setStatusColor(color);
        setStatusText(text);
        const plan: Plan = mapApiPlan(data.claim.plan);
        const cl = {
          ...mappedClaim,
          items: mappedItems,
          plan: plan,
          files: mappedUploadedFiles,
        };
        const claimFiles = mappedUploadedFiles || [];
        setFiles(claimFiles);
        setShowImages(claimFiles.length > 5 ? claimFiles.slice(0, 5) : claimFiles);
        setClaim(cl);

        setIsValid(true);
        setIsLoading(false);
      })
      .catch((err) => {
        pushNotification(NotificationType.ERROR, err.message || 'Invalid Url.');
        setIsValid(false);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (errors) {
      pushNotification(NotificationType.ERROR, errors.message);
    }
  }, [errors]);

  return (
    <Layout>
      <Page>
        <Container>
          <Col md={12}>
            <Heading as="h4" mb={20}>
              Claim Details
            </Heading>
          </Col>
          <Col md={12}>
            {isValid ? (
              <ModalContainerStyled>
                {claim && (
                  <Section>
                    <Section.Header>
                      <Box p={[10, 10, 10, 15]}>
                        <Row alignItems="center">
                          <Col col={6}>
                            <Text measure="lg" fontWeight="sbold" uppercase mt={0} mb={15}>
                              {claim.plan?.title || claim.plan?.programName}
                            </Text>
                          </Col>
                          <Col col={6}>
                            <ImageWrapperStyled count={files?.length} display="flex" justifyContent="flex-start">
                              {files?.length > 0 &&
                                shownImages.map((file) => (
                                  <ImageStyled
                                    key={file.id}
                                    m={[0, 8]}
                                    onClick={async () => {
                                      if (file.type == '3003') {
                                        const filteredFiles = files.filter((f) => {
                                          return f.type == '3003';
                                        });
                                        setModalFiles({
                                          filteredFiles,
                                          current: 0,
                                        });
                                      } else {
                                        window.open(
                                          `${AWS_S3_THUMBNAIL_URL}/CL-${file.claimId}/photos-consumer/${file.name}`,
                                          '_blank',
                                          'fullscreen=yes',
                                        );
                                      }
                                    }}
                                  >
                                    <Img
                                      src={file.type == '3003' ? getThumb(file, ThumbType.MD) : PDF_THUMBNAIL_URL}
                                      alt={file.name}
                                      fit="contain"
                                    />
                                  </ImageStyled>
                                ))}
                            </ImageWrapperStyled>
                          </Col>
                          {claim.status !== ClaimStatus.NOT_SUBMITTED && (
                            <Col col={12}>
                              <Tag color={statusColor}>{statusText}</Tag>
                              <Text
                                measure="sm"
                                as="em"
                                fontFamily="secondary"
                                fontWeight="bold"
                                color="gray700"
                                ml={16}
                              >
                                Claim ID: {claim.id}
                              </Text>
                            </Col>
                          )}
                        </Row>
                      </Box>
                    </Section.Header>
                    <Section.Body>
                      <Hr color="gray500" m={[0]} />
                      <Box p={[10, 10, 10, 15]}>
                        <Row>
                          <Col md={3} col={6}>
                            <Text measure="sm" fontWeight="sbold">
                              Claim Filed Date
                            </Text>
                            <Text measure="sm">{moment(claim.damageDate).format('MMMM Do, YYYY')}</Text>
                          </Col>
                          <Col md={3} col={6}>
                            <Text measure="sm" fontWeight="sbold">
                              Plan Number
                            </Text>
                            <Text measure="sm">{claim.plan?.number || claim.warrantyNumber}</Text>
                          </Col>
                          {claim.plan?.store && (
                            <Col md={3} col={6}>
                              <Text measure="sm" fontWeight="sbold">
                                Store Code
                              </Text>
                              <Text measure="sm">{claim.plan?.store}</Text>
                            </Col>
                          )}
                          <Col md={3} col={6}>
                            <Text measure="sm" fontWeight="sbold">
                              Purchase Date
                            </Text>
                            <Text measure="sm">{moment(claim.plan?.purchaseDate).format('MMMM Do, YYYY')}</Text>
                          </Col>
                          <Col md={3} col={6}>
                            <Text measure="sm" fontWeight="sbold">
                              Delivery Date
                            </Text>
                            <Text measure="sm">{moment(claim.plan?.deliveryDate).format('MMMM Do, YYYY')}</Text>
                          </Col>
                          {claim.plan?.pdfLink && (
                            <Col md={3} sm={6}>
                              <Box mb={10}>
                                <Text measure="sm" fontWeight="bold" m={[0, 0, 10]}>
                                  Terms &amp; Conditions:
                                </Text>
                                <A href={claim.plan?.pdfLink} target="_blank" download measure="sm">
                                  View PDF
                                </A>
                              </Box>
                            </Col>
                          )}
                        </Row>
                      </Box>
                      <Hr color="gray500" m={[0]} />
                      <Box bg="white" p={[15, 15, 15]}>
                        <Text uppercase as="p" measure="xxs" color="gray800" letterSpacing={2}>
                          Items in claim: {claim.items.length}
                        </Text>
                        {/* Tushar need import Claim item Compoment  */}
                        {claim.items.map((claimItem: ClaimItemType, idx) => (
                          <ClaimItem key={claimItem.id} idx={idx + 1} item={claimItem} claim={claim} />
                        ))}
                      </Box>
                    </Section.Body>
                  </Section>
                )}
              </ModalContainerStyled>
            ) : (
              <Text>{isLoading ? 'Loading...' : 'Invalid URL.'}</Text>
            )}
          </Col>
          {loading || (isLoading && <Loading full={false} color="gray800" />)}
          {modalFiles && modalFiles.filteredFiles?.length > 0 && (
            <ImagePreview
              files={modalFiles.filteredFiles}
              previewTitle="Your claim photos"
              currentFile={modalFiles.current}
              onClose={() => setModalFiles(null)}
            />
          )}
        </Container>
      </Page>
    </Layout>
  );
};

const mapStateToProps = ({ scopeError, scopeLoading }: RootState) => ({
  errors: getScopeError(scopeError, AuthScope),
  loading: isScopeLoading(scopeLoading, AuthScope),
});

export default connect(mapStateToProps)(ClaimDetails);
