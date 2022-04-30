import React, { Fragment, useContext, useEffect } from 'react';
import { ContextApi, ValidationRulesInterface, Validator } from 'react-uforms';
import moment from 'moment';

import { SectionInterface } from './types';
import { Claim } from '@/core-types/claim';
import PlanHeader from './helpers/plan-header';
import { ModalContainerStyled } from '@/components/modal-content.styled';
import { Box } from '@/components/ui-kit';
import { ClaimBox } from './helpers/claim-box';
import { ClaimsOptionsInterface } from '@/store/user/types';
import { ClaimItem } from '@/core-types/claim-item';

interface SectionReportDamageProps {
  claim: Partial<Claim>;
  claimOptions: ClaimsOptionsInterface;
}

const SectionAddDamageDetails: SectionInterface<SectionReportDamageProps> = ({ claim, claimOptions }) => {
  const { plan, items } = claim ?? {};

  const formApi = useContext(ContextApi);
  useEffect(() => {
    items?.forEach((item) =>
      item.damages?.forEach((damage) => {
        formApi.setValue(`addDamageDetails.${item.id}.${damage.id}.type`, damage.type.id.toString());
        formApi.setValue(`addDamageDetails.${item.id}.${damage.id}.actionTaken`, damage.actionTaken.id.toString());
        formApi.setValue(`addDamageDetails.${item.id}.${damage.id}.occuredReason`, damage.occuredReason.id.toString());
        formApi.setValue(
          `addDamageDetails.${item.id}.${damage.id}.specificDamage`,
          damage.specificDamage.id.toString(),
        );
        formApi.setValue(
          `addDamageDetails.${item.id}.${damage.id}.damageDate`,
          moment(damage.damageDate).format('YYYY-MM-DD'),
        );
        formApi.setValue(
          `addDamageDetails.${item.id}.${damage.id}.specificLocation`,
          damage.specificLocation.id.toString(),
        );
        formApi.setValue(`addDamageDetails.${item.id}.${damage.id}.notes`, damage.notes);
        formApi.setTouched(`addDamageDetails.${item.id}.${damage.id}.specificLocation`);
      }),
    );
  }, [items]);

  return (
    <Fragment>
      <PlanHeader plan={plan} />
      <ModalContainerStyled m={[10, 0]} p={[10, 0]}>
        {items?.map((item, idx) => {
          return (
            <Box key={item.id} mt={15}>
              <Box m={[15]}>
                <ClaimBox item={item} idx={idx + 1} claimOptions={claimOptions} />
              </Box>
            </Box>
          );
        })}
      </ModalContainerStyled>
    </Fragment>
  );
};

SectionAddDamageDetails.defaultValues = (claim: Partial<Claim>) => {
  const { items } = claim ?? {};

  const damageDefaults = items?.reduce((acc, item) => {
    acc[item.id] = item.damages?.reduce((damageAcc, damage) => {
      damageAcc[damage.id] = {
        actionTaken: damage.actionTaken.id.toString(),
        type: damage.type.id.toString(),
        occuredReason: damage.occuredReason.id.toString(),
        specificDamage: damage.specificDamage.id.toString(),
        specificLocation: damage.specificLocation.id.toString(),
        damageDate: moment(damage.damageDate).format('YYYY-MM-DD'),
        notes: damage.notes,
      };
      return damageAcc;
    }, {});

    return acc;
  }, {});

  return damageDefaults;
};

SectionAddDamageDetails.getValidationRules = ({ getValue }, claim) => {
  const { items } = claim ?? {};

  const rules =
    items &&
    items?.reduce((acc: ValidationRulesInterface, item: ClaimItem) => {
      const formDamages = getValue(`addDamageDetails.${item.id}`);
      acc[item.id] = Object.keys(formDamages ?? {}).reduce((damageAcc, damageId) => {
        damageAcc[damageId] = {
          actionTaken: [Validator.Required()],
          type: [Validator.Required()],
          occuredReason: [Validator.Required()],
          specificLocation: [
            Validator.Required(
              'Stand facing the item (all damage locations must be identified from this position. Is the damage to your left or to your right?)',
            ),
          ],
          specificDamage: [Validator.Required()],
          damageDate: [Validator.Required()],
          notes: [Validator.Required()],
        };
        return damageAcc;
      }, {});
      return acc;
    }, {});
  return rules;
};

SectionAddDamageDetails.claimItemSubmit = ({ addDamageDetails }) => ({ addDamageDetails });

export default SectionAddDamageDetails;
