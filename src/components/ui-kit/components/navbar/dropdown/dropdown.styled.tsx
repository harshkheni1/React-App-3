import { Colors, GridBreakpointsMediaDown } from '../../../const';
import { styled } from '../../../utils';
import { NavbarDropdownProps } from '../types';
import { NavItemStyled, NavStyled } from '../../nav';

export const NavbarDropdownStyled = styled('div')<NavbarDropdownProps>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  width: 342px;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${Colors.white};
  border: 2px solid ${Colors.gray800};
  z-index: 3;
  box-sizing: border-box;
  margin-top: 10px;
  padding: 12px;
  &:before,
  &:after {
    width: 0;
    height: 0;
    display: block;
    position: absolute;
    content: '';
    border-style: solid;
  }
  &:before {
    top: -10px;
    right: 8px;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent ${Colors.gray800} transparent;
    ${GridBreakpointsMediaDown.sm} {
      right: 2px;
    }
  }
  &:after {
    top: -7px;
    right: 10px;
    border-width: 0 8px 8px 8px;
    border-color: transparent transparent ${Colors.white} transparent;
    ${GridBreakpointsMediaDown.sm} {
      right: 4px;
    }
  }

  ${GridBreakpointsMediaDown.sm} {
    width: calc(100vw - 20px);
    right: 7px;
  }

  ${NavStyled} {
    margin: 0;
  }

  ${NavItemStyled} {
    display: block;
  }
`;
