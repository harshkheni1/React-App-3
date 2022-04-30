import React, { Fragment } from 'react';
import { Validator } from 'react-uforms';

import { Box, Col, Hr, Row, Text, FormRadioGroupField } from '@/ui-kit';
import { SectionInterface } from './types';
import { Plan } from '@/core-types/plan';
import { Plan as PlanUI } from '@/components/plan';
import { Claim } from '@/core-types/claim';

export interface SectionSelectPlanProps {
  plans: Plan[];
}

const SectionSelectPlan: SectionInterface<SectionSelectPlanProps> = ({ plans }) => {
  return (
    <Fragment>
      <Text measure="sm" mt={0}>
        Please select your plan(s) below.
      </Text>
      <Hr color="white" m={[16, 0]} />
      <Row>
        <Col col={6}>
          <Text measure="xxs">
            <b>{plans.length}</b> plans found
          </Text>
        </Col>
      </Row>

      <Box>
        <FormRadioGroupField name="selectPlan.plan">
          {plans.map((plan: Plan) => (
            <PlanUI key={plan.id} plan={plan} isRadio={true} />
          ))}
        </FormRadioGroupField>
      </Box>
    </Fragment>
  );
};

SectionSelectPlan.defaultValues = (claim: Partial<Claim>) => {
  const { plan } = claim ?? {};

  return {
    plan: plan?.id,
  };
};
SectionSelectPlan.getValidationRules = () => ({
  plan: [Validator.Required()],
});

SectionSelectPlan.claimItemSubmit = ({ selectPlan: { plan } }) => ({
  plan,
});

export default SectionSelectPlan;
