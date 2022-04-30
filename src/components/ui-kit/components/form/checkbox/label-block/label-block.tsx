import React, { FC } from 'react';
import { FormCheckboxLabelBlockStyled } from './label-block.styled';
import { FormCheckboxElementProps, FormCheckboxLabelProps } from '../types';

export const FormCheckboxLabelBlock: FC<FormCheckboxElementProps & FormCheckboxLabelProps> = (props) => {
  const { color, measure, className, children, toggle, variant } = props;
  return (
    <FormCheckboxLabelBlockStyled {...{ color, measure, className, toggle, variant }}>
      {children}
    </FormCheckboxLabelBlockStyled>
  );
};
