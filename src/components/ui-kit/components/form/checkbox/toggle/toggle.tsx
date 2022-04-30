import React, { FC } from 'react';
import { FormCheckboxElementProps } from '../types';
import { FormCheckboxToggleStyled } from './toggle.styled';

export const FormCheckboxToggle: FC<FormCheckboxElementProps> = () => {
  return <FormCheckboxToggleStyled />;
};

FormCheckboxToggle.defaultProps = {
  required: false,
  measure: 'md',
};

FormCheckboxToggle.displayName = 'FormCheckboxToggle';
