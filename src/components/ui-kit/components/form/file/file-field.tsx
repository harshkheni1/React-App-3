import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormFileFieldProps } from './types';
import { FormFile } from './file';
import { FormLabel } from '../label';
import { FormError } from '../error';
import { FormFileFieldWrapStyled } from './file.styled';

export const FormFileField: FC<FormFileFieldProps> & WithStyle = ({
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
  required,
  ...rest
}) => {
  return (
    <FormFileFieldWrapStyled {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl }}>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <FormFile {...rest} />
      <FormError name={rest.name} />
    </FormFileFieldWrapStyled>
  );
};

FormFileField.defaultProps = {
  disabled: false,
  required: false,
  placeholder: 'Enter',
};

FormFileField.displayName = 'FormFileField';
