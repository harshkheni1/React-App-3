import React, { FC } from 'react';
import { WithStyle } from '../../../../utils';
import { FormRadioProps } from '../types';
import { FormRadioHiddenStyled } from './hidden.styled';

export const FormRadioHidden: FC<FormRadioProps> & WithStyle = (props) => {
  const { name, value, id, required, disabled, checked, color, measure, onChange } = props;
  return <FormRadioHiddenStyled {...{ name, id, value, required, disabled, checked, color, measure, onChange }} />;
};

FormRadioHidden.defaultProps = {
  required: false,
  color: 'primary',
  measure: 'md',
};

FormRadioHidden.displayName = 'FormRadioHidden';
