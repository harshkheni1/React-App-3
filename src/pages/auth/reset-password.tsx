import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Validator } from 'react-uforms';
import { useRouter } from 'next/router';

import {
  Box,
  Col,
  Container,
  Heading,
  Page,
  Row,
  Hr,
  FormError,
  Button,
  FormInputPassword,
  Text,
  FormLabel,
  FormInputField,
  Loading,
} from '@/ui-kit';
import { ModalContainerStyled } from '@/components/modal-content.styled';
import Layout from '../../containers/layout';
import { isFormNotValidated, getAsString, getAsNumber } from '../../service/helpers';
import { FunctionalPage } from '@/store/service-types';
import { ApiError } from '@/core-types/api-error';
import { resetPasswordAndLoginFlow } from '@/store/auth/actions';
import { RootState } from '@/store/root-reducer';
import { getScopeError } from '@/store/scope-error/helpers';
import { AuthScope } from '@/store/auth/types';
import { isScopeLoading } from '@/store/scope-loading/helpers';
import { useNotification } from '@/components/notification/hooks';
import { NotificationType } from '@/components/notification/types';
import { ResetPasswordInterface } from '@/core-types/auth';

interface ResetPasswordPageProps {
  errors: ApiError | null;
  loading: boolean;
  resetPassword: typeof resetPasswordAndLoginFlow;
}

const ResetPasswordPage: FunctionalPage<ResetPasswordPageProps> = ({ errors, loading, resetPassword }) => {
  const pushNotification = useNotification();

  useEffect(() => {
    if (errors) {
      pushNotification(NotificationType.ERROR, errors.message);
    }
  }, [errors]);

  const { query } = useRouter();
  const email = getAsString(query.email);
  const isMigratedUser = getAsNumber(query.isMigratedUser);

  const getValidationRules = ({ getValue }) => ({
    newPassword: [Validator.Required(), Validator.MinLength(8), Validator.MaxLength(16)],
    passwordRepeat: [
      Validator.Required(),
      (value: string) => {
        if (value !== getValue('newPassword')) {
          return 'passwords should be equal!';
        }
      },
    ],
    code: [Validator.Required()],
  });

  const onSubmit = async ({ newPassword, code }: ResetPasswordInterface) => {
    resetPassword({ email, newPassword, code });
  };

  return (
    <Layout hideFooter>
      <Page bg="gray300">
        <Container>
          <Row>
            <Col mdOffset={2} md={8} lgOffset={3} lg={6}>
              <ModalContainerStyled>
                <Form validation={(api) => getValidationRules(api)} onSubmit={onSubmit}>
                  {({ getAllErrors, getAllValues }) => (
                    <Fragment>
                      <Heading as="h1" measure="h5" align="center" p={[15, 25]} fontWeight="sbold">
                        {isMigratedUser == 1
                          ? 'We have updated our security system. Please re-create a password.'
                          : 'Reset Your Password'}
                      </Heading>
                      <Hr color="gray500" />
                      <Box p={[0, 25, 25]}>
                        <Box mb={20}>
                          <FormInputField
                            name="code"
                            label="Your verification code:"
                            measure="md"
                            placeholder="Code"
                            type="text"
                            mb={15}
                            required
                          />
                        </Box>
                        <Box mb={20}>
                          <FormLabel>
                            <Row>
                              <Col col={6}>
                                <Text as="span" measure="sm" mb={8} display="block">
                                  Your new password: *
                                </Text>
                              </Col>
                              <Col col={6}>
                                <Text as="em" align="right" color="gray700" measure="sm" mb={8} display="block">
                                  8 characters min
                                </Text>
                              </Col>
                            </Row>
                            <FormInputPassword type="password" name="newPassword" required />
                          </FormLabel>
                          <FormError name="newPassword" />
                        </Box>
                        <Box mb={20}>
                          <FormLabel>
                            <Row>
                              <Col col={6}>
                                <Text as="span" measure="sm" mb={8} display="block">
                                  Repeat your new password: *
                                </Text>
                              </Col>
                              <Col col={6}>
                                <Text as="em" align="right" color="gray700" measure="sm" mb={8} display="block">
                                  8 characters min
                                </Text>
                              </Col>
                            </Row>
                            <FormInputPassword type="password" name="passwordRepeat" required />
                          </FormLabel>
                          <FormError name="passwordRepeat" />
                        </Box>
                        <Button
                          fullWidth
                          measure="lg"
                          color="secondaryLight"
                          disabled={isFormNotValidated(
                            ['password', 'passwordRepeat'],
                            { ...getAllErrors() },
                            { ...getAllValues() },
                          )}
                          type="submit"
                        >
                          update password
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
  resetPassword: resetPasswordAndLoginFlow,
};

export default connect(mapStateToProps, mapDipatchToProps)(ResetPasswordPage);
