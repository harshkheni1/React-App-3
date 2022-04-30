import React, { FC } from 'react';
import { styled } from '../../../utils';
import { DropdownMenuProps } from '../types';
import { Colors } from '../../../const';

const DropdownMenuChild: FC<DropdownMenuProps> = (props) => {
  const { className, children } = props;
  return <ul className={className}>{children}</ul>;
};
export const DropdownMenuStyled = styled(DropdownMenuChild)<DropdownMenuProps>`
  min-width: 360px;
  position: absolute;
  background-color: ${Colors.white};
  z-index: 10;
  list-style: none;
  padding: 0;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.4);
  margin: 20px 0 0 -170px;
  left: 24px;
  display: ${({ active }) => (active ? 'block' : 'none')};
  &:before,
  &:after {
    position: absolute;
    content: '';
  }

  &:before {
    height: 20px;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: transparent;
    top: -20px;
  }

  &:after {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid ${Colors.white};
    top: -6px;
    left: 50%;
    margin: 0 0 0 -3px;
    content: '';
    position: absolute;
    display: block;
    z-index: 11;
  }
`;
