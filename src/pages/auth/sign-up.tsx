import React, { Fragment, useState, useEffect } from 'react';
import Layout from '../../containers/layout';
import { Form, FormApiInterface } from 'react-uforms';
import { connect, useDispatch } from 'react-redux';

import { StepsWizard } from '@/components/steps-wizard/steps-wizard';
import { useNotification } from '@/components/notification/hooks';
import { NotificationType } from '@/components/notification/types';
import { Page, Loading } from '@/ui-kit';
import { StepInterface } from '@/components/steps-wizard/types';
import { SectionSearchPlan, SectionSelectPlan, SectionAddDetails } from '@/components/steps-wizard/sections/account';
import {
  UserAccount,
  CreateAccountSteps,
  CreateAccountStepsTitle,
} from '@/components/steps-wizard/sections/account/types';
import { AuthScope } from '@/store/auth/types';
import { ApiError } from '../../types/api-error';
import { RootState } from '@/store/root-reducer';
import { Customer, SearchCustomerDto, VerifyCustomerDto } from '@/core-types/customer';
import { FunctionalPage } from '@/store/service-types';

import { registerFlow } from '@/store/auth/actions';
import { linkNewPlans, searchCustomer } from '@/store/customer/actions';
import { cleanUpScopeError } from '@/store/scope-error/actions';

import { nextRedirect, getAsArray } from '../../service/helpers';
import { getScopeError } from '@/store/scope-error/helpers';
import { isScopeLoading } from '@/store/scope-loading/helpers';

const accountValidationRules = (api: FormApiInterface) => ({
  searchPlan: SectionSearchPlan.getValidationRules(api),
  selectPlan: SectionSelectPlan.getValidationRules(api),
  addDetails: SectionAddDetails.getValidationRules(api),
});

const accountDefaultValues = (account) => ({
  searchPlan: SectionSearchPlan.defaultValues(),
  selectPlan: SectionSelectPlan.defaultValues(),
  addDetails: SectionAddDetails.defaultValues(account),
});

const accountSubmit = (values) => {
  return {
    ...SectionSearchPlan.accountProfileSubmit(values),
    ...SectionSelectPlan.accountProfileSubmit(values),
    ...SectionAddDetails.accountProfileSubmit(values),
  };
};

interface SignUpPageProps {
  errors: ApiError | null;
  loading: boolean;
  customers: Customer[];
}

