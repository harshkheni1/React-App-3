import React, { FC } from 'react';
import { FormRadioLabelStyled } from './label.styled';
import { FormRadioElementProps, FormRadioLabelProps } from '../types';

export const FormRadioLabel: FC<FormRadioElementProps & FormRadioLabelProps> = (props) => {
  const { color, measure, className, children, planStyle } = props;
  return <FormRadioLabelStyled {...{ color, measure, className, planStyle }}>{children}</FormRadioLabelStyled>;
};

FormRadioLabel.defaultProps = {
  color: 'primary',
  planStyle: false,
};
