import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { HrProps } from './types';
import { HrStyled } from './hr.styled';

export const Hr: FC<HrProps> & WithStyle = ({ color, children, ...rest }) => (
  <HrStyled $color={color} {...rest}>
    {children}
  </HrStyled>
);

Hr.defaultProps = {
  color: 'primary',
};

Hr.displayName = 'Hr';
Hr.Style = HrStyled;
