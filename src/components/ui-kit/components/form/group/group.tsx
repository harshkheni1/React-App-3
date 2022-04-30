import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormGroupStyled } from './group.styled';
import { FormGroupProps } from './types';

export const FormGroup: FC<FormGroupProps> & WithStyle = (props) => {
  const { children, ...rest } = props;
  return <FormGroupStyled {...rest}>{children}</FormGroupStyled>;
};

FormGroup.displayName = 'FormGroup';
FormGroup.Style = FormGroupStyled;
