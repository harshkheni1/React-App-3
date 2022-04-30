import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormInputPhoneFieldProps } from './types';
import { FormLabel } from '../label';
import { FormError } from '../error';
import { FormInputFieldWrapStyled, FormInputStyled } from './input.styled';
import { FormInputPhone } from './input-phone';

export const FormInputPhoneField: FC<FormInputPhoneFieldProps> & WithStyle = ({
  m,
  mt,
  mr,
  mb,
  ml,
  p,
  pt,
  pr,
  pb,
  pl,
  ...props
}) => {
  return (
    <FormInputFieldWrapStyled {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl }}>
      {props.label && <FormLabel required={props.required}>{props.label}</FormLabel>}
      <FormInputPhone {...props} />
      <FormError name={props.name} />
    </FormInputFieldWrapStyled>
  );
};

FormInputPhoneField.defaultProps = {
  measure: 'md',
  disabled: false,
  hideError: true,
  required: false,
  placeholder: 'Enter',
};

FormInputPhoneField.displayName = 'FormInputPhoneField';
FormInputPhoneField.Style = FormInputStyled;
