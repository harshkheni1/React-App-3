import React, { useCallback, useContext, useEffect, useState } from 'react';
import getConfig from 'next/config';
import { ContextApi } from 'react-uforms';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Section, Row, Col, Text, Hr, GridThemeProvider, Button, Card } from '@/ui-kit';
import { ClaimItem } from '@/core-types/claim-item';
import { Damage as DamageType } from '@/core-types/damage';
import { DamageBox } from './damage-box';
import FieldBlock from '@/components/field-block';
import FileUploader from '@/components/file-uploader/file-uploader';
import { UploadedFile } from '@/core-types/uploaded-file';
import { ClaimsOptionsInterface } from '@/store/user/types';
import { deleteDamage, updateActiveClaim } from '@/store/claim/actions';
import { deleteClaimDocument, uploadClaimPhoto } from '../../../../../service/api/file-claim';
import { useNotification } from '@/components/notification/hooks';
import { NotificationType } from '@/components/notification/types';
import { RootState } from '@/store/root-reducer';
import { PublicRuntimeConfig } from '@/core-types/config';

const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();
const { AWS_S3_SUPPORTED_FILE_EXTENSIONS } = publicRuntimeConfig;

export interface ClaimItemInterface {
  item: ClaimItem;
  idx: number;
  claimOptions: ClaimsOptionsInterface;
}
export const ClaimBox: React.FC<ClaimItemInterface> = ({ idx, item, claimOptions }) => {
  const { manufacturer, color, material } = item;
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const dispatch = useDispatch();
  const activeClaim = useSelector((state: RootState) => state.fileClaim.activeClaim);
  const pushNotification = useNotification();

  const { damages, files: claimItemFiles } = item ?? {};
  const [damageIndex, setIndex] = useState<number>(1);
  const [formDamages, setFormDamages] = useState<Partial<DamageType>[]>([]);
  const formContext = useContext(ContextApi);

  useEffect(() => {
    const claimDamages =
      damages?.length > 0
        ? damages.map((damage) => ({ id: damage.id, claimItemId: item.id, claimId: item.claimId }))
        : [{ id: damageIndex - 1, claimItemId: item.id, claimId: item.claimId }];
    setFormDamages(claimDamages);
    claimDamages.forEach((damage) => formContext.setValue(`addDamageDetails.${item.id}.${damage.id}`, {}));
  }, [damages]);

  useEffect(() => {
    setFiles(claimItemFiles);
    formContext.setValue(`addDamageDetails.${item.id}.files`, claimItemFiles);
  }, [claimItemFiles]);

  const addDamage = useCallback(() => {
    setIndex(damageIndex + 1);
    setFormDamages([...formDamages, { id: damageIndex, claimId: item.claimId, claimItemId: item.id }]);
    formContext.setValue(`addDamageDetails.${item.id}.${damageIndex}`, {});
  }, [formDamages]);

  const removeDamage = useCallback(
    (damageId: number) => {
      setFormDamages(formDamages.filter((d) => d.id !== damageId));
      if (damages.find((damage) => damage.id === +damageId)) {
        dispatch(deleteDamage({ damageId: damageId, claimId: item.claimId }));
      }
      const allItemFormDamages = formContext.getValue(`addDamageDetails.${item.id}`);

      const filtered = Object.entries(allItemFormDamages ?? {}).reduce((acc, [id, value]) => {
        if (+id !== damageId) {
          acc[id] = value;
        }
        return acc;
      }, {});
      formContext.setValue(`addDamageDetails.${item.id}`, filtered);
    },
    [formDamages, item],
  );

  return (
    <Section collapsable mb={10} expanded={true}>
      <Section.Header>
        <GridThemeProvider
          gridTheme={{
            row: {
              padding: 1,
            },
            col: {
              padding: 1,
            },
          }}
        >
          <Row>
            <Col col={2} sm={1}>
              <Box bg="gray200" display="flex" alignItems="center" justifyContent="center" style={{ height: '100%' }}>
                <span>{idx}</span>
              </Box>
            </Col>
            <Col col={8} sm={10}>
              <Box bg="gray200" style={{ height: '100%' }} p={[10, 16]}>
                <Text fontWeight="bold" measure="sm" m={[0]}>
                  {item.type?.name}
                </Text>
              </Box>
            </Col>
            <Col col={2} sm={1}>
              <Section.Action icon="arrow-down" />
            </Col>
          </Row>
        </GridThemeProvider>
      </Section.Header>
      <Section.Body>
        <Box>
          <Row>
            {manufacturer && (
              <Col md={2}>
                <FieldBlock name="Manufacturer" value={manufacturer?.name} />
              </Col>
            )}
            <Col md={2}>
              <FieldBlock name="Color" value={color?.name} />
            </Col>
            <Col md={2}>
              <FieldBlock name="Material" value={material?.name} />
            </Col>
            <Col md={2}>
              <FieldBlock name="Vendor" value={item.vendor} />
            </Col>
            <Col md={4}>
              <FieldBlock name="Description" value={item.itemDescription} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <p>
                <Text align="justify" measure="sm" as="em" fontFamily="secondary" color="primary" ml={16}>
                  <strong>1.</strong>If you are adding a manual item to a claim, the invoice is required. Please upload
                  the invoice.
                </Text>
              </p>
              <p>
                <Text align="justify" measure="sm" as="em" fontFamily="secondary" color="primary" ml={16}>
                  <strong>2.</strong>Stand facing the item (all damage locations must be identified from this position.
                  Is the damage to your left or to your right?)
                </Text>
              </p>
              <p>
                <Text align="justify" measure="sm" as="em" fontFamily="secondary" color="primary" ml={16}>
                  <strong>3.</strong>Please upload a clear photo of the entire piece of furniture, and a clear close-up
                  photo of each damage or stained areas.
                </Text>
              </p>
              <p>
                <Text align="justify" measure="sm" as="em" fontFamily="secondary" color="primary" ml={16}>
                  <strong>4.</strong>Please upload a photo of the furniture tag and serial number.
                </Text>
              </p>
              <p>
                <Text align="justify" measure="sm" as="em" fontFamily="secondary" color="primary" ml={16}>
                  <strong>5.</strong>You may upload JPG, PNG, or PDF files no larger than 5MB each.
                </Text>
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Box mt={20}>
                <FileUploader
                  onUpload={async (fileList: FileList) => {
                    let newUploadedPhotos: UploadedFile[] = [];
                    for (let idx = 0; idx < fileList.length; ++idx) {
                      try {
                        const uploadedPhoto = await uploadClaimPhoto({
                          claimId: item.claimId,
                          claimItemsId: item.id,
                          file: fileList[idx],
                        });
                        if (uploadedPhoto) {
                          newUploadedPhotos = [...newUploadedPhotos, uploadedPhoto];
                        }
                      } catch (err) {
                        pushNotification(NotificationType.ERROR, err.message || 'Some error. Try a bit later please');
                      }
                    }

                    setFiles([...(files ?? []), ...newUploadedPhotos]);
                    dispatch(
                      updateActiveClaim({
                        ...activeClaim,
                        items: activeClaim.items.map((claimItem: ClaimItem) => {
                          if (item.id === claimItem.id) {
                            claimItem.files = [...(claimItem.files ?? []), ...newUploadedPhotos];
                          }

                          return claimItem;
                        }),
                        files: [...(activeClaim?.files ?? []), ...newUploadedPhotos],
                      }),
                    );
                  }}
                  onDelete={async (deleteFile: UploadedFile) => {
                    try {
                      if (await deleteClaimDocument(deleteFile)) {
                        setFiles(files.filter((file) => file.id !== deleteFile.id));
                        dispatch(
                          updateActiveClaim({
                            ...activeClaim,
                            items: activeClaim.items.map((claimItem: ClaimItem) => {
                              if (item.id === claimItem.id) {
                                claimItem.files = claimItem.files.filter((file) => file.id !== deleteFile.id);
                              }

                              return claimItem;
                            }),
                            files: activeClaim.files.filter((file) => file.id !== deleteFile.id),
                          }),
                        );
                      } else {
                        pushNotification(NotificationType.ERROR, 'The file is not deleted.');
                      }
                    } catch (error) {
                      pushNotification(NotificationType.ERROR, error?.message ?? 'The file is not deleted.');
                    }
                  }}
                  onError={(message) => pushNotification(NotificationType.ERROR, message)}
                  onBeforeUpload={() => null}
                  files={files}
                  fileSizeLimit={5 * 1024 * 1024}
                  fileCountLimit={4}
                  name={`addDamageDetails.${item.id}.files`}
                  id={`addDamageDetails.${item.id}.files`}
                  accept="image/jpeg, image/png, application/pdf"
                  fileAllowedExtensions={AWS_S3_SUPPORTED_FILE_EXTENSIONS.split(',')}
                  title="Upload required documents and photo(s): *"
                  multiple
                  deleteAction
                  previewAction
                />
              </Box>
            </Col>
          </Row>
        </Box>
        <Box mb={15}>
          {formDamages.map((damage, counter) => (
            <DamageBox
              key={`${item.id}${damage.id}`}
              item={item}
              claimOptions={claimOptions}
              counter={counter + 1}
              damageId={damage.id}
              onDeleteHandler={() => removeDamage(damage.id)}
            />
          ))}

          <Hr color="gray500" m={[0, 0, 25]} />

          <Button
            variant="link"
            color="primary"
            onClick={addDamage}
            p={[0]}
            style={{ fontSize: '12px', letterSpacing: '2px', lineHeight: '22px' }}
          >
            + Add Damage
          </Button>
        </Box>
      </Section.Body>
    </Section>
  );
};
