import React, { FC } from 'react';
import { FormDatepickerFieldProps } from './types';
import { FormDatepicker } from './datepicker';
import { FormLabel } from '../label';
import { FormError } from '../error';
import { FormDatepickerWrapStyled } from './datepicker.styled';

export const FormDatepickerField: FC<FormDatepickerFieldProps> = ({
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
  label,
  ...props
}) => {
  return (
    <FormDatepickerWrapStyled {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl }}>
      {label && <FormLabel required={props.required}>{label}</FormLabel>}
      <FormDatepicker {...props} />
      <FormError name={props.name} />
    </FormDatepickerWrapStyled>
  );
};
