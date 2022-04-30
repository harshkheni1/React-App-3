import React, { Fragment, useContext, useEffect } from 'react';
import { ContextApi, Validator } from 'react-uforms';

import { SectionInterface } from './types';
import { Claim } from '@/core-types/claim';
import {
  Row,
  Col,
  Button,
  Box,
  FormCheckboxGroupField,
  FormCheckboxPlanGroupField,
  styled,
  Text,
  FormErrorStyled,
  Tooltip,
} from '@/components/ui-kit';
import PlanHeader from './helpers/plan-header';
import * as API from '../../../../service/api';
interface SectionSelectDamagedItemsProps {
  claim: Partial<Claim>;
  onAddMissingItemsHandler: () => void;
  onDeleteClaimItem: (id: string | number) => void;
}

const FormCheckboxGroupFieldStyle = styled('div')`
  ${FormErrorStyled} {
    display: block;
    width: 100%;
    padding: 15px;
  }
`;
const AddButtonStyle = styled(Button)`
  border-radius: 10px !important;
  border: 2px dashed !important;
  padding: 19px;
`;
const Tooltipwraper = styled('div')`
  display: flex;
  p {
    width: auto !important;
  }
  div {
    text-align: center;
  }
`;

const SectionAddClaimItems: SectionInterface<SectionSelectDamagedItemsProps> = ({
  claim,
  onAddMissingItemsHandler,
  onDeleteClaimItem,
}) => {
  const { plan, warrantyItems, items } = claim ?? {};
  const formApi = useContext(ContextApi);

  useEffect(() => {
    formApi.setValue(
      'addClaimItems.claimedItems',
      items?.map((i) => i.id.toString()),
    );
    formApi.setTouched('addClaimItems.claimedItems');
    formApi.setTouched('addClaimItems.warrantyItems');
    if (items?.length > 0) {
      items.forEach((itemElement) => {
        claim.warrantyItems = warrantyItems?.filter(
          (warrntyValue) => warrntyValue?.sku?.toString() != itemElement?.sku?.toString(),
        );
      });
    }
    if (items == undefined) {
      getdatabaseDetail();
    }
  }, [items]);

  function getdatabaseDetail() {
    API.user?.detailedClaims().then((res) => {
      res['result'].forEach((element) => {
        if (element.claimid == localStorage.getItem('claimId')) {
          const createNewArrayForData = [];
          element.items.forEach((response) => {
            createNewArrayForData.push({
              claimId: (response.claim_id * 1).toString(), //for backward relation
              id: (response.item_id * 1).toString(),
              type: { id: response.item_type, name: response.item_type_disp },
              manufacturer: { id: response.manufact_id, name: response.manufact_disp },
              color: { id: response.color_id, name: response.manufact_disp },
              material: { id: response.material_id, name: response.material_id_disp },
              damages: [],
              files: [],
              sku: response.sku,
              vendor: response.vendor,
              itemDescription: response.item_descr,
            });
          });
          claim.items = createNewArrayForData;
        }
      });
    });
  }
  return (
    <Fragment>
      <PlanHeader plan={plan} />
      <Box mt={20}>
        <Tooltipwraper>
          <Text measure="sm" mr={10} mt={0}>
            Please select at least 1 item on this step.
          </Text>
          <Tooltip
            direction="right"
            isButton={true}
            content={
              <>
                Please select at least 1 item under your plan.
                <br />
                If an item is not listed here, but is listed on your invoice, click Add Missing Item to add the item
                manually.
                <br />
                Missing items require a copy of your store invoice.
                <br />
                Please be prepared to upload your document in Step 4 of 5: Report Your Damage.
              </>
            }
          />
        </Tooltipwraper>
        <FormCheckboxGroupFieldStyle>
          <Row>
            {items?.length > 0 && (
              <FormCheckboxGroupField name="addClaimItems.claimedItems">
                {items?.map((item, idx) => (
                  <Col md={6} key={`${item.id}_${idx}`}>
                    <FormCheckboxPlanGroupField
                      label={item.type?.name}
                      vendor={item.vendor ? `${item.vendor}` : ''}
                      itemDescription={item.itemDescription ? item.itemDescription : ''}
                      mb={16}
                      value={`${item.id}`}
                      onClick={() => onDeleteClaimItem(item.id)}
                      checked={true}
                      name={`${item.id}`}
                      sku={item.sku ? item.sku.toString() : ''}
                    />
                  </Col>
                ))}
              </FormCheckboxGroupField>
            )}
            <FormCheckboxGroupField name="addClaimItems.warrantyItems" hideError>
              {warrantyItems?.map((item) => (
                <Col md={6} key={item.trackKey}>
                  <FormCheckboxPlanGroupField
                    label={item.type.name}
                    vendor={item.vendor ? item.vendor : ''}
                    itemDescription={item.itemDescription ? item.itemDescription : ''}
                    mb={16}
                    value={`${item.trackKey}`}
                    sku={item.sku ? item.sku : ''}
                  />
                </Col>
              ))}
              <Col md={6}>
                <AddButtonStyle
                  variant="outlined"
                  color="primary"
                  fontWeight="sbold"
                  fullWidth
                  measure="lg"
                  onClick={onAddMissingItemsHandler}
                >
                  + Add Missing Item
                </AddButtonStyle>
              </Col>
            </FormCheckboxGroupField>
          </Row>
        </FormCheckboxGroupFieldStyle>
      </Box>
    </Fragment>
  );
};

SectionAddClaimItems.defaultValues = (claim: Claim) => {
  const { items } = claim ?? {};
  return {
    warrantyItems: [],
    claimedItems: items?.map((item) => item.id.toString()),
  };
};

SectionAddClaimItems.getValidationRules = ({ getValue }, activeClaim) => {
  const warrantyItems = getValue('addClaimItems.warrantyItems');
  const { items: existingClaimedItems } = activeClaim ?? {};

  return {
    warrantyItems: !existingClaimedItems || existingClaimedItems.length === 0 ? [Validator.Required()] : [],
    claimedItems: warrantyItems?.length === 0 ? [Validator.Required()] : [],
  };
};

SectionAddClaimItems.claimItemSubmit = ({ addClaimItems: { warrantyItems } }) => ({
  warrantyItems,
});

export default SectionAddClaimItems;
