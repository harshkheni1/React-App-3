import React, { FC } from 'react';
import { styled } from '../../../utils';
import { DropdownItemProps } from '../types';
import { Colors } from '../../../const';

const NavItemChild: FC<DropdownItemProps> = (props) => {
  const { children, className } = props;
  return <li className={className}>{children}</li>;
};

export const DropdownItemStyled = styled(NavItemChild)<DropdownItemProps>`
  border-bottom: 1px solid ${Colors.secondary};
`;
