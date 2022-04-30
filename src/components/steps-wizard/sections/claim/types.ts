import { FormApiInterface, ValidationRulesInterface } from 'react-uforms';

export enum FileClaimSteps {
  SELECT_PLAN = 'Select your Plan',
  ADD_CLAIM_ITEMS = 'Select damaged items under your plan',
  ADD_CLAIM_ITEMS_DETAILS = 'Confirm item details',
  ADD_CLAIM_ITEMS_DAMAGE_DETAILS = 'Report your damage',
  REVIEW_CLAIM_DETAILS = 'Review claim details',
}

export const FileClaimStepsTitle = [
  {
    label: FileClaimSteps.SELECT_PLAN,
    value: 'selectPlan',
  },
  {
    label: FileClaimSteps.ADD_CLAIM_ITEMS,
    value: 'addClaimItems',
  },
  {
    label: FileClaimSteps.ADD_CLAIM_ITEMS_DETAILS,
    value: 'addClaimItemDetails',
  },
  {
    label: FileClaimSteps.ADD_CLAIM_ITEMS_DAMAGE_DETAILS,
    value: 'addDamageDetails',
  },
  {
    label: FileClaimSteps.REVIEW_CLAIM_DETAILS,
    value: 'reviewDetails',
  },
];

export type SectionInterface<T> = React.FC<T | undefined> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValidationRules: (api?: FormApiInterface, data?: any) => ValidationRulesInterface;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  claimItemSubmit;
};
