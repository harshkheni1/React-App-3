import React, { FC } from 'react';
import { styled } from '../../../utils';
import { Colors } from '../../../const';
import { DropdownLinkProps } from '../types';

const DropdownLinkChild: FC<DropdownLinkProps> = (props) => {
  const { className, href, ref, onClick, children } = props;
  return <a {...{ className, href, ref, onClick }}>{children}</a>;
};

export const DropdownLinkStyled = styled(DropdownLinkChild)<DropdownLinkProps>`
  color: ${Colors.gray700};
  position: relative;
  font-weight: 500;
  display: block;
  padding: 15px 40px 15px 15px;

  &:hover,
  &:focus {
    color: ${Colors.primary};
  }
`;
