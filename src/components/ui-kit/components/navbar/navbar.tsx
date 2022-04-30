import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { NavbarProps, NavbarStaticProps } from './types';
import { NavbarStyled } from './navbar.styled';
import { NavbarBrand, NavbarBrandStyled } from './brand';
import { NavbarCollapse, NavbarCollapseStyled } from './collapse';
import { NavbarToggle, NavbarToggleStyled } from './toggle';
import { NavbarDropdown, NavbarDropdownStyled } from './dropdown';

export const Navbar: FC<NavbarProps> & NavbarStaticProps & WithStyle = (props) => {
  const { children } = props;
  return <NavbarStyled>{children}</NavbarStyled>;
};

NavbarBrand.displayName = 'Navbar.Brand';
NavbarCollapse.displayName = 'Navbar.Collapse';
NavbarDropdown.displayName = 'Navbar.Dropdown';
NavbarToggle.displayName = 'Navbar.Toggle';

Navbar.Brand = NavbarBrand;
Navbar.Brand.Style = NavbarBrandStyled;
Navbar.Collapse = NavbarCollapse;
Navbar.Collapse.Style = NavbarCollapseStyled;
Navbar.Dropdown = NavbarDropdown;
Navbar.Dropdown.Style = NavbarDropdownStyled;
Navbar.Toggle = NavbarToggle;
Navbar.Toggle.Style = NavbarToggleStyled;
