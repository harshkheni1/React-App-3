import React, { Fragment, useEffect } from 'react';
import { Form, Validator } from 'react-uforms';
import { connect } from 'react-redux';

import {
  Box,
  Col,
  Container,
  Heading,
  Text,
  Page,
  Row,
  Hr,
  FormInputClearable,
  Button,
  FormLabel,
  Loading,
} from '@/ui-kit';
import { FunctionalPage } from '@/store/service-types';
import Layout from '../../containers/layout';
import { isFormNotValidated } from '../../service/helpers';
import { ModalContainerStyled } from '@/components/modal-content.styled';
import { RootState } from '@/store/root-reducer';
import { isScopeLoading } from '@/store/scope-loading/helpers';
import { getScopeError } from '@/store/scope-error/helpers';
import { AuthScope } from '@/store/auth/types';
import { useNotification } from '@/components/notification/hooks';
import { NotificationType } from '@/components/notification/types';
import { ApiError } from '@/core-types/api-error';
import { forgotPasswordFlow } from '@/store/auth/actions';
import { ForgotPasswordInterface } from '@/core-types/auth';

interface ForgotPasswordPageProps {
  errors: ApiError | null;
  loading: boolean;
  forgotPassword: typeof forgotPasswordFlow;
}

const ForgotPasswordPage: FunctionalPage<ForgotPasswordPageProps> = ({ errors, loading, forgotPassword }) => {
  const pushNotification = useNotification();

  useEffect(() => {
    if (errors) {
      pushNotification(NotificationType.ERROR, errors.message);
    }
  }, [errors]);

  const getValidationRules = () => ({
    email: [Validator.Required(), Validator.Email()],
  });

  const onSubmit = async ({ email }: ForgotPasswordInterface) => {
    forgotPassword({ email });
  };

  return (
    <Layout hideFooter>
      <Page bg="gray300">
        <Container>
          <Row>
            <Col mdOffset={2} md={8} lgOffset={3} lg={6}>
              <ModalContainerStyled>
                <Form validation={getValidationRules} onSubmit={onSubmit}>
                  {({ getAllErrors, getAllValues }) => (
                    <Fragment>
                      <Heading as="h1" measure="h5" align="center" p={[15, 25]} fontWeight="sbold">
                        Forgot Password
                      </Heading>
                      <Text measure="xs" align="center" m={[0]} p={[0, 25]}>
                        Please enter the email address associated with your account, and we will send you a password
                        reset link.
                      </Text>
                      <Hr color="gray500" />
                      <Box p={[0, 25, 25]}>
                        <FormLabel>
                          <Text as="span" measure="sm" mb={8} display="block">
                            Your email:
                          </Text>
                          <FormInputClearable type="email" name="email" required clearable placeholder="Required" />
                        </FormLabel>
                        <Button
                          mt={16}
                          fullWidth
                          measure="lg"
                          color="secondaryLight"
                          type="submit"
                          disabled={isFormNotValidated(['email'], { ...getAllErrors() }, { ...getAllValues() })}
                        >
                          confirm
                        </Button>
                      </Box>
                    </Fragment>
                  )}
                </Form>
              </ModalContainerStyled>
            </Col>
          </Row>
          {loading && <Loading full={false} color="gray800" />}
        </Container>
      </Page>
    </Layout>
  );
};

const mapStateToProps = ({ scopeError, scopeLoading }: RootState) => ({
  errors: getScopeError(scopeError, AuthScope),
  loading: isScopeLoading(scopeLoading, AuthScope),
});

const mapDipatchToProps = {
  forgotPassword: forgotPasswordFlow,
};

export default connect(mapStateToProps, mapDipatchToProps)(ForgotPasswordPage);
