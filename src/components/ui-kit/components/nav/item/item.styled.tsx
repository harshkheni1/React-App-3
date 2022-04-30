import React, { FC } from 'react';
import { css, styled } from '../../../utils';
import {
  Colors,
  displayHelperStyle,
  GridBreakpointsMediaDown,
  GridBreakpointsMediaUp,
  spacingStyle,
} from '../../../const';
import { NavItemProps } from '../types';
import { NavLinkStyled } from '../link';

const NavBasicItemActive = css`
  ${NavLinkStyled} {
    position: relative;
    color: ${Colors.primary};

    * {
      color: ${Colors.primary};
    }

    ${GridBreakpointsMediaUp.md} {
      &::after {
        content: '';
        width: 100%;
        position: absolute;
        display: block;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        height: 2px;
        background: ${Colors.primary};
      }
    }
  }

  ${GridBreakpointsMediaDown.md} {
    &::before {
      content: '';
      width: 2px;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      display: block;
      background: ${Colors.primary};
    }
  }
`;

const NavTabsItemActive = css`
  position: relative;
  &:after {
    height: 2px;
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${Colors.primary};
  }
  ${NavLinkStyled} {
    font-weight: bold !important;
  }
`;

const NavOutlinedItemActive = css`
  ${NavLinkStyled} {
    border: 1px solid ${Colors.primaryDark} !important;
    color: ${Colors.primaryDark};
    background-color: ${Colors.secondaryLight};
  }
`;

const NavItemChild: FC<NavItemProps> = (props) => {
  const { children, className } = props;
  return <li className={className}>{children}</li>;
};
export const NavItemStyled = styled(NavItemChild)<NavItemProps>`
  display: inline-flex;
  position: relative;
  ${({ active, variant }) =>
    active
      ? (variant === 'basic' && NavBasicItemActive) ||
        (variant === 'tabs' && NavTabsItemActive) ||
        (variant === 'outlined' && NavOutlinedItemActive)
      : ''}
  ${(props) => spacingStyle(props)}
  ${({ display }) => displayHelperStyle(display)}
`;
