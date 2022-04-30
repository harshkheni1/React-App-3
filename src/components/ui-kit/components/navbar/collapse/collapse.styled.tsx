import { Colors, GridBreakpointsMediaDown, GridBreakpointsMediaUp } from '../../../const';
import { styled } from '../../../utils';
import { NavbarCollapseProps } from '../types';
import { NavStyled, NavItemStyled } from '../../nav';

export const NavbarCollapseStyled = styled('div')<NavbarCollapseProps>`
  ${GridBreakpointsMediaDown.md} {
    display: ${({ active }) => (active ? 'block' : 'none')};
    width: 100%;
    position: fixed;
    top: 70px;
    left: 0;
    height: calc(100vh - 70px);
    right: 5px;
    z-index: 1;
    background-color: #fff;
    border-top: 2px solid ${Colors.gray300};
    ${NavStyled} {
      margin: 0;
    }
    ${NavItemStyled} {
      display: block;
      border-bottom: 2px solid ${Colors.gray300};
      padding: 24px 15px !important;
    }
  }
  ${GridBreakpointsMediaUp.md} {
    display: block !important;
  }
`;
