import React, { FC } from 'react';
import { styled } from '../../../utils';
import { Colors } from '../../../const';
import { NavbarBrandProps, NavbarBrandTextProps } from '../types';

export const NavbarBrandStyled = styled('div')<NavbarBrandProps>`
  display: flex;
  align-items: center;
  img,
  svg {
    width: auto;
    display: block;
    margin-top: 5px;
    flex: 1;
  }
`;

const NavbarBrandTextChild: FC<NavbarBrandTextProps> = (props) => {
  const { className, children } = props;
  return <span {...{ className }}>{children}</span>;
};
export const NavbarBrandTextStyled = styled(NavbarBrandTextChild)<NavbarBrandTextProps>`
  font-weight: 300;
  line-height: 22px;
  flex: 1;
  display: block;
  padding: 10px 15px;
  margin-left: 15px;
  border-left: 1px solid ${Colors.secondary};
`;
