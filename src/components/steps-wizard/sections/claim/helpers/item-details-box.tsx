import React, { useContext, useEffect } from 'react';
import { ContextApi } from 'react-uforms';

import { Box, Row, Col, Text, GridThemeProvider, FormSelectField, FormInputField, FormLabel, Tooltip } from '@/ui-kit';
import { ClaimItem } from '@/core-types/claim-item';
import { ClaimsOptionsInterface } from '@/store/user/types';
import { FlatItem } from '@/core-types/general';

export interface ItemDetailsInterface {
  item: ClaimItem;
  idx: number;
  claimOptions: ClaimsOptionsInterface;
}
export const ItemDetailsBox: React.FC<ItemDetailsInterface> = ({ idx, item, claimOptions }) => {
  const { manufacturers, materialTypes, colors } = claimOptions;
  const manufacturerOptions = manufacturers?.map((item: FlatItem) => ({ label: item.name, value: item.id.toString() }));
  const materialOptions = materialTypes?.map((item: FlatItem) => ({ label: item.name, value: item.id.toString() }));
  const colorOptions = colors.map((item: FlatItem) => ({ label: item.name, value: item.id.toString() }));

  const formApi = useContext(ContextApi);
  const { material, manufacturer, color, id } = item ?? {};
  useEffect(() => {
    formApi.setValue(
      `addClaimItemDetails.${id}.manufacturer`,
      manufacturer && (manufacturer.id == 0 || manufacturer.name == null) ? '' : manufacturer?.id?.toString(),
    );
    formApi.setValue(
      `addClaimItemDetails.${id}.color`,
      color && (color.id == 0 || color.name == null) ? '' : color?.id?.toString(),
    );
    formApi.setValue(
      `addClaimItemDetails.${id}.material`,
      material && (material.id == 0 || material.name == null) ? '' : material?.id?.toString(),
    );
    formApi.setValue(`addClaimItemDetails.${id}.vendor`, item?.vendor);
    formApi.setValue(`addClaimItemDetails.${id}.itemDescription`, item?.itemDescription);
  }, [item]);

  return (
    <Box key={item.id} mt={30} pb={15}>
      <Box m={[15]}>
        <GridThemeProvider
          gridTheme={{
            gridColumns: 20,
            row: {
              padding: 1,
            },
            col: {
              padding: 1,
            },
          }}
        >
          <Row>
            <Col col={3} sm={2} lg={1}>
              <Box bg="gray200" display="flex" alignItems="center" justifyContent="center" style={{ height: '100%' }}>
                <span color="gray800">{idx + 1}</span>
              </Box>
            </Col>
            <Col col={9} sm={12} lg={16}>
              <Box bg="gray200" style={{ height: '100%', display: 'flex', alignItems: 'center' }} p={[10, 16]}>
                <Text fontWeight="bold" measure="sm" m={[0]} color="gray800">
                  {item.type?.name}
                </Text>
              </Box>
            </Col>
            <Col col={8} sm={4} lg={3}>
              <Box bg="gray200" style={{ height: '100%' }} p={[10, 16]}>
                <Text as="b" color="gray700" measure="sm">
                  {item.sku && `sku: ${item.sku}`}
                </Text>
              </Box>
            </Col>
          </Row>
        </GridThemeProvider>
      </Box>
      <Box m={[15]}>
        <Row>
          <Col sm={6} lg={4}>
            <Box mt={15}>
              <FormSelectField
                name={`addClaimItemDetails.${item.id}.manufacturer`}
                label={'Manufacturer: *'}
                tooltip={"Select Unknown, if you're not sure of the Manufacturer."}
                options={manufacturerOptions}
                placeholder="Select manufacturer"
                disabled={manufacturer && manufacturer.id && manufacturer.id != 0 ? true : false}
              />
            </Box>
          </Col>
          <Col sm={6} lg={4}>
            <Box mt={15}>
              <FormSelectField
                name={`addClaimItemDetails.${item.id}.material`}
                label="Material: *"
                options={materialOptions}
                placeholder="Select material"
                pb={24}
                disabled={material && material.id && material.id != 0 ? true : false}
              />
            </Box>
          </Col>
          <Col sm={6} lg={4}>
            <Box mt={15}>
              <FormSelectField
                name={`addClaimItemDetails.${item.id}.color`}
                label="Color: *"
                options={colorOptions}
                placeholder="Select color"
                pb={24}
                disabled={color && color.id && color.id != 0 ? true : false}
              />
            </Box>
          </Col>
          <Col sm={6} lg={6}>
            <Box mt={15}>
              <FormInputField
                name={`addClaimItemDetails.${item.id}.vendor`}
                label="Vendor: *"
                tooltip={"If you're not sure of the Vendor, duplicate the Manufacturer."}
                measure="md"
                placeholder="Vendor"
                type="text"
              />
            </Box>
          </Col>
          <Col sm={6} lg={6}>
            <Box mt={15}>
              <FormInputField
                name={`addClaimItemDetails.${item.id}.itemDescription`}
                label="Item description: *"
                tooltip={
                  <>
                    If your item has a correct Item Description, duplicate it here. <br />
                    If the Item Description was blank, please enter the Item Description from your invoice.
                  </>
                }
                measure="md"
                placeholder="Item description"
                type="text"
                maxLength={100}
              />
            </Box>
          </Col>
        </Row>
      </Box>
    </Box>
  );
};
