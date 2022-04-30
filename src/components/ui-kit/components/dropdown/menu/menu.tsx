import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { DropdownMenuProps, DropdownStaticProps } from '../types';
import { DropdownMenuStyled } from './menu.styled';

export const DropdownMenu: FC<DropdownMenuProps> & DropdownStaticProps & WithStyle = (props) => {
  const { children } = props;
  return <DropdownMenuStyled active={props.active}>{children}</DropdownMenuStyled>;
};

DropdownMenu.displayName = 'DropdownMenu';
