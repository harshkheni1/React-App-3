import React, { FC } from 'react';
import { FormRadioProps } from '../types';
import { FormRadioBlockStyled } from './block.styled';

export const FormRadioBlock: FC<FormRadioProps> = (props) => {
  const { color, measure, className, children } = props;
  return <FormRadioBlockStyled {...{ color, measure, className }}>{children}</FormRadioBlockStyled>;
};
