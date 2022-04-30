import { Colors, GridBreakpointsMediaDown } from '../../../const';
import { styled } from '../../../utils';
import { NavbarToggleProps } from '../types';

export const NavbarToggleLineStyled = styled('span')`
  width: 32px;
  height: 2px;
  background-color: ${Colors.gray800};
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 0 0 -16px;
  display: block;
  transition: all 0.2s ease;
`;

export const NavbarToggleStyled = styled('button')<NavbarToggleProps>`
  width: 52px;
  padding: 10px;
  position: relative;
  border: none;
  display: none;
  background-color: transparent;
  margin: 0 -10px 0 15px;
  cursor: pointer;
  ${GridBreakpointsMediaDown.md} {
    display: block;
  }
  &:focus {
    outline: none;
  }
  ${NavbarToggleLineStyled} {
    &:nth-child(1) {
      margin-top: ${({ active }) => (active ? '0' : '-12px')};
      transform: rotate(${({ active }) => (active ? '45deg' : '0deg')});
    }
    &:nth-child(2) {
      margin-top: -1px;
      display: ${({ active }) => (active ? 'none' : 'block')};
    }
    &:nth-child(3) {
      margin-top: ${({ active }) => (active ? '0' : '10px')};
      transform: rotate(${({ active }) => (active ? '-45deg' : '0deg')});
    }
  }
`;
