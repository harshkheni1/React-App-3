import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormInputEmailFieldProps } from './types';
import { FormLabel } from '../label';
import { FormError } from '../error';
import { FormInputFieldWrapStyled, FormInputStyled } from './input.styled';
import { FormInputEmail } from './input-email';

export const FormInputEmailField: FC<FormInputEmailFieldProps> & WithStyle = ({
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
      <FormInputEmail {...props} />
      <FormError name={props.name} />
    </FormInputFieldWrapStyled>
  );
};

FormInputEmailField.defaultProps = {
  measure: 'md',
  disabled: false,
  hideError: true,
  required: false,
  placeholder: 'Enter',
};

FormInputEmailField.displayName = 'FormInputEmailField';
FormInputEmailField.Style = FormInputStyled;
