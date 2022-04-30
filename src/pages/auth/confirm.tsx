import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { Box, Col, Container, Heading, Page, Row, Hr, Button, Text, FormInputField, Loading } from '@/ui-kit';
import { Form, Validator } from 'react-uforms';
import { ModalContainerStyled } from '@/components/modal-content.styled';
import Layout from '../../containers/layout';
import { isFormNotValidated, getAsString } from '../../service/helpers';
import { ApiError } from '@/core-types/api-error';
import { useNotification } from '@/components/notification/hooks';
import { NotificationType } from '@/components/notification/types';
import { getScopeError } from '@/store/scope-error/helpers';
import { AuthScope } from '@/store/auth/types';
import { RootState } from '@/store/root-reducer';
import { isScopeLoading } from '@/store/scope-loading/helpers';
import { FunctionalPage } from '@/store/service-types';
import { confirmUserFlow, resendConfiramtionCodeFlow } from '@/store/auth/actions';
import { cleanUpScopeError } from '@/store/scope-error/actions';
import { useRouter } from 'next/router';
import { ConfirmUserInterface } from '@/core-types/auth';

interface ConfirmRegistartionProps {
  errors: ApiError | null;
  loading: boolean;
  confirmUser: typeof confirmUserFlow;
  resendCode: typeof resendConfiramtionCodeFlow;
}

const ConfirmRegistrationPage: FunctionalPage<ConfirmRegistartionProps> = ({
  errors,
  loading,
  confirmUser,
  resendCode,
}) => {
  const pushNotification = useNotification();
  useEffect(() => {
    if (errors) {
      pushNotification(NotificationType.ERROR, errors.message);
    }
  }, [errors]);

  const { query } = useRouter();
  const email = getAsString(query.email);

  const getValidationRules = () => ({
    code: [Validator.Required()],
  });

  const onSubmit = async ({ code }: ConfirmUserInterface) => {
    confirmUser({ email, code });
  };

  const sendCodeBlock = email ? (
    <ModalContainerStyled>
      <Form validation={getValidationRules} onSubmit={onSubmit}>
        {({ getAllErrors, getAllValues, submit }) => (
          <Fragment>
            <Heading as="h1" measure="h4" align="center" p={[15, 25]} fontWeight="medium">
              Confirm registration
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
                  onKeyPress={(event) => {
                    if (event.key == 'Enter') {
                      submit();
                    }
                  }}
                />
              </Box>
              <Row>
                <Col lg={9}>
                  <Button
                    fullWidth
                    color="gray700"
                    disabled={isFormNotValidated(['code'], { ...getAllErrors() }, { ...getAllValues() })}
                    type="submit"
                  >
                    confirm
                  </Button>
                </Col>
                <Col lg={3}>
                  <Button
                    fullWidth
                    color="gray700"
                    type="button"
                    onClick={() => {
                      resendCode({ email });
                    }}
                  >
                    resend
                  </Button>
                </Col>
              </Row>

              <Hr color="gray500" m={[20, 20]} />
              <Box p={[16]} align="center">
                <Text as="span" color="gray700">
                  Check your mail box for {email}
                </Text>
              </Box>
            </Box>
          </Fragment>
        )}
      </Form>
      {loading && <Loading full={true} />}
    </ModalContainerStyled>
  ) : (
    <Text> No email provided </Text>
  );

  return (
    <Layout hideFooter>
      <Page bg="gray300">
        <Container>
          <Row>
            <Col mdOffset={2} md={8} lgOffset={3} lg={6}>
              {sendCodeBlock}
            </Col>
          </Row>
        </Container>
      </Page>
    </Layout>
  );
};

const mapDipatchToProps = {
  confirmUser: confirmUserFlow,
  resendCode: resendConfiramtionCodeFlow,
  cleanUpScopeError,
};

const mapStateToProps = ({ scopeError, scopeLoading }: RootState) => ({
  errors: getScopeError(scopeError, AuthScope),
  loading: isScopeLoading(scopeLoading, AuthScope),
});

export default connect(mapStateToProps, mapDipatchToProps)(ConfirmRegistrationPage);
