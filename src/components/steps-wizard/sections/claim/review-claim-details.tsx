import React, { Fragment } from 'react';

import { SectionInterface } from './types';
import { Claim as ClaimType } from '@/core-types/claim';
import PlanHeader from './helpers/plan-header';
import { Claim } from '@/components/claim';
import { Box, Text } from '@/components/ui-kit';

interface SectionReviewClaimDetailsProps {
  claim: Partial<ClaimType>;
}

const SectionReviewClaimDetails: SectionInterface<SectionReviewClaimDetailsProps> = ({ claim }) => {
  const { plan } = claim ?? {};

  return (
    <Fragment>
      <p>
        <Text measure="sm" as="em" fontFamily="secondary" color="primary" fontWeight="normal">
          If you need to add more items, please use the “Go Back” button.
        </Text>
      </p>
      <PlanHeader plan={plan} />
      <Box mt={15}>
        <Claim claim={claim as ClaimType} isExpanded={true} />
      </Box>
    </Fragment>
  );
};

SectionReviewClaimDetails.defaultValues = () => {
  return {};
};

SectionReviewClaimDetails.getValidationRules = () => ({});

SectionReviewClaimDetails.claimItemSubmit = ({}) => ({});

export default SectionReviewClaimDetails;
