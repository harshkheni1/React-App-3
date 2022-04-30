import React from 'react';

import {
  Modal,
  Heading,
  Row,
  Text,
  Col,
  Button,
  FormSelectField,
  FormInputField,
  Box,
  FormTextAreaField,
  Tooltip,
  FormLabel,
} from '@/ui-kit';
import { ClaimsOptionsInterface } from '@/store/user/types';
import { FlatItem } from '@/core-types/general';
import { Form, Validator } from 'react-uforms';
import { InsertWarrantyItemDto } from '@/core-types/warranty-item';
import { Claim } from '@/core-types/claim';
import { ValidatorTrimmedRequired } from '@/core-types/validation-errors';

const AddWarrantyItemModal: React.FC<{
  claimOptions: ClaimsOptionsInterface;
  insertManualWarrantyItem: (dto: InsertWarrantyItemDto) => void;
  onClose: () => void;
  claim: Claim | Partial<Claim>;
}> = ({ claimOptions, claim, insertManualWarrantyItem, onClose }) => {
  const { manufacturers, materialTypes, colors, claimItemTypes } = claimOptions;
  const manufacturerOptions = manufacturers?.map((item: FlatItem) => ({ label: item.name, value: item.id.toString() }));
  const materialOptions = materialTypes?.map((item: FlatItem) => ({ label: item.name, value: item.id.toString() }));
  const colorOptions = colors.map((item: FlatItem) => ({ label: item.name, value: item.id.toString() }));
  const claimItemTypesOptions = claimItemTypes.map((item: FlatItem) => ({
    label: item.name,
    value: item.id.toString(),
  }));

  const { plan, id: claimId } = claim ?? {};

  const getValidationRules = () => ({
    manufacturer: [Validator.Required()],
    claimItemType: [Validator.Required()],
    material: [Validator.Required()],
    color: [Validator.Required()],
    // sku: [ValidatorTrimmedRequired],
    // warrantyNumber: [ValidatorTrimmedRequired],
    // modelNumber: [ValidatorTrimmedRequired],
    // description: [ValidatorTrimmedRequired],
    // price: [Validator.Required(), Validator.Min(0)],
    quantity: [Validator.Required(), Validator.Min(1), Validator.Max(6), Validator.IntegerNumber()],
    // vendor: [ValidatorTrimmedRequired],
  });

  const onSubmit = (values) => {
    const dto: InsertWarrantyItemDto = {
      manuFacturer: +values.manufacturer,
      itemType: +values.claimItemType,
      material: +values.material,
      color: +values.color,
      sku: values.sku,
      manualWarrNumber: values.warrantyNumber,
      modelNumber: values.modelNumber,
      description: values.description,
      price: +values.price,
      quantity: +values.quantity,
      vendor: values.vendor,
      claimId,
      warrentyId: plan.id, //warrenty => facepalm
    };
    insertManualWarrantyItem(dto);
    onClose();
  };
  return (
    <Form element="div" onSubmit={onSubmit} validation={getValidationRules} defaultValues={{ manufacturer: '1751' }}>
      {(api) => (
        <Modal isOpen={true} onClose={onClose} measure="lg">
          <Modal.Header>
            <Heading as="h6">Add missing item</Heading>
          </Modal.Header>
          <Modal.Body fullWidth pl={10} pr={10}>
            <Box m={[15, 15, 0]}>
              <Row>
                <Col sm={12} lg={12}>
                  <FormSelectField
                    name="claimItemType"
                    label="Item type:"
                    options={claimItemTypesOptions}
                    placeholder="Required"
                    pb={24}
                  />
                </Col>

                <Col sm={6} lg={6}>
                  <FormSelectField
                    name="manufacturer"
                    label={'Manufacturer:'}
                    tooltip={
                      <>
                        In some cases the Vendor and Manufacturer may be the same. <br /> If this is the case, please
                        duplicate the Manufacturer in the Vendor field. <br />
                        If you don’t know, select &quot;Unknown&quot;.
                      </>
                    }
                    options={manufacturerOptions}
                    placeholder="Required"
                    pb={24}
                  />
                </Col>
                <Col sm={6} lg={6}>
                  <FormInputField
                    name="vendor"
                    label={'Vendor:'}
                    tooltip={
                      <>
                        In some cases the Vendor and Manufacturer may be the same. <br />
                        If this is the case, please duplicate the Manufacturer in the Vendor field. <br />
                        If you don’t know, select &quot;Unknown&quot;.
                      </>
                    }
                    measure="md"
                    placeholder="Optional"
                    type="text"
                    pb={24}
                  />
                </Col>
                <Col sm={6} lg={6}>
                  <FormSelectField
                    name="material"
                    label="Material:"
                    options={materialOptions}
                    placeholder="Required"
                    pb={24}
                    isClearable={false}
                  />
                </Col>
                <Col sm={6} lg={6}>
                  <FormSelectField name="color" label="Color:" options={colorOptions} placeholder="Required" pb={24} />
                </Col>
                <Col sm={6} lg={6}>
                  <FormInputField
                    name="sku"
                    label={'SKU #:'}
                    tooltip={
                      <>
                        In some cases the Model # and the SKU # may be the same or one not listed at all.
                        <br />
                        If this is the case, please duplicate the Model # in the SKU field or vice versa.
                      </>
                    }
                    pb={24}
                    measure="md"
                    placeholder="Optional"
                    type="text"
                  />
                </Col>
                <Col sm={6} lg={6}>
                  <FormInputField
                    name="modelNumber"
                    label={'Model #:'}
                    tooltip={
                      <>
                        In some cases the Model # and the SKU # may be the same or one not listed at all.
                        <br />
                        If this is the case, please duplicate the Model # in the SKU field or vice versa.
                      </>
                    }
                    pb={24}
                    measure="md"
                    placeholder="Optional"
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={6} lg={6}>
                  <FormInputField
                    name="price"
                    label={'Price:'}
                    tooltip={'Please enter the price listed for your item as listed on the invoice.'}
                    measure="md"
                    placeholder="Optional"
                    type="number"
                    mb={15}
                    min={0}
                  />
                </Col>
                <Col sm={6} lg={6}>
                  <FormInputField
                    name="quantity"
                    label="Quantity:"
                    measure="md"
                    placeholder="Required"
                    type="number"
                    pattern="[1-6]{1}"
                    step={1}
                    mb={15}
                    min={1}
                    max={6}
                  />
                </Col>
                {/* <Col sm={12} lg={12}>
                  <FormTextAreaField
                    name="description"
                    label={'Description:'}
                    tooltip={'Please enter the item type as listed on the invoice.'}
                    measure="md"
                    placeholder="Optional"
                    rows={4}
                    mb={15}
                    maxLength={100}
                  />
                </Col> */}
              </Row>
            </Box>
          </Modal.Body>
          <Modal.Footer fullWidth p={[0, 24, 24]}>
            <Row>
              <Col sm={6} col={6}>
                <Button
                  fullWidth
                  onClick={onClose}
                  uppercase={false}
                  as="a"
                  variant="outlined"
                  color="gray800"
                  mb={{ xs: 15, md: 0 }}
                >
                  Close
                </Button>
              </Col>
              <Col sm={6} col={6}>
                {/* <Tooltip
                  direction="up"
                  content={
                    <>
                      Missing items require a copy of your store invoice. <br />
                      Please be prepared to upload your document in Step 4 of 5: Report Your Damage.
                    </>
                  }
                > */}
                <Button fullWidth onClick={() => api.submit()} type="submit" uppercase={false} as="a" color="primary">
                  Confirm
                </Button>
                {/* </Tooltip> */}
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      )}
    </Form>
  );
};

export default AddWarrantyItemModal;
