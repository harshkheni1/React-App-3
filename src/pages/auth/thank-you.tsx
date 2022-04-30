import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Page,
  Container,
  Heading,
  Text,
  Button,
  Icon,
  Box,
  styled,
  SectionStyled,
  GridBreakpointsMediaUp,
} from '@/ui-kit';
import Layout from '../../containers/layout';
import { FunctionalPage } from '@/store/service-types';
import { nextRedirect } from 'src/service/helpers';
import NextLink from '@/components/next-link';

export const ThankContainerStyled = styled(Box)`
  ${GridBreakpointsMediaUp.md} {
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: white;
    max-width: 522px;
    margin: 0 auto;

    ${SectionStyled} > *:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
`;

const ThankYouPage: FunctionalPage = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  });

  return (
    <Layout>
      <Page bg={{ xs: 'white', md: 'gray300' }} pt={{ xs: 0, md: 30 }}>
        <Container>
          <ThankContainerStyled>
            <Heading as="h5" align="center" fontWeight="sbold" p={[16, 24, 8]}>
              Please verify your email
            </Heading>
            <hr />
            <Box p={[24]} align="center">
              <Icon name="check-in" measure={78} m={[8, 'auto', 16]} color="success" />
              <Text measure="sm" mb={24}>
                Thank you for signing up! We have sent you a verification email.{' '}
                <b>Please click the verification link in the email</b> to complete your account registration.
              </Text>
              <NextLink href="/">
                <Button variant="solid" color="secondaryLight" as="div" fullWidth style={{ letterSpacing: '2px' }}>
                  Log in
                </Button>
              </NextLink>
            </Box>
          </ThankContainerStyled>
        </Container>
      </Page>
    </Layout>
  );
};

ThankYouPage.getInitialProps = ({ store, res }) => {
  const {
    app: { isAuthorized },
  } = store.getState();

  if (isAuthorized) {
    return nextRedirect(res, '/');
  }
};

export default connect()(ThankYouPage);
