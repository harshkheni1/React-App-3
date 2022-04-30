import React, { useState, useEffect } from 'react';
import getConfig from 'next/config';
import { Box, Tag, Text, Hr, Section, Row, Col, A, Button, Colors, Icon, Img } from '@/ui-kit';
import moment from 'moment';

import { Claim as ClaimType, ClaimStatus, ClaimStatusToUI } from '@/core-types/claim';
import { ClaimItem as ClaimItemType } from '@/core-types/claim-item';

import FieldBlock from './field-block';
import { ClaimItem } from './claim-item';
import NextLink from './next-link';

import ImagePreview from '@/components/image-gallery/image-preview';
import { ModalContainerStyled } from '@/components/modal-content.styled';
import { ImageStyled, ImageWrapperStyled } from './image-gallery/image-gallery.styled';
import { getThumb } from './image-gallery/helpers';
import { ThumbType } from '@/core-types/thumb';
import { UploadedFile } from '@/core-types/uploaded-file';

import { PublicRuntimeConfig } from '@/core-types/config';
const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();
const { AWS_S3_THUMBNAIL_URL, PDF_THUMBNAIL_URL } = publicRuntimeConfig;

interface ClaimProps {
  claim: ClaimType;
  isExpanded?: boolean;
  onFileClaimHandler?: () => void;
  onDeleteClaimHandler?: () => void;
}

export const Claim: React.FC<ClaimProps> = ({ claim, isExpanded = true, onFileClaimHandler, onDeleteClaimHandler }) => {
  if (!claim) {
    return null;
  }

  const [modalFiles, setModalFiles] = useState<{ filteredFiles: UploadedFile[]; current: number }>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [shownImages, setShowImages] = useState<UploadedFile[]>([]);
  const { color, text } = ClaimStatusToUI[claim.status];

  useEffect(() => {
    if (claim) {
      const { files: claimFiles = [] } = claim;
      setFiles(claimFiles);
      setShowImages(claimFiles.length > 5 ? claimFiles.slice(0, 5) : claimFiles);
    }
  }, [claim.files]);

  const draftClaim = (
    <ModalContainerStyled
      mb={20}
      style={{
        border: `2px dashed ${Colors.gray500}`,
        boxShadow: 'none',
      }}
    >
      <Section mb={5} collapsable expanded={isExpanded}>
        <Section.Header>
          <Box p={[16]}>
            <Row alignItems="center">
              <Col md={6} xl={8}>
                <Text measure="lg" fontWeight="sbold" uppercase mt={0} mb={15}>
                  {claim.plan?.title || claim.plan?.programName}
                </Text>
                <Tag color={color}>{text}</Tag>
                <Text measure="sm" as="em" fontWeight="bold" fontFamily="secondary" color="gray700" ml={16}>
                  Some steps remaining to finish your draft claim.
                </Text>
              </Col>
              <Col sm={6} md={3} xl={2}>
                <Button
                  variant="link"
                  color="danger"
                  as="div"
                  measure="sm"
                  fullWidth
                  fontWeight="sbold"
                  mt={{ xs: 20, md: 0 }}
                  onClick={onDeleteClaimHandler}
                  style={{ fontSize: '12px', letterSpacing: '2px', lineHeight: '22px', float: 'right' }}
                  type="button"
                >
                  <Icon name="delete-page" mr={8} measure={16} />
                  Delete Draft
                </Button>
              </Col>
              <Col sm={6} md={3} xl={2}>
                <NextLink href={`/file-claim?claimId=${claim.id}&step=2`} as={`/file-claim?claimId=${claim.id}&step=2`}>
                  <Button
                    variant="outlined"
                    color="gray800"
                    as="div"
                    uppercase={false}
                    measure="md"
                    fullWidth
                    onClick={onFileClaimHandler}
                    mt={{ xs: 20, md: 0 }}
                    type="button"
                  >
                    Continue
                  </Button>
                </NextLink>
              </Col>
            </Row>
          </Box>
        </Section.Header>
      </Section>
    </ModalContainerStyled>
  );
  const finishedClaim = (
    <ModalContainerStyled mb={20}>
      <Section collapsable expanded={isExpanded}>
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
                  <Tag color={color}>{text}</Tag>
                  <Text measure="sm" as="em" fontFamily="secondary" fontWeight="bold" color="gray700" ml={16}>
                    Claim ID: {claim.id}
                  </Text>
                </Col>
              )}
            </Row>
          </Box>

          {claim.status !== ClaimStatus.NOT_SUBMITTED && (
            <>
              <Hr color="gray500" m={[0]} />
              <Box p={[10, 10, 10, 15]}>
                <Row>
                  <Col md={3} col={6}>
                    <FieldBlock name="Claim Filed Date" value={moment(claim.damageDate).format('MMMM Do, YYYY')} />
                  </Col>
                  <Col md={3} col={6}>
                    <FieldBlock name="Plan Number" value={claim.plan?.number || claim.warrantyId} />
                  </Col>
                  {claim.plan?.store && (
                    <Col md={3} col={6}>
                      <FieldBlock name="Store Code" value={claim.plan?.store} />
                    </Col>
                  )}
                  <Col md={3} col={6}>
                    <FieldBlock name="Purchase Date" value={moment(claim.plan?.purchaseDate).format('MMMM Do, YYYY')} />
                  </Col>
                  <Col md={3} col={6}>
                    <FieldBlock name="Delivery Date" value={moment(claim.plan?.deliveryDate).format('MMMM Do, YYYY')} />
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
            </>
          )}
        </Section.Header>
        {claim.items?.length > 0 && (
          <>
            <Section.Body>
              <Hr color="gray500" m={[0]} />

              <Box bg="white" p={[15, 15, 15]}>
                <Text uppercase as="p" measure="xxs" color="gray800" letterSpacing={2}>
                  Items in claim: {claim.items.length}
                </Text>
                {claim.items.map((claimItem: ClaimItemType, idx) => (
                  <ClaimItem key={claimItem.id} idx={idx + 1} item={claimItem} claim={claim} />
                ))}
              </Box>
            </Section.Body>
            <Section.Action text="details" />
          </>
        )}
      </Section>
    </ModalContainerStyled>
  );

  return (
    <>
      {claim.status === ClaimStatus.INPROCESS ? draftClaim : finishedClaim}
      {modalFiles && modalFiles.filteredFiles?.length > 0 && (
        <ImagePreview
          files={modalFiles.filteredFiles}
          previewTitle="Your claim photos"
          currentFile={modalFiles.current}
          onClose={() => setModalFiles(null)}
        />
      )}
    </>
  );
};
