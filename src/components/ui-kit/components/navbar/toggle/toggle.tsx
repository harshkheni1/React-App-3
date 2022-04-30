import React, { FC } from 'react';
import { WithStyle } from '../../../utils/types';
import { NavbarToggleProps } from '../types';
import { NavbarToggleStyled, NavbarToggleLineStyled } from './toggle.styled';

export const NavbarToggle: FC<NavbarToggleProps> & WithStyle = (props) => {
  return (
    <NavbarToggleStyled {...props}>
      <NavbarToggleLineStyled />
      <NavbarToggleLineStyled />
      <NavbarToggleLineStyled />
    </NavbarToggleStyled>
  );
};
