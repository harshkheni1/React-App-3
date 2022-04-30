import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormInputFieldProps } from './types';
import { FormInputPassword } from './input-password';
import { FormLabel } from '../label';
import { FormError } from '../error';
import { FormInputFieldWrapStyled, FormInputStyled } from './input.styled';

export const FormInputPasswordField: FC<FormInputFieldProps> & WithStyle = ({
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
      <FormInputPassword {...props} />
      <FormError name={props.name} />
    </FormInputFieldWrapStyled>
  );
};

FormInputPasswordField.defaultProps = {
  measure: 'md',
  disabled: false,
  required: false,
  placeholder: 'Enter',
};

FormInputPasswordField.displayName = 'FormInputField';
FormInputPasswordField.Style = FormInputStyled;
