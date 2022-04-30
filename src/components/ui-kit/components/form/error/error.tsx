import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { ErrorProps } from './types';
import { FormErrorStyled } from './error.styled';
import { Icon } from '../../icon';

export const FormError: FC<ErrorProps> & WithStyle = ({ children, ...rest }) => {
  return (
    <FormErrorStyled {...rest}>
      <Icon name="warning" measure={15} color="danger" /> <span>{children}</span>
    </FormErrorStyled>
  );
};

FormError.displayName = 'FormError';
FormError.Style = FormErrorStyled;
