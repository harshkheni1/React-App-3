import { styled, css } from '../../../utils';
import { Colors } from '../../../const';
import { NavLinkProps } from '../types';

const NavLinkAction = css`
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: none;
    color: ${Colors.primary};
  }
`;

export const NavLinkStyled = styled('a')<NavLinkProps>`
  line-height: 19px;
  display: block;
  color: ${Colors.gray700};
  user-select: none;
  cursor: pointer;
  background-color: transparent;
  border: none;
  ${({ variant }) => variant === 'action' && NavLinkAction}
`;
