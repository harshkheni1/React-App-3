import React, { FC } from 'react';
import { styled, css } from '../../utils';
import { NavProps } from './types';
import { NavItemStyled } from './item';
import { NavLinkStyled } from './link';
import { Colors, TextSize } from '../../const';

const NavChild: FC<NavProps> = (props) => {
  const { className, children } = props;
  return <ul className={className}>{children}</ul>;
};

export const NavLinkStyles = css`
  line-height: 19px;
  height: 19px;
  padding: 0;
  font-size: ${TextSize.md};
  * {
    vertical-align: text-bottom;
    line-height: 16px;
  }
`;

export const NavBasicStyles = css`
  margin: 0 -12px;
  ${NavItemStyled} {
    padding: 0 12px;
  }
  ${NavLinkStyled} {
    font-weight: 600;
    color: ${Colors.gray500};
    * {
      fill: ${Colors.gray500};
    }
    ${NavLinkStyles}
  }
`;

export const NavTabsStyles = css`
  margin: 0 -20px;
  border-bottom: 1px solid ${Colors.secondary};
  ${NavItemStyled} {
    padding: 12px 20px;
  }
  ${NavLinkStyled} {
    font-weight: normal;
    color: ${Colors.gray800};
    * {
      fill: ${Colors.gray800};
    }
    ${NavLinkStyles}
  }
`;

export const NavOutlinedStyles = css`
  ${NavItemStyled} {
    &:not(:last-child) {
      margin: 0 15px 15px 0;
    }

    ${NavLinkStyled} {
      font-size: ${TextSize.sm};
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      border: 1px solid ${Colors.gray800};
    }
  }
`;

export const NavStyled = styled(NavChild)<NavProps>`
  padding: 0;
  display: block;
  list-style: none;
  ${({ variant }) =>
    (variant == 'basic' && NavBasicStyles) ||
    (variant == 'tabs' && NavTabsStyles) ||
    (variant == 'outlined' && NavOutlinedStyles)}
  ${({ position }) => (position === 'left' && 'margin-right: auto;') || (position === 'right' && 'margin-left: auto;')}
`;
