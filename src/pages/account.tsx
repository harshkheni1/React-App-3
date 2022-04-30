import React, { useState, useEffect, useMemo } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Modal,
  Heading,
  Page,
  Container,
  Row,
  Col,
  Box,
  Button,
  FormSelect,
  FormRadioField,
  Text,
  Loading,
  Img,
  Icon,
  Accordion,
  AccordionItem,
  Tooltip,
  styled,
} from '@/ui-kit';
import { Form, FormApiInterface } from 'react-uforms';
import { useRouter } from 'next/router';
import * as queryString from 'query-string';
import moment from 'moment';

import { FunctionalPage } from '@/store/service-types';
import Layout from '../containers/layout';
import { Claim } from '@/components/claim';
import { Plan } from '@/components/plan';

import { Claim as ClaimType, ClaimStatus } from '@/core-types/claim';
import { Plan as PlanType, PlanStatus } from '@/core-types/plan';
import { AccountView, FilterDefaultValue } from '@/core-types/general';
import { User } from '@/core-types/user';

import { RootState } from '@/store/root-reducer';
import { getAsString, nextRedirect } from '../service/helpers';
import { deleteClaim, fetchPlansAndClaims } from '@/store/user/actions';
import { getScopeError } from '@/store/scope-error/helpers';
import { isScopeLoading } from '@/store/scope-loading/helpers';
import { UserScope } from '@/store/user/types';
import { ApiError } from '@/core-types/api-error';
import { useNotification } from '@/components/notification/hooks';
import { NotificationType } from '@/components/notification/types';
import { FormRadioBlockWrapperStyled } from '@/components/ui-kit/components/form/radio/block/block-wrapper.styled';
import NoPlans from '../images/no-plans.png';
import { insertClaim, removeActiveClaim, updateActiveClaim } from '@/store/claim/actions';

interface AccountPageInterface {
  sessionUser: User;
  claims: ClaimType[];
  plans: PlanType[];
  scopeLoading: string[];
  scopeError: Readonly<{ [key: string]: ApiError }>;
}

