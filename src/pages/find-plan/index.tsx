import React, { Fragment, useEffect, useState } from 'react';
import Layout from '../../containers/layout';
import { Form, FormApiInterface } from 'react-uforms';
import { connect, useDispatch } from 'react-redux';

import { StepsWizard } from '@/components/steps-wizard/steps-wizard';
import { useNotification } from '@/components/notification/hooks';
import { NotificationType } from '@/components/notification/types';
import { Page, Loading } from '@/ui-kit';
import { StepInterface } from '@/components/steps-wizard/types';
import { SectionSearchPlan, SectionSelectPlan } from '@/components/steps-wizard/sections/account';
import { CreateAccountSteps, CreateAccountStepsTitle } from '@/components/steps-wizard/sections/account/types';
import { nextRedirect } from '../../service/helpers';
import { FunctionalPage } from '@/store/service-types';
import { linkNewPlans, searchCustomer } from '@/store/customer/actions';
import { cleanUpScopeError } from '@/store/scope-error/actions';

import { RootState } from '@/store/root-reducer';
import { Customer, SearchCustomerDto } from '@/core-types/customer';
import { User } from '@/core-types/user';
import { VerifyCustomerDto } from '@/core-types/customer';
import { getScopeError } from '@/store/scope-error/helpers';
import { AuthScope } from '@/store/auth/types';
import { ApiError } from '../../types/api-error';
import { isScopeLoading } from '@/store/scope-loading/helpers';
import { fetchPlansAndClaims } from '@/store/user/actions';

const linkPlansSearchValidationRules = (api: FormApiInterface) => ({
  searchPlan: SectionSearchPlan.getValidationRules(api),
  // selectPlan: SectionSelectPlan.getValidationRules(api),
});

const linkPlansSelectValidationRule = (api: FormApiInterface) => ({
  // searchPlan: SectionSearchPlan.getValidationRules(api),
  selectPlan: SectionSelectPlan.getValidationRules(api),
});
const linkPlansDefaultValues = () => ({
  searchPlan: SectionSearchPlan.defaultValues(),
  selectPlan: SectionSelectPlan.defaultValues(),
});

const linkPlansSubmit = (values) => {
  return {
    ...SectionSearchPlan.accountProfileSubmit(values),
    ...SectionSelectPlan.accountProfileSubmit(values),
  };
};

interface FindPlanProps {
  user: User;
  errors: ApiError | null;
  loading: boolean;
  customers: Customer[];
}

const FindPlanPage: FunctionalPage<FindPlanProps> = ({ user, errors, loading, customers }) => {
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

  const steps = (api: FormApiInterface): StepInterface[] => [
    {
      name: CreateAccountSteps.SEARCH_PLAN,
      component: <SectionSearchPlan />,
    },
    {
      name: CreateAccountSteps.SELECT_PLAN,
      component: (
        <SectionSelectPlan
          // customers={customers}
          // userAccount={{ ...api.getValue('searchPlan') }}
          customers={customers.length == 0 ? fillCustomerParams : customers}
          userAccount={
            api.getValue('searchPlan').searchWith != 'email' ? api.getValue('searchPlan') : fillRequestParams
          }
          searchCustomer={(dto: SearchCustomerDto) => dispatch(searchCustomer(dto))}
        />
      ),
      nextButtonText: 'Submit',
    },
  ];

  return (
    <Layout>
      <Page bg="gray300" pt={0}>
        <Form
          validation={(api) => {
            return api.getGroup('Select your Plan')?.isActive
              ? linkPlansSelectValidationRule(api)
              : linkPlansSearchValidationRules(api);
          }}
          defaultValues={linkPlansDefaultValues()}
          onError={async (errors, api) => {
            const validationErrors = Object.entries(errors);
            if (validationErrors.length > 0) {
              const [field] = validationErrors[0];
              const stepName = CreateAccountStepsTitle.find((item) => item.value.includes(field))?.label;
              if (stepName) {
                const stepId = api.getGroups().findIndex((group) => group.name === stepName) + 1;
                await nextRedirect(null, `/find-plan?step=${stepId}`, `/find-plan?step=${stepId}`, {
                  shallow: true,
                });
                return api.setGroupActive(stepName);
              }
            }
          }}
          onSubmit={async (values) => {
            dispatch(cleanUpScopeError());
            const { searchWith, plan: plans, name, surname, zip, search } = linkPlansSubmit(values);
            const dtos: VerifyCustomerDto[] = plans?.map((customerId: string) => {
              const customer: Customer = customers.find((customer) => customer.id === customerId);
              return {
                search_type: searchWith === 'invoice' ? 'search_plan_verify_3' : 'search_plan_verify_1_2',
                email: user?.email,
                phone_number: customer?.phone,
                zip_code: customer.zip ?? zip,
                ...(searchWith !== 'invoice' && { name_first: customer.firstName ?? name }),
                ...(searchWith !== 'invoice' && { name_last: customer.lastName ?? surname }),
                ...(searchWith === 'invoice' && { invoice_number: search }),
              };
            });

            dispatch(linkNewPlans(dtos));

            dispatch(fetchPlansAndClaims());
            nextRedirect(null, '/account?view=plan');
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
                title="Find Your Plan"
                steps={steps(api)}
                onClick={(event) => api.setTouched(event?.target?.name)}
                backButton={{
                  onClick: async (previousStep) => {
                    if (previousStep) {
                      const stepId = api.getGroups().findIndex((group) => group.name === previousStep) + 1;
                      await nextRedirect(null, `/find-plan?step=${stepId}`, `/find-plan?step=${stepId}`, {
                        shallow: true,
                      });
                      dispatch(cleanUpScopeError());
                      return api.setGroupActive(previousStep);
                    } else {
                      await nextRedirect(null, '/account');
                    }
                  },
                }}
                nextButton={{
                  isDisabled: (currentStep) => api.getGroup(currentStep)?.hasErrors,
                  onClick: async (nextStepName) => {
                    localStorage.setItem('userAccount', JSON.stringify(api.getValue('searchPlan')));
                    setFilledRequestParams(JSON.parse(localStorage.getItem('userAccount')));
                    const stepId = api.getGroups().findIndex((group) => group.name === nextStepName) + 1;
                    await nextRedirect(null, `/find-plan?step=${stepId}`, `/find-plan?step=${stepId}`, {
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

const mapStateToProps = ({ app: { session }, scopeError, scopeLoading, customerSearch }: RootState) => {
  const { user } = session ?? {};

  return {
    user,
    errors: getScopeError(scopeError, AuthScope),
    loading: isScopeLoading(scopeLoading, AuthScope),
    customers: customerSearch.customers ?? [],
  };
};
FindPlanPage.getInitialProps = async ({ store, res }) => {
  const {
    app: { isAuthorized },
  } = store.getState();
  if (!isAuthorized) {
    return nextRedirect(res, '/');
  }
};

export default connect(mapStateToProps, null)(FindPlanPage);
