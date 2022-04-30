import React, { FC } from 'react';
import { FormCheckboxLabelStyled } from './label.styled';
import { FormCheckboxElementProps, FormCheckboxLabelProps } from '../types';

export const FormCheckboxLabel: FC<FormCheckboxElementProps & FormCheckboxLabelProps> = (props) => {
  const { color, measure, className, children, toggle } = props;
  return <FormCheckboxLabelStyled {...{ color, measure, className, toggle }}>{children}</FormCheckboxLabelStyled>;
};
