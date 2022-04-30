import React, { FC } from 'react';
import { WithStyle } from '../../../utils/types';
import { NavbarBrandProps } from '../types';
import { NavbarBrandStyled, NavbarBrandTextStyled } from './brand.styled';

export const NavbarBrand: FC<NavbarBrandProps> & WithStyle = React.memo(
  React.forwardRef(({ text, children, ...rest }, ref) => {
    return (
      <NavbarBrandStyled {...rest} ref={ref}>
        {children}
        {text && <NavbarBrandTextStyled> {text}</NavbarBrandTextStyled>}
      </NavbarBrandStyled>
    );
  }),
);

NavbarBrand.defaultProps = {
  as: 'span',
};

NavbarBrand.displayName = 'NavbarBrand';
