import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormInputProps } from './types';
import { FormInputStyled, FormInputWrapStyled } from './input.styled';
import { Icon } from '../../icon';

export const FormInput: FC<FormInputProps> & WithStyle = ({ as, ref, variant, ...props }) => {
  return (
    <FormInputWrapStyled>
      <FormInputStyled $variant={variant} {...props} />
      <Icon name="check-thin" color="success" measure={22} />
    </FormInputWrapStyled>
  );
};

FormInput.defaultProps = {
  measure: 'md',
  type: 'text',
  disabled: false,
  required: false,
  placeholder: 'Enter',
  hideError: true,
  variant: 'default',
};

FormInput.displayName = 'FormInput';
FormInput.Style = FormInputStyled;
