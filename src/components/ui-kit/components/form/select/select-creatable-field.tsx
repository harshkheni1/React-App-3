import React, { FC } from 'react';
import { FormSelectFieldProps } from './types';
import { FormSelectCreatable } from './select-creatable';
import { FormLabel } from '../label';
import { FormError } from '../error';
import { FormSelectContainerStyled } from './select.styled';

export const FormSelectCreatableField: FC<FormSelectFieldProps> = ({
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
    <FormSelectContainerStyled {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl }}>
      {props.label && <FormLabel required={props.required}>{props.label}</FormLabel>}
      <FormSelectCreatable {...props} />
      <FormError name={props.name} />
    </FormSelectContainerStyled>
  );
};
