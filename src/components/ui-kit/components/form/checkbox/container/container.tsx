import React, { FC } from 'react';
import { FormCheckboxContainerProps } from '../types';
import { FormCheckboxContainerStyled } from './container.styled';

export const FormCheckboxContainer: FC<FormCheckboxContainerProps> = ({ name, children, ...rest }) => {
  return (
    <FormCheckboxContainerStyled $name={name} {...rest}>
      {children}
    </FormCheckboxContainerStyled>
  );
};
