import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { DropdownProps, DropdownStaticProps } from './types';
import { DropdownStyled } from './dropdown.styled';
import { DropdownMenu, DropdownMenuStyled } from './menu';
import { DropdownItem, DropdownItemStyled } from './item';
import { DropdownLink, DropdownLinkStyled } from './link';

export const Dropdown: FC<DropdownProps> & DropdownStaticProps & WithStyle = (props) => {
  const { children } = props;
  return <DropdownStyled>{children}</DropdownStyled>;
};

Dropdown.displayName = 'Dropdown';
Dropdown.Style = DropdownStyled;

Dropdown.Menu = DropdownMenu;
DropdownMenu.displayName = 'Dropdown.Menu';
DropdownMenu.Style = DropdownMenuStyled;

Dropdown.Item = DropdownItem;
DropdownItem.displayName = 'Dropdown.Item';
DropdownItem.Style = DropdownItemStyled;

Dropdown.Link = DropdownLink;
DropdownLink.Style = DropdownLinkStyled;