const SignUpPage: FunctionalPage<SignUpPageProps> = ({ errors, loading, customers }) => {
  const pushNotification = useNotification();
  const dispatch = useDispatch();
  const [fillRequestParams, setFilledRequestParams] = useState();
  const [fillCustomerParams, setFilledCustomerParams] = useState([]);

  useEffect(() => {
    if (errors) {
      pushNotification(NotificationType.ERROR, errors.message);
    }
    setFilledRequestParams(JSON.parse(localStorage.getItem('userAccount')));
    setFilledCustomerParams(JSON.parse(localStorage.getItem('state')));
  }, [errors]);

  const [userAccount, setUserAccount] = useState<UserAccount | null>(null);
  const [searchPlanRefreshData, setSearchPlanRefreshData] = useState();
  const steps = (api: FormApiInterface): StepInterface[] => [
    {
      name: CreateAccountSteps.SEARCH_PLAN,
      component: <SectionSearchPlan />,
    },
    {
      name: CreateAccountSteps.SELECT_PLAN,
      component: (
        <SectionSelectPlan
          customers={customers.length == 0 ? fillCustomerParams : customers}
          userAccount={
            api.getValue('searchPlan').searchWith != 'email' ? api.getValue('searchPlan') : fillRequestParams
          }
          searchCustomer={(dto: SearchCustomerDto) => dispatch(searchCustomer(dto))}
        />
      ),
    },
    {
      name: CreateAccountSteps.ADD_DETAILS,
      component: (
        <SectionAddDetails
          userAccount={
            api.getValue('searchPlan').searchWith != 'email' ? api.getValue('searchPlan') : fillRequestParams
          }
        />
      ),
      nextButtonText: 'Submit',
    },
  ];

  return (
    <Layout>
      <Page bg="gray300" pt={0}>
        <Form
          validation={(api) => accountValidationRules(api)}
          defaultValues={accountDefaultValues(userAccount)}
          onError={async (errors, api) => {
            const validationErrors = Object.entries(errors);
            if (validationErrors.length > 0) {
              const [field] = validationErrors[0];
              const stepName = CreateAccountStepsTitle.find((item) => item.value.includes(field))?.label;
              if (stepName) {
                const stepId = api.getGroups().findIndex((group) => group.name === stepName) + 1;
                await nextRedirect(null, `/auth/sign-up?step=${stepId}`, `/auth/sign-up?step=${stepId}`, {
                  shallow: true,
                });
                return api.setGroupActive(stepName);
              }
            }
          }}
          onSubmit={async (values) => {
            dispatch(cleanUpScopeError());
            const { email, password, phone, name, surname, plan: plans, searchWith, zip, search } = accountSubmit(
              values,
            );

            const customerIds = getAsArray<number>(plans)
              .map((planString) => +planString)
              .join(',');

            if (email && password && phone && name) {
              const dtos: VerifyCustomerDto[] = plans?.map((customerId: string) => {
                const customer: Customer = customers.find((customer) => customer.id === customerId);

                return {
                  search_type: searchWith === 'invoice' ? 'search_plan_verify_3' : 'search_plan_verify_1_2',
                  email,
                  phone_number: customer.phone ?? phone,
                  zip_code: customer.zip ?? zip,
                  ...(searchWith !== 'invoice' && { name_first: customer.firstName ?? name }),
                  ...(searchWith !== 'invoice' && { name_last: customer.lastName ?? surname }),
                  ...(searchWith === 'invoice' && { invoice_number: search }),
                };
              });

              dispatch(linkNewPlans(dtos));

              dispatch(registerFlow({ email, password, phone, name: `${name} ${surname}`, customerIds }));
            }
          }}
          onKeyPress={(event) => {
            if (event.key === 'Enter' && !(event.target instanceof HTMLTextAreaElement)) {
              event.preventDefault();
            }
          }}
          onChange={(api, field) => api.setTouched(field)}
        >
          {(api) => (
            <Fragment>
              <StepsWizard
                title="Create an Account"
                steps={steps(api)}
                onClick={(event) => api.setTouched(event?.target?.name)}
                backButton={{
                  onClick: async (previousStep) => {
                    if (previousStep) {
                      const stepId = api.getGroups().findIndex((group) => group.name === previousStep) + 1;
                      await nextRedirect(null, `/auth/sign-up?step=${stepId}`, `/auth/sign-up?step=${stepId}`, {
                        shallow: true,
                      });
                      dispatch(cleanUpScopeError());
                      return api.setGroupActive(previousStep);
                    } else {
                      await nextRedirect(null, '/');
                    }
                  },
                }}
                nextButton={{
                  isDisabled: (currentStep) => api.getGroup(currentStep)?.hasErrors,
                  onClick: async (nextStepName) => {
                    const account = accountSubmit(api.getAllValues());
                    setUserAccount(account);
                    localStorage.setItem('userAccount', JSON.stringify(api.getValue('searchPlan')));
                    setFilledRequestParams(JSON.parse(localStorage.getItem('userAccount')));
                    const stepId = api.getGroups().findIndex((group) => group.name === nextStepName) + 1;
                    await nextRedirect(null, `/auth/sign-up?step=${stepId}`, `/auth/sign-up?step=${stepId}`, {
                      shallow: true,
                    });
                    return api.setGroupActive(nextStepName);
                  },
                }}
              />
              {loading && <Loading full={true} />}
            </Fragment>
          )}
        </Form>
      </Page>
    </Layout>
  );
};

const mapStateToProps = ({ scopeError, scopeLoading, customerSearch }: RootState) => ({
  errors: getScopeError(scopeError, AuthScope),
  loading: isScopeLoading(scopeLoading, AuthScope),
  customers: customerSearch.customers,
});

SignUpPage.getInitialProps = async ({ store, res }) => {
  const {
    app: { isAuthorized },
  } = store.getState();

  if (isAuthorized) {
    return nextRedirect(res, '/account');
  }
};

export default connect(mapStateToProps, null)(SignUpPage);
