import React, { FC, useContext } from 'react';
import { WithStyle } from '../../../utils';
import { NavItemProps } from '../types';
import { NavItemStyled } from './item.styled';
import { NavContext } from '../nav-context';

export const NavItem: FC<NavItemProps> & WithStyle = (props) => {
  const { active, children, ...rest } = props;
  const contextProps = useContext(NavContext);

  return (
    <NavItemStyled active={active} variant={contextProps.variant} {...rest}>
      {children}
    </NavItemStyled>
  );
};
