import { styled } from '../../utils';
import { Colors, GridBreakpointsMediaUp } from '../../const';
import { NavStyled, NavItemStyled, NavLinkStyled } from '../nav';

export const NavbarStyled = styled('div')`
  padding: 10px 0;
  margin: 0;
  position: relative;
  ${NavStyled} {
    ${NavItemStyled} {
      padding: 13px 12px;
      ${GridBreakpointsMediaUp.md} {
        &:nth-child(1) {
          margin-left: 12px;
        }
      }
      ${NavLinkStyled} {
        color: ${Colors.gray800};
      }
    }
  }
`;
