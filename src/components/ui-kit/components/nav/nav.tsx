import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { NavProps, NavStaticProps } from './types';
import { NavStyled } from './nav.styled';
import { NavItem, NavItemStyled } from './item';
import { NavLink, NavLinkStyled } from './link';
import { NavContext } from './nav-context';

export const Nav: FC<NavProps> & NavStaticProps & WithStyle = (props) => {
  const { children, position, variant } = props;
  return (
    <NavContext.Provider value={props}>
      <NavStyled {...{ position, variant }}>{children}</NavStyled>
    </NavContext.Provider>
  );
};

Nav.defaultProps = {
  variant: 'basic',
};

NavItem.displayName = 'Nav.Item';
NavLink.displayName = 'Nav.Link';

Nav.Item = NavItem;
Nav.Item.Style = NavItemStyled;
Nav.Link = NavLink;
Nav.Link.Style = NavLinkStyled;
