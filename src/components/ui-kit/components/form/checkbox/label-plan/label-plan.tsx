import React, { FC } from 'react';
import { FormCheckboxLabelPlanStyled } from './label-plan.styled';
import { FormCheckboxPlanGroupFieldProps } from '../types';

export const FormCheckboxLabelPlan: FC = (props) => {
  return <FormCheckboxLabelPlanStyled>{props.children}</FormCheckboxLabelPlanStyled>;
};
