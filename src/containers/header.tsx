import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { RootState } from '@/store/root-reducer';
import NextLink from '@/components/next-link';
import { useRouter } from 'next/router';
import { Navbar, Nav, Container, Box, Icon } from '@/ui-kit';
import { MainHeaderStyled } from './styled/main.styled';
import logo from '../images/logo.png';

const Header: React.FC<{ isAuthorized: boolean }> = ({ isAuthorized }) => {
  const [isExpand, setIsExpand] = useState(false);
  const router = useRouter();

  const menuAuthorized = (
    <Fragment>
      <Navbar.Collapse active={isExpand}>
        <Nav position="right">
          {isAuthorized && (
            <>
              <Nav.Item active={router.pathname != '/faq' ? true : false} display={{ md: 'none' }}>
                <NextLink href="/" passHref>
                  <Nav.Link variant="action" as="a">
                    Plans &amp; Claims
                  </Nav.Link>
                </NextLink>
              </Nav.Item>
              <Nav.Item active={router.pathname == '/faq' ? true : false} display={{ md: 'none' }}>
                <NextLink href="/faq" passHref>
                  <Nav.Link variant="action" as="a">
                    FAQ
                  </Nav.Link>
                </NextLink>
              </Nav.Item>
            </>
          )}
          <Nav.Item>
            <NextLink href="/auth/sign-out" passHref>
              <Nav.Link variant="action" as="a">
                Sign Out
              </Nav.Link>
            </NextLink>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Toggle active={isExpand} onClick={() => setIsExpand(!isExpand)} />
    </Fragment>
  );

  const authedNavi = isAuthorized && (
    <>
      <Nav.Item active={router.pathname != '/faq' ? true : false}>
        <NextLink href="/" passHref>
          <Nav.Link variant="action" as="a">
            Plans &amp; Claims
          </Nav.Link>
        </NextLink>
      </Nav.Item>
      <Nav.Item active={router.pathname == '/faq' ? true : false}>
        <NextLink href="/faq" passHref>
          <Nav.Link variant="action" as="a">
            FAQ
          </Nav.Link>
        </NextLink>
      </Nav.Item>
    </>
  );

  const mainMenu = (
    <Nav position="left">
      <Box display={{ xs: 'none', md: 'block' }} ml={30}>
        {authedNavi}
      </Box>
    </Nav>
  );

  return (
    <MainHeaderStyled>
      <Navbar>
        <Container>
          <Box display="flex">
            <Navbar.Brand>
              <NextLink href="/" passHref>
                <Nav.Link variant="action" as="a">
                  {/* <Icon name="gbs-logo" measure={17} /> */}
                  <img src={logo} alt="logo" />
                </Nav.Link>
              </NextLink>
            </Navbar.Brand>
            {mainMenu}
            {isAuthorized && menuAuthorized}
          </Box>
        </Container>
      </Navbar>
    </MainHeaderStyled>
  );
};

const mapStateToProps = (state: RootState) => {
  const {
    app: { isAuthorized },
  }: RootState = state;

  return {
    isAuthorized,
  };
};

export default connect(mapStateToProps)(Header);