export const AccountPage: FunctionalPage<AccountPageInterface> = ({
  sessionUser,
  claims,
  plans,
  scopeLoading,
  scopeError,
}) => {
  const query = useRouter().query;
  const queryView = getAsString(query.view);
  const [view, setView] = useState<AccountView>(queryView === AccountView.CLAIM ? AccountView.CLAIM : AccountView.PLAN);

  const pushNotification = useNotification();
  const dispatch = useDispatch();

  const [plansFiltered, filterPlans] = useState<PlanType[]>(plans);
  const [claimsFiltered, filterClaims] = useState<ClaimType[]>(claims);
  const [formAPI, setFormAPI] = useState<FormApiInterface>();

  const [isConfirmDraftModalShown, showConfirmDraftModal] = useState<boolean>(false);
  const [isWhatDoYouNeedToKnowShown, showWhatDoYouNeedToKnowModal] = useState<boolean>(false);
  const [draftClaim, setDraftClaim] = useState<ClaimType>(null);
  const [currentPlan, setCurrentPlan] = useState<PlanType>(null);

  const errors: ApiError | null = getScopeError(scopeError, UserScope);
  const loading = isScopeLoading(scopeLoading, UserScope);
  const [fetchAttempt, setFetchAttempt] = useState<number>(0);

  useEffect(() => {
    if (sessionUser && !sessionUser['custom:UserExtendedInfoId']) {
      pushNotification(
        NotificationType.ERROR,
        'Your user is not onboraded correctly. Please contact support for details',
      );
      return;
    }
    formAPI?.setValue('myPlansClaims', view === AccountView.PLAN ? 'myPlans' : 'myClaims');
  }, [view]);

  useEffect(() => {
    if (!sessionUser || !sessionUser['custom:UserExtendedInfoId']) {
      return;
    }
    if (plans.length === 0 && fetchAttempt < 3) {
      dispatch(fetchPlansAndClaims());
      setFetchAttempt(fetchAttempt + 1);
    } else {
      filterPlans(plans);
      filterClaims(claims);
    }
  }, [sessionUser, plans, claims]);

  useEffect(() => {
    if (errors) {
      pushNotification(NotificationType.ERROR, errors.message);
    }
  }, [errors]);

  const claimsComponent = useMemo(
    () => (
      <Row>
        {/*<Col lg={6}>*/}
        {/*  <Box m={[10, 0]}>*/}
        {/*    <Text measure="xs" letterSpacing={2} uppercase>*/}
        {/*      Your claims in total: {claims.length}*/}
        {/*    </Text>*/}
        {/*  </Box>*/}
        {/*</Col>*/}
        <Col>
          {claimsFiltered.length > 0 ? (
            <Box mt={15}>
              {claimsFiltered.map((claim) => (
                <Claim
                  key={claim.id}
                  claim={claim}
                  onFileClaimHandler={() => {
                    dispatch(updateActiveClaim({ ...claim }));
                    localStorage.setItem('claimId', claim.id.toString());
                  }}
                  onDeleteClaimHandler={() => {
                    dispatch(deleteClaim(claim.id));
                    pushNotification(NotificationType.SUCCESS, `Draft claim ${claim.id} is deleted`);
                    formAPI?.setValue('plansFilter', FilterDefaultValue);
                  }}
                />
              ))}
            </Box>
          ) : (
            !loading && (
              <Box mt={70} align="center">
                <Img src={NoPlans} alt="No claims have been found" height={96} />
                <Text measure="sm">No claims have been found</Text>
              </Box>
            )
          )}
        </Col>
      </Row>
    ),
    [claimsFiltered, loading],
  );

  const plansComponent = useMemo(
    () => (
      <Row>
        {/*<Col lg={6}>*/}
        {/*  <Box m={[10, 0]}>*/}
        {/*    <Text measure="xs" letterSpacing={2} uppercase>*/}
        {/*      Your plans in total: {plans.length}*/}
        {/*    </Text>*/}
        {/*  </Box>*/}
        {/*</Col>*/}
        <Col>
          {plansFiltered.length > 0 ? (
            <Box mt={15}>
              {plansFiltered.map((plan) => (
                <Plan
                  key={`plan-${plan.id}`}
                  plan={{ ...plan }}
                  claims={claims}
                  onVeiwClaimHandler={() => {
                    onViewChange(AccountView.CLAIM);
                  }}
                  onFileClaimHandler={() => {
                    const draftClaims =
                      claims?.filter(
                        (claim: ClaimType) =>
                          ((claim.plan && claim.plan.id === plan.id) || claim.warrantyId === plan.id) &&
                          [ClaimStatus.INPROCESS].includes(claim.status),
                      ) ?? [];
                    if (draftClaims.length > 0) {
                      setDraftClaim(draftClaims[0]);
                      setCurrentPlan(plan);
                      showConfirmDraftModal(true);
                    } else {
                      setCurrentPlan(plan);
                      showWhatDoYouNeedToKnowModal(true);
                    }
                  }}
                />
              ))}
            </Box>
          ) : (
            !loading && (
              <Box mt={70} align="center">
                <Img src={NoPlans} alt="No plans have been found" height={96} />
                <Text measure="sm">No plans have been found</Text>
              </Box>
            )
          )}
        </Col>
      </Row>
    ),
    [plansFiltered, claims, loading],
  );

  const planOptions = useMemo(
    () =>
      view === AccountView.PLAN
        ? [
            { value: FilterDefaultValue, label: 'All plans' },
            ...Object.values(PlanStatus).map((key) => ({ label: key, value: key })),
          ]
        : [
            { value: FilterDefaultValue, label: 'All claims' },
            ...Object.values(ClaimStatus)
              .filter((status) => status !== ClaimStatus.NOT_SUBMITTED)
              .map((key) => ({
                label: key,
                value: key,
              })),
          ],
    [view],
  );

  const applyFilter = (status: string) => {
    switch (status) {
      case FilterDefaultValue:
        return view === AccountView.PLAN ? filterPlans(plans) : filterClaims(claims);
      default:
        return view === AccountView.PLAN
          ? filterPlans(plans.filter((plan: PlanType) => plan.planStatus === status))
          : filterClaims(claims.filter((claim: ClaimType) => claim.status === status));
    }
  };

  const onFilterChange = ({ value: status }) => applyFilter(status);

  const onViewChange = (viewProp: AccountView) => {
    setView(viewProp);
    applyFilter(FilterDefaultValue);
    const newQuery = {
      ...query,
      view: viewProp,
    };
    nextRedirect(null, `/account?${queryString.stringify(newQuery)}`, `/account?${queryString.stringify(newQuery)}`, {
      shallow: true,
    });
  };

  const continueDraftClaim = (claim: ClaimType) => {
    dispatch(updateActiveClaim({ ...claim }));
    localStorage.setItem('claimId', claim.id.toString());
    nextRedirect(null, `/file-claim?claimId=${claim.id}&step=2`);
  };

  const deleteDraftAndFileNewClaim = (plan: PlanType, claim: ClaimType) => {
    dispatch(deleteClaim(claim.id));
    pushNotification(NotificationType.SUCCESS, `Draft claim ${claim.id} is deleted`);
    formAPI?.setValue('plansFilter', FilterDefaultValue);

    dispatch(removeActiveClaim());
    dispatch(updateActiveClaim({ plan, status: ClaimStatus.NOT_SUBMITTED }));
    dispatch(
      insertClaim({
        warrentyId: plan.id,
        claimdate: moment(new Date()).format('YYYY-MM-DD'),
        damagedate: moment(new Date()).format('YYYY-MM-DD'),
        allowSMS: true,
      }),
    );
    nextRedirect(null, '/file-claim?step=2');
  };

  const continueFileANewClaim = (plan: PlanType) => {
    dispatch(removeActiveClaim());
    dispatch(updateActiveClaim({ plan, status: ClaimStatus.NOT_SUBMITTED }));
    dispatch(
      insertClaim({
        warrentyId: plan.id,
        claimdate: moment(new Date()).format('YYYY-MM-DD'),
        damagedate: moment(new Date()).format('YYYY-MM-DD'),
        allowSMS: true,
      }),
    );
    nextRedirect(null, '/file-claim?step=2');
  };

  const isClaimingUnavailable =
    Boolean(sessionUser && !sessionUser['custom:UserExtendedInfoId']) ||
    !plans.some((plan) => plan.planStatus === PlanStatus.ACTIVE);

  return (
    <Layout>
      <Page bg="gray300">
        {loading && <Loading full={false} color="gray800" />}
        <Box bg="gray300">
          <Container>
            <Row>
              <Col md={8} lg={9}>
                <Box>
                  <Form
                    onSubmit={null}
                    defaultValues={{
                      plansFilter: FilterDefaultValue,
                      myPlansClaims: view === AccountView.PLAN ? 'myPlans' : 'myClaims',
                    }}
                  >
                    {(api) => (
                      <Row>
                        <Col sm={6} md={7} lg={6}>
                          {setFormAPI(api)}
                          <FormRadioBlockWrapperStyled mb={15}>
                            <FormRadioField
                              block
                              label="My Plans"
                              name="myPlansClaims"
                              value="myPlans"
                              onChange={() => {
                                api.setValue('plansFilter', FilterDefaultValue);
                                onViewChange(AccountView.PLAN);
                              }}
                            />
                            <FormRadioField
                              block
                              label="My Claims"
                              name="myPlansClaims"
                              value="myClaims"
                              onChange={() => {
                                api.setValue('plansFilter', FilterDefaultValue);
                                onViewChange(AccountView.CLAIM);
                              }}
                            />
                          </FormRadioBlockWrapperStyled>
                        </Col>
                        <Col sm={6} md={5} lg={4}>
                          <Box mb={15}>
                            <FormSelect
                              name="plansFilter"
                              options={planOptions}
                              placeholder="Enter"
                              onChange={(e: { value: string; label: string }) => {
                                onFilterChange(e);
                              }}
                            />
                          </Box>
                        </Col>
                      </Row>
                    )}
                  </Form>
                </Box>
              </Col>
              {view === AccountView.CLAIM && (
                <Col md={4} lg={3}>
                  <Button
                    fullWidth
                    onClick={() => {
                      if (isClaimingUnavailable) {
                        pushNotification(
                          NotificationType.ERROR,
                          "Sorry you can't file a claim. Please contact support.",
                        );
                        return;
                      }

                      dispatch(removeActiveClaim());
                      dispatch(updateActiveClaim({ status: ClaimStatus.NOT_SUBMITTED }));

                      nextRedirect(null, '/file-claim');
                    }}
                    uppercase={false}
                    as="button"
                    color="primary"
                    disabled={isClaimingUnavailable}
                  >
                    + File a Claim
                  </Button>
                </Col>
              )}
              {view === AccountView.PLAN && (
                <Col md={4} lg={3}>
                  <Button
                    fullWidth
                    uppercase={false}
                    onClick={() => nextRedirect(null, '/find-plan')}
                    as="a"
                    color="primary"
                  >
                    Find My Plan
                  </Button>
                </Col>
              )}
            </Row>
            {view === AccountView.CLAIM && claimsComponent}
            {view === AccountView.PLAN && plansComponent}
          </Container>
        </Box>
        {isConfirmDraftModalShown && (
          <Modal
            isOpen={isConfirmDraftModalShown}
            onClose={() => {
              showConfirmDraftModal(false);
            }}
            measure="md"
          >
            <Modal.Header>
              <Heading as="h5">CONTINUE DRAFT CLAIM</Heading>
            </Modal.Header>
            <Modal.Body>
              <Box m={[15, 15, 0]}>
                <Heading as="h5" color="primaryLight">
                  You already have &quot;Draft Claim&quot; for this plan. Do you want to continue?
                </Heading>
              </Box>
            </Modal.Body>
            <Modal.Footer>
              <Box m={[15, 15, 0]}>
                <Row>
                  <Col>
                    <Button
                      mb={20}
                      uppercase={false}
                      measure="sm"
                      fullWidth
                      onClick={() => {
                        continueDraftClaim(draftClaim);
                        showConfirmDraftModal(false);
                      }}
                      color="primary"
                    >
                      Continue Draft Claim
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="outlined"
                      color="gray800"
                      uppercase={false}
                      measure="sm"
                      fullWidth
                      onClick={() => {
                        deleteDraftAndFileNewClaim(currentPlan, draftClaim);
                        showConfirmDraftModal(false);
                      }}
                    >
                      Delete Draft & File A New Claim
                    </Button>
                  </Col>
                </Row>
              </Box>
            </Modal.Footer>
          </Modal>
        )}
        {isWhatDoYouNeedToKnowShown && (
          <Modal
            isOpen={isWhatDoYouNeedToKnowShown}
            onClose={() => {
              showWhatDoYouNeedToKnowModal(false);
            }}
            measure="xl"
          >
            <Modal.Header></Modal.Header>
            <Modal.Body>
              <Box m={[15, 15, 0]}>
                <Heading as="h5" color="black">
                  Filing a Claim
                </Heading>
                <Accordion>
                  <AccordionItem title={'What information will I need to file a claim online?'}>
                    <Text as="div" measure="sm">
                      You need the following information to file your claim:
                      <ul>
                        <li>Name/Phone of Purchaser</li>
                        <li>
                          Damage Type, Damage Cause, Specific Damage, Damage Location, and an Explanation of the Damage
                        </li>
                        <li>When you noticed the damage</li>
                        <li>
                          Be prepared to submit an itemized invoice (especially if you’re manually adding an item to
                          your contract).
                        </li>
                        <li>Be prepared to upload photos of the damage.</li>
                      </ul>
                    </Text>
                  </AccordionItem>
                  <AccordionItem title={'When do we need you to upload photos?'}>
                    <Text as="div" measure="sm">
                      Photos of the furniture tag displaying the model and serial number help us order the correct
                      parts/replacements. A close-up photo of the damage and a photo with the entire piece of furniture
                      help us confirm how to fix your damaged furniture.
                    </Text>
                  </AccordionItem>
                  <AccordionItem title={'When do we need you to upload an invoice?'}>
                    <Text as="div" measure="sm">
                      If you’re adding an item that’s missing from your contract, a photo of the sales invoice with that
                      item and the plan is necessary.
                    </Text>
                  </AccordionItem>
                  <AccordionItem title={'Why would I click the Add Missing Item button?'}>
                    <Text as="div" measure="sm">
                      If an item isn’t listed under your contract that should be, click Add Missing item to manually add
                      the item. Please note: We also require you to prove that you purchased the item by providing an
                      itemized copy of your invoice from the retailer. Do this in the Upload required documents and
                      photos section of the claim.
                    </Text>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ float: 'right' }}
                mr={20}
                uppercase={false}
                measure="sm"
                onClick={() => {
                  showWhatDoYouNeedToKnowModal(false);
                  continueFileANewClaim(currentPlan);
                }}
                color="primary"
              >
                Continue File A Claim <Icon name="arrow-right" measure={14} color="white" />
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Page>
    </Layout>
  );
};

AccountPage.getInitialProps = async ({ store, res }) => {
  const {
    app: { isAuthorized },
  } = store.getState();

  if (!isAuthorized) {
    return nextRedirect(res, '/');
  }
};
const mapStateToProps = ({ scopeError, scopeLoading, user, app: { session } }: RootState) => ({
  sessionUser: session?.user,
  claims: user.claims,
  plans: user.plans,
  scopeError,
  scopeLoading,
});

export default connect(mapStateToProps, null)(AccountPage);
