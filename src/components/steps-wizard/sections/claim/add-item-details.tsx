import React, { Fragment } from 'react';
import { ValidationRulesInterface, Validator } from 'react-uforms';

import { SectionInterface } from './types';
import { Text } from '@/ui-kit';
import { Claim } from '@/core-types/claim';
import PlanHeader from './helpers/plan-header';
import { ModalContainerStyled } from '@/components/modal-content.styled';
import { ClaimsOptionsInterface } from '@/store/user/types';
import { ClaimItem } from '@/core-types/claim-item';
import { WarrantyItem } from '@/core-types/warranty-item';
import { ItemDetailsBox } from './helpers/item-details-box';

export interface SectionAddItemDetailsProps {
  claim: Partial<Claim>;
  warrantyItems: string[];
  claimOptions: ClaimsOptionsInterface;
}

const SectionAddItemDetails: SectionInterface<SectionAddItemDetailsProps> = ({
  claim,
  warrantyItems,
  claimOptions,
}) => {
  const { plan, warrantyItems: claimWarrantyItems, items: claimItems } = claim ?? {};

  const items = claimWarrantyItems?.filter((wi: WarrantyItem) => warrantyItems?.includes(wi.trackKey.toString()));
  const combinedItems = [...(claimItems ?? []), ...(items ?? [])];

  return (
    <Fragment>
      <PlanHeader plan={plan} />
      <ModalContainerStyled m={[10, 0]} p={[10, 0]}>
        {combinedItems?.map((item: ClaimItem, idx: number) => (
          <ItemDetailsBox key={`${item.id}_${idx}`} item={item} idx={idx} claimOptions={claimOptions} />
        ))}
      </ModalContainerStyled>
    </Fragment>
  );
};

SectionAddItemDetails.defaultValues = (claim: Claim) => {
  const { items, warrantyItems } = claim ?? {};

  const defaults = [...(items ?? []), ...(warrantyItems ?? [])].reduce((acc, item) => {
    acc[item.id] = {
      color: item?.color?.id.toString(),
      material: item?.material?.id.toString(),
      manufacturer: item?.manufacturer?.id.toString(),
      vendor: item?.vendor?.toString(),
      itemDescription: item?.itemDescription?.toString(),
    };

    return acc;
  }, {});
  return defaults;
};

SectionAddItemDetails.getValidationRules = ({ getValue }, claim) => {
  const warrantyItems = getValue('addClaimItems.warrantyItems');

  const { warrantyItems: claimWarrantyItems, items: claimItems } = claim ?? {};

  const items = claimWarrantyItems?.filter((wi: WarrantyItem) => warrantyItems?.includes(wi.trackKey.toString()));
  const combinedItems =
    warrantyItems && warrantyItems.length > 0
      ? items
      : warrantyItems == null
      ? []
      : [...(claimItems ?? []), ...(items ?? [])];

  const rules =
    combinedItems &&
    combinedItems?.reduce((acc: ValidationRulesInterface, item: ClaimItem) => {
      acc[item.id] = {
        color: [Validator.Required()],
        material: [Validator.Required()],
        manufacturer: [Validator.Required()],
        vendor: [Validator.Required()],
        itemDescription: [Validator.Required()],
      };

      return acc;
    }, {});

  return rules;
};

SectionAddItemDetails.claimItemSubmit = ({ addClaimItemDetails }) => ({
  addClaimItemDetails,
});

export default SectionAddItemDetails;
