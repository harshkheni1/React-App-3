import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { NavLinkProps } from '../types';
import { NavLinkStyled } from './link.styled';

export const NavLink: FC<NavLinkProps> & WithStyle = React.memo(
  React.forwardRef(({ children, ...rest }, ref) => {
    return (
      <NavLinkStyled {...rest}>
        {React.Children.map(children, (c) => (
          <span>{c}</span>
        ))}
      </NavLinkStyled>
    );
  }),
);

NavLink.defaultProps = {
  as: 'span',
};

NavLink.displayName = 'NavLink';
