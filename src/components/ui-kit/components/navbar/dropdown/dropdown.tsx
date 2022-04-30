import React, { FC } from 'react';
import { WithStyle } from '../../../utils/types';
import { NavbarDropdownProps } from '../types';
import { NavbarDropdownStyled } from './dropdown.styled';

export const NavbarDropdown: FC<NavbarDropdownProps> & WithStyle = (props) => {
  const { children, ...rest } = props;

  return <NavbarDropdownStyled {...rest}>{children}</NavbarDropdownStyled>;
};
