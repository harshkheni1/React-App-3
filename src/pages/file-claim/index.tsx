import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Layout from '../../containers/layout';
import { Form, FormApiInterface } from 'react-uforms';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Modal, Heading, Button, Box, Row, Col } from '@/ui-kit';
import moment from 'moment';
import * as queryString from 'query-string';

import { StepsWizard } from '@/components/steps-wizard/steps-wizard';
import { useNotification } from '@/components/notification/hooks';
import { NotificationType } from '@/components/notification/types';
import { deleteClaim } from '@/store/user/actions';
import { Page, Loading } from '@/ui-kit';
import { StepInterface } from '@/components/steps-wizard/types';
import {
  SectionAddItemDetails,
  SectionAddClaimItems,
  SectionSelectPlan,
  SectionAddDamageDetails,
  SectionReviewClaimDetails,
} from '@/components/steps-wizard/sections/claim';
import { FileClaimSteps, FileClaimStepsTitle } from '@/components/steps-wizard/sections/claim/types';
import { getAsNumber, nextRedirect } from '../../service/helpers';
import { Claim, ClaimStatus } from '@/core-types/claim';
import { ApiError } from '@/core-types/api-error';
import { FunctionalPage } from '@/store/service-types';
import { RootState } from '@/store/root-reducer';
import { fetchPlansAndClaims, fetchClaimDetailsData } from '@/store/user/actions';
import {
  insertClaim,
  insertClaimItem,
  insertClaimItemDamage,
  submitClaim,
  updateActiveClaim,
  removeActiveClaim,
  insertWarrantyItem,
  deleteClaimItem,
} from '@/store/claim/actions';

import { getScopeError } from '@/store/scope-error/helpers';
import { isScopeLoading } from '@/store/scope-loading/helpers';
import { ClaimsOptionsInterface, UserScope } from '@/store/user/types';
import { Plan, PlanStatus } from '@/core-types/plan';
import { FileClaimScope } from '@/store/claim/types';
import { InsertWarrantyItemDto, WarrantyItem } from '@/core-types/warranty-item';
import AddWarrantyItemModal from '@/components/steps-wizard/sections/claim/helpers/add-warranty-item-modal';

const claimSubmit = async (values) => {
  const formClaim = {
    ...SectionSelectPlan.claimItemSubmit(values),
    ...SectionAddClaimItems.claimItemSubmit(values),
    ...SectionAddItemDetails.claimItemSubmit(values),
    ...SectionAddDamageDetails.claimItemSubmit(values),
    ...SectionReviewClaimDetails.claimItemSubmit(values),
  };

  return formClaim;
};
export interface FileClaimPageProps {
  plans: Plan[];
  claims: Claim[];
  scopeLoading: string[];
  scopeError: Readonly<{ [key: string]: ApiError }>;
  claimOptions: ClaimsOptionsInterface;
  activeClaim: Partial<Claim>;
  preventSubmitClaim: Record<string, unknown>;
  errorSteps: Record<string, unknown>;
}

