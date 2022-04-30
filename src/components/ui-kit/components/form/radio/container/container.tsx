import React, { FC } from 'react';
import { FormRadioContainerProps } from '../types';
import { FormRadioContainerStyled } from './container.styled';

export const FormRadioContainer: FC<FormRadioContainerProps> = ({ children, ...rest }) => {
  return <FormRadioContainerStyled {...rest}>{children}</FormRadioContainerStyled>;
};
