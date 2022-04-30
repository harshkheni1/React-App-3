import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Page,
  Container,
  Row,
  Col,
  Box,
  Heading,
  Text,
  Button,
  styled,
  FormInputField,
  A,
  Img,
  Hr,
  Loading,
  FormInputPasswordField,
} from '@/ui-kit';
import { Form, Validator } from 'react-uforms';

import { FunctionalPage } from '@/store/service-types';
import Layout from '../../containers/layout';
import NextLink from '@/components/next-link';
import { loginFlow } from '@/store/auth/actions';
import { nextRedirect } from '../../service/helpers';
import { LoginInterface } from '../../types/auth';

import File from '../../images/file.png';
import Track from '../../images/track-status.png';
import Plan from '../../images/plan.png';
import { getScopeError } from '@/store/scope-error/helpers';
import { isScopeLoading } from '@/store/scope-loading/helpers';
import { AuthScope } from '@/store/auth/types';
import { RootState } from '@/store/root-reducer';
import { useNotification } from '@/components/notification/hooks';
import { NotificationType } from '@/components/notification/types';
import { ApiError } from '@/core-types/api-error';
import { ModalContainerStyled } from '@/components/modal-content.styled';

export const WelcomeText = styled('div')`
  @media (max-width: 767px) {
    text-align: center;
    h2 {
      margin-bottom: 20px !important;
    }
  }
`;

export const SignInPage: FunctionalPage<{
  errors: ApiError | null;
  loading: boolean;
  loginFlow: typeof loginFlow;
}> = ({ errors, loading, loginFlow }) => {
  const pushNotification = useNotification();

  useEffect(() => {
    if (errors) {
      pushNotification(NotificationType.ERROR, errors.message);
    }
  }, [errors]);

  const getValidationRules = () => ({
    email: [Validator.Required(), Validator.Email()],
    password: [Validator.Required(), Validator.MinLength(6)],
  });

  const onSubmit = async (values: LoginInterface) => {
    loginFlow(values);
  };

  return (
    <Layout>
      <Page>
        <Container>
          <Row>
            <Col md={6}>
              <WelcomeText>
                <Text uppercase measure={{ xs: 'sm', md: 'lg' }}>
                  Welcome to the Customer portal
                </Text>
                <Heading as="h2" measure={{ xs: 'h5', md: 'h1' }} mb={32}>
                  Here you can:
                </Heading>
              </WelcomeText>
              <Box p={{ xs: [15, 15], sm: [40, 20] }} bg="white" align="center">
                <Row>
                  <Col sm={4} col={6}>
                    <Img src={File} alt="File a claim" height={{ xs: 40, sm: 58 }} />
                    <Text measure="sm" mb={{ xs: 15, sm: 0 }} mt={{ xs: 2, sm: 20 }}>
                      File a claim
                    </Text>
                  </Col>
                  <Col sm={4} col={6}>
                    <Img src={Track} alt="Track claim status" height={{ xs: 40, sm: 58 }} />
                    <Text measure="sm" mb={{ xs: 15, sm: 0 }} mt={{ xs: 2, sm: 20 }}>
                      Track claim status
                    </Text>
                  </Col>
                  <Col sm={4} col={12}>
                    <Img src={Plan} alt="Find details about your plans" height={{ xs: 40, sm: 58 }} />
                    <Text measure="sm" mb={{ xs: 15, sm: 0 }} mt={{ xs: 2, sm: 20 }}>
                      Find details about your plans
                    </Text>
                  </Col>
                </Row>
              </Box>
              <Text measure="sm" m={[30, 0]}>
                To get started, please log in or create an account!
              </Text>
            </Col>
            <Col md={6}>
              <Form onSubmit={onSubmit} validation={getValidationRules}>
                <ModalContainerStyled ml={{ xs: 0, md: 20 }} mb={{ xs: 30, md: 0 }}>
                  <Box p={[16]} align="center">
                    <Heading as="h5" mt={0} fontWeight="sbold">
                      Log In
                    </Heading>
                    <Text measure="xs" mb={0}>
                      Enter your email and password to log in.
                    </Text>
                  </Box>
                  <Hr color="gray500" m={[0]} />
                  <Box p={[24]}>
                    <FormInputField
                      autoComplete="username"
                      name="email"
                      label="Your email:"
                      measure="md"
                      placeholder="Enter your email"
                      type="text"
                      required
                      mb={16}
                    />
                    <Box mb={16}>
                      <FormInputPasswordField
                        autoComplete="current-password"
                        type="password"
                        name="password"
                        label="Your password:"
                        measure="md"
                        placeholder="Enter your password"
                        required
                      />
                    </Box>
                    <NextLink href={'/auth/forgot-password'} passHref>
                      <A color="primary">Forgot password?</A>
                    </NextLink>
                    <Button color="primary" mt={24} fullWidth borderRadius={0} type="submit">
                      LOG IN
                    </Button>
                  </Box>
                  <Hr color="gray500" m={[0]} />
                  <Box p={[16]} align="center">
                    <NextLink href={'/auth/sign-up'} passHref>
                      <A color="primary">Already bought a plan, but don`t have an account yet?</A>
                    </NextLink>
                  </Box>
                </ModalContainerStyled>
              </Form>
            </Col>
          </Row>
          {loading && <Loading full={false} color="gray800" />}
        </Container>
      </Page>
    </Layout>
  );
};

SignInPage.getInitialProps = ({ store, res }) => {
  const {
    app: { isAuthorized },
  } = store.getState();

  if (isAuthorized) {
    return nextRedirect(res, '/account');
  }
};

const mapStateToProps = ({ scopeError, scopeLoading }: RootState) => ({
  errors: getScopeError(scopeError, AuthScope),
  loading: isScopeLoading(scopeLoading, AuthScope),
});

const mapDipatchToProps = {
  loginFlow,
};

export default connect(mapStateToProps, mapDipatchToProps)(SignInPage);