const FileClaimPage: FunctionalPage<FileClaimPageProps> = ({
  plans,
  claims,
  scopeLoading,
  scopeError,
  claimOptions,
  activeClaim,
  preventSubmitClaim,
  errorSteps,
}) => {
  const { query } = useRouter();
  const claimId = getAsNumber(query.claimId);

  const pushNotification = useNotification();
  const dispatch = useDispatch();

  const {
    claimItemTypes,
    colors,
    materialTypes,
    manufacturers,
    howDidOccur,
    actionsTaken,
    specificDamages,
    specificLocations,
    damageTypes,
  } = claimOptions;
  const allOptions = [
    claimItemTypes,
    colors,
    materialTypes,
    manufacturers,
    howDidOccur,
    actionsTaken,
    specificDamages,
    specificLocations,
    damageTypes,
  ];
  const errors: ApiError | null = getScopeError(scopeError, UserScope) || getScopeError(scopeError, FileClaimScope);
  const loading = isScopeLoading(scopeLoading, UserScope) || isScopeLoading(scopeLoading, FileClaimScope);

  const [userInfoFetchAttempt, setUserInfoFetchAttempt] = useState<number>(0);
  const [claimOptionsFetchAttempt, setClaimOptionsFetchAttempt] = useState<number>(0);
  const [isAddItemModalShown, showAddItemModal] = useState<boolean>(false);
  const [isClaimSubmitModalShown, showClaimSubmitModal] = useState<boolean>(false);
  const [formAPI, setFormAPI] = useState<FormApiInterface>(null);

  const [isConfirmDraftModalShown, showConfirmDraftModal] = useState<boolean>(false);
  const [draftClaim, setDraftClaim] = useState<Claim>(null);
  const [currentPlanId, setCurrentPlanId] = useState<any>(null);

  useEffect(() => {
    if (plans.length === 0 && userInfoFetchAttempt < 3) {
      dispatch(fetchPlansAndClaims());
      setUserInfoFetchAttempt(userInfoFetchAttempt + 1);
    }
  }, [plans, userInfoFetchAttempt]);

  useEffect(() => {
    if (!activeClaim && claimId) {
      const resumedClaim = claims.find((claim) => claim.id === claimId);
      if (resumedClaim) {
        dispatch(updateActiveClaim(resumedClaim));
      }
    }

    if (activeClaim && !claimId) {
      nextRedirect(
        null,
        `/file-claim?${queryString.stringify({ ...query, claimId: activeClaim.id })}`,
        `/file-claim?${queryString.stringify({ ...query, claimId: activeClaim.id })}`,
        {
          shallow: true,
        },
      );
    }

    if (!activeClaim && !claimId) {
      dispatch(updateActiveClaim({ status: ClaimStatus.NOT_SUBMITTED }));
    }
  }, [claims, activeClaim, claimId]);

  useEffect(() => {
    if (allOptions.some((option) => !option || option.length === 0) && claimOptionsFetchAttempt < 3) {
      dispatch(fetchClaimDetailsData());
      setClaimOptionsFetchAttempt(claimOptionsFetchAttempt + 1);
    }
  }, [allOptions, claimOptionsFetchAttempt]);

  useEffect(() => {
    if (errors) {
      pushNotification(NotificationType.ERROR, errors.message);
    }
  }, [errors]);

  useEffect(() => {
    if (errorSteps && errorSteps[claimId] && Object.keys(errorSteps[claimId]).length > 0 && formAPI) {
      let stepId = '';
      Object.keys(errorSteps[claimId]).map((step) => {
        stepId = step;
      });
      const newQuery = {
        ...query,
        step: stepId,
      };
      nextRedirect(
        null,
        `/file-claim?${queryString.stringify(newQuery)}`,
        `/file-claim?${queryString.stringify(newQuery)}`,
        {
          shallow: true,
        },
      );
      formAPI?.setGroupActive(FileClaimStepsTitle[parseInt(stepId) - 1].label);
    }
  }, [errorSteps]);

  const deleteClaimItemHandler = useCallback((id: number | string) => dispatch(deleteClaimItem(id)), [dispatch]);

  const steps = (api: FormApiInterface): StepInterface[] => {
    setFormAPI(api);
    return [
      {
        name: FileClaimSteps.SELECT_PLAN,
        component: <SectionSelectPlan plans={plans.filter((plan: Plan) => plan.planStatus === PlanStatus.ACTIVE)} />,
      },
      {
        name: FileClaimSteps.ADD_CLAIM_ITEMS,
        component: (
          <SectionAddClaimItems
            claim={activeClaim}
            onAddMissingItemsHandler={() => showAddItemModal(true)}
            onDeleteClaimItem={deleteClaimItemHandler}
          />
        ),
      },
      // {
      //   name: FileClaimSteps.ADD_CLAIM_ITEMS_DETAILS,
      //   component: (
      //     <SectionAddItemDetails
      //       warrantyItems={api.getValue('addClaimItems.warrantyItems')}
      //       claim={activeClaim}
      //       claimOptions={claimOptions}
      //     />
      //   ),
      // },
      {
        name: FileClaimSteps.ADD_CLAIM_ITEMS_DAMAGE_DETAILS,
        component: <SectionAddDamageDetails claim={activeClaim} claimOptions={claimOptions} />,
      },
      {
        name: FileClaimSteps.REVIEW_CLAIM_DETAILS,
        component: <SectionReviewClaimDetails claim={activeClaim} />,
        nextButtonText: 'Submit',
      },
    ];
  };

  const insertClaimStep = useCallback(
    (planId: string | number) => {
      if (!activeClaim?.id) {
        dispatch(
          insertClaim({
            warrentyId: +planId,
            claimdate: moment(new Date()).format('YYYY-MM-DD'),
            damagedate: moment(new Date()).format('YYYY-MM-DD'),
            allowSMS: true,
          }),
        );
      }
    },
    [activeClaim],
  );

  const inserClaimItemsStep = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (rawClaim: any, api: FormApiInterface) => {
      const { plan, warrantyItems: claimWarrantyItems } = activeClaim ?? {};

      const items = claimWarrantyItems?.filter((wi: WarrantyItem) =>
        rawClaim.warrantyItems?.includes(wi.trackKey.toString()),
      );

      const claimItemDtos = items.map((item) => ({
        selectedItemId: item.id,
        warrentyId: plan.id,
        itemType: item.type.id,
        claimId: activeClaim.id,
        material: item.material.id,
        manuFacturer: item.manufacturer?.id,
        color: item.color.id,
        vendor: item.vendor,
        itemDescription: item.itemDescription,
        // material: rawClaim.addClaimItemDetails[item.id]?.material ?? item.material.id,
        // manuFacturer: rawClaim.addClaimItemDetails[item.id]?.manufacturer ?? item.manufacturer?.id,
        // color: rawClaim.addClaimItemDetails[item.id]?.color ?? item.color.id,
        // vendor: rawClaim.addClaimItemDetails[item.id]?.vendor ?? item.vendor,
        // itemDescription: rawClaim.addClaimItemDetails[item.id]?.itemDescription ?? item.itemDescription,
      }));

      dispatch(insertClaimItem(claimItemDtos));

      api.setValue('addClaimItems.warrantyItems', null);
    },
    [activeClaim, dispatch],
  );

  const insertClaimItemsDamagesStep = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (rawClaim: any, api: FormApiInterface) => {
      const { items: existingItems } = activeClaim;
      let damagesDtos = [];
      let damagesResume;
      Object.entries(rawClaim.addDamageDetails ?? {}).forEach(([itemId, damagesObject]) => {
        Object.entries(damagesObject ?? {}).forEach(([damageId, rawDamage]) => {
          const item = existingItems.find((item) => item.id === +itemId);
          if (!Array.isArray(rawDamage)) {
            damagesResume = item?.damages.filter((damage) => damage.id === +damageId);
            damagesDtos = [
              ...damagesDtos,
              {
                specificDamage: rawDamage['specificDamage'],
                specificLocation: rawDamage['specificLocation'],
                actionTaken: rawDamage['actionTaken'],
                damageDate: rawDamage['damageDate'],
                damageType: rawDamage['type'],
                howDidOccur: rawDamage['occuredReason'],
                selectedItemId: +itemId,
                claimId: activeClaim.id,
                notes: rawDamage['notes'],
              },
            ];
          }
        }, {});

        return damagesDtos;
      });
      if (damagesResume.length != 1) {
        dispatch(insertClaimItemDamage(damagesDtos));
      }
      damagesDtos.forEach((dto) => api.setValue(`addDamageDetails.${dto.selectedItemId}`, null));
    },
    [activeClaim, dispatch],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modifyClaimByStep = async (step: number, rawClaim: any, api: FormApiInterface) => {
    switch (step) {
      case 2:
        insertClaimStep(rawClaim.plan);
        break;
      case 3:
        inserClaimItemsStep(rawClaim, api);
        break;
      case 4:
        insertClaimItemsDamagesStep(rawClaim, api);
        break;
    }
  };

  const claimDefaultValues = useCallback(
    () => ({
      selectPlan: SectionSelectPlan.defaultValues(activeClaim),
      addClaimItems: SectionAddClaimItems.defaultValues(activeClaim),
      // addClaimItemDetails: SectionAddItemDetails.defaultValues(activeClaim),
      addDamageDetails: SectionAddDamageDetails.defaultValues(activeClaim),
      reviewDetails: SectionReviewClaimDetails.defaultValues(),
    }),
    [activeClaim],
  );

  const validation = useCallback(
    (api: FormApiInterface) => ({
      selectPlan: SectionSelectPlan.getValidationRules(api),
      addClaimItems: SectionAddClaimItems.getValidationRules(api, activeClaim),
      // addClaimItemDetails: SectionAddItemDetails.getValidationRules(api, activeClaim),
      addDamageDetails: SectionAddDamageDetails.getValidationRules(api, activeClaim),
      reviewDetails: SectionReviewClaimDetails.getValidationRules(api),
    }),
    [activeClaim],
  );

  const continueDraftClaim = (claim: Claim) => {
    dispatch(updateActiveClaim({ ...claim }));
    localStorage.setItem('claimId', claim.id.toString());
    nextRedirect(null, `/file-claim?claimId=${claim.id}&step=2`);
    formAPI?.setGroupActive(FileClaimStepsTitle[1].label);
  };

  const deleteDraftAndFileNewClaim = (planId, claim: Claim) => {
    dispatch(deleteClaim(claim.id));
    pushNotification(NotificationType.SUCCESS, `Draft claim ${claim.id} is deleted`);

    dispatch(
      insertClaim({
        warrentyId: +planId,
        claimdate: moment(new Date()).format('YYYY-MM-DD'),
        damagedate: moment(new Date()).format('YYYY-MM-DD'),
        allowSMS: true,
      }),
    );
    nextRedirect(null, '/file-claim?step=2');
    formAPI?.setGroupActive(FileClaimStepsTitle[1].label);
  };

  if (!activeClaim) {
    return <Loading full={true} color="gray800" />;
  }

  return (
    <Layout>
      <Page bg="gray300" pt={0}>
        <Form
          validation={validation}
          defaultValues={claimDefaultValues()}
          onError={async (errors, api) => {
            const validationErrors = Object.entries(errors);
            if (validationErrors.length > 0) {
              const [field] = validationErrors[0];
              const stepName = FileClaimStepsTitle.find((item) => item.value.includes(field))?.label;
              if (stepName) {
                pushNotification(NotificationType.ERROR, 'Validation failed. Please review your information.');

                const stepId = api.getGroups().findIndex((group) => group.name === stepName) + 1;
                const newQuery = {
                  ...query,
                  step: stepId,
                };
                await nextRedirect(
                  null,
                  `/file-claim?${queryString.stringify(newQuery)}`,
                  `/file-claim?${queryString.stringify(newQuery)}`,
                  {
                    shallow: true,
                  },
                );
                return api.setGroupActive(stepName);
              }
            }
          }}
          onSubmit={async () => {
            dispatch(submitClaim(activeClaim.id));

            showClaimSubmitModal(true);
            pushNotification(NotificationType.SUCCESS, 'Your claim is submitted.');
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
                errorSteps={errorSteps[claimId] || {}}
                title="File a claim"
                steps={steps(api)}
                onClick={(event) => api.setTouched(event?.target?.name)}
                backButton={{
                  onClick: async (previousStep) => {
                    if (previousStep && previousStep != FileClaimSteps.SELECT_PLAN) {
                      const stepId = api.getGroups().findIndex((group) => group.name === previousStep) + 1;

                      if (stepId == 2) {
                        api.setValue('addClaimItems.warrantyItems', []);
                      }
                      const newQuery = {
                        ...query,
                        step: stepId,
                      };
                      await nextRedirect(
                        null,
                        `/file-claim?${queryString.stringify(newQuery)}`,
                        `/file-claim?${queryString.stringify(newQuery)}`,
                        {
                          shallow: true,
                        },
                      );
                      return api.setGroupActive(previousStep);
                    } else {
                      await nextRedirect(null, '/account');
                      dispatch(removeActiveClaim());
                    }
                  },
                }}
                nextButton={{
                  isDisabled: (currentStep) => {
                    if (preventSubmitClaim[claimId] && currentStep == FileClaimSteps.REVIEW_CLAIM_DETAILS) {
                      return true;
                    } else if (currentStep == FileClaimSteps.ADD_CLAIM_ITEMS_DAMAGE_DETAILS) {
                      let isFilesValid = false;
                      const values = api.getValue('addDamageDetails');

                      Object.keys(values ?? {}).map((key, i) => {
                        isFilesValid =
                          i == 0
                            ? values[key] && values[key].files && values[key].files.length >= 1
                            : isFilesValid && values[key].files.length >= 1;
                      });
                      return !(api.getGroup(currentStep)?.isCompleted && isFilesValid);
                    } else {
                      return !api.getGroup(currentStep)?.isCompleted;
                    }
                  },
                  onClick: async (nextStepName) => {
                    const rawClaim = await claimSubmit(api.getAllValues());
                    const stepId = api.getGroups().findIndex((group) => group.name === nextStepName) + 1;

                    const draftClaims =
                      stepId == 2
                        ? claims?.filter(
                            (claim: Claim) =>
                              ((claim.plan && claim.plan.id === rawClaim.plan) || claim.warrantyId === rawClaim.plan) &&
                              [ClaimStatus.INPROCESS].includes(claim.status),
                          ) ?? []
                        : [];
                    if (stepId == 2 && draftClaims.length > 0) {
                      setDraftClaim(draftClaims[0]);
                      setCurrentPlanId(rawClaim.plan);
                      showConfirmDraftModal(true);
                    } else {
                      await modifyClaimByStep(stepId, rawClaim, api);
                      const newQuery = {
                        ...query,
                        step: stepId,
                      };
                      await nextRedirect(
                        null,
                        `/file-claim?${queryString.stringify(newQuery)}`,
                        `/file-claim?${queryString.stringify(newQuery)}`,
                        {
                          shallow: true,
                        },
                      );
                      return api.setGroupActive(nextStepName);
                    }
                  },
                }}
              />
              {loading && <Loading full={true} color="gray800" />}
              {isAddItemModalShown && (
                <AddWarrantyItemModal
                  claim={activeClaim}
                  claimOptions={claimOptions}
                  insertManualWarrantyItem={(dto: InsertWarrantyItemDto) => {
                    dispatch(insertWarrantyItem(dto));
                    if (typeof window !== 'undefined') {
                      window.scrollTo(0, 0);
                    }
                  }}
                  onClose={() => showAddItemModal(false)}
                />
              )}
              {isClaimSubmitModalShown && (
                <Modal
                  isOpen={isClaimSubmitModalShown}
                  onClose={() => {
                    showClaimSubmitModal(false);
                    nextRedirect(null, '/account?view=claim');
                  }}
                  measure="lg"
                >
                  <Modal.Header>
                    <Heading as="h5">
                      YOUR CLAIM HAS BEEN SUBMITTED. THE ONLINE CLAIMS TEAM WILL REACH OUT TO YOU BY PHONE OR EMAIL
                      WITHIN 24 BUSINESS HOURS WITH NEXT STEPS ON YOUR CLAIM.
                    </Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <Box m={[15, 15, 0]}>
                      <Heading as="h4" align="center" color="primaryLight">
                        {' '}
                        Please check the &quot;Open Claims&quot; section for status and updates.{' '}
                      </Heading>
                      <Heading as="h4" align="center" color="primary">
                        Please note your claim number
                      </Heading>
                      <Heading align="center">{activeClaim.id}</Heading>
                    </Box>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      fullWidth
                      onClick={() => {
                        showClaimSubmitModal(false);
                        nextRedirect(null, '/account?view=claim');
                      }}
                      uppercase={false}
                      color="primary"
                      mb={{ xs: 15, md: 0 }}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
            </Fragment>
          )}
        </Form>
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
                <Heading measure={{ xs: 'h6', sm: 'h5' }} color="primaryLight">
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
                        deleteDraftAndFileNewClaim(currentPlanId, draftClaim);
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
      </Page>
    </Layout>
  );
};

FileClaimPage.getInitialProps = ({ store, res }) => {
  const {
    app: { isAuthorized },
  } = store.getState();
  if (!isAuthorized) {
    return nextRedirect(res, '/');
  }

  store.dispatch(fetchClaimDetailsData());
};

const mapStateToProps = ({
  user,
  scopeLoading,
  scopeError,
  fileClaim: { activeClaim, preventSubmitClaim, errorSteps },
}: RootState) => {
  const { claimOptions } = user;
  return {
    plans: user.plans,
    claims: user.claims,
    scopeLoading,
    scopeError,
    claimOptions,
    activeClaim,
    preventSubmitClaim,
    errorSteps,
  };
};

export default connect(mapStateToProps, null)(FileClaimPage);
