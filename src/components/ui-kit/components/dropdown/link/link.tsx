import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { DropdownLinkProps } from '../types';
import { DropdownLinkStyled } from './link.styled';

export const DropdownLink: FC<DropdownLinkProps> & WithStyle = React.memo(
  React.forwardRef(({ href, onClick, children }, ref) => {
    return <DropdownLinkStyled {...{ href, onClick, ref }}>{children}</DropdownLinkStyled>;
  }),
);

DropdownLink.displayName = 'Dropdown.Link';
