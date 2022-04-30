import React, { FC } from 'react';
import { WithStyle } from '../../../utils/types';
import { NavbarCollapseProps } from '../types';
import { NavbarCollapseStyled } from './collapse.styled';

export const NavbarCollapse: FC<NavbarCollapseProps> & WithStyle = (props) => {
  const { children, ...rest } = props;
  return <NavbarCollapseStyled {...rest}>{children}</NavbarCollapseStyled>;
};
