import React, { useState, useContext } from 'react';
import { ContextApi } from 'react-uforms';
import {
  Box,
  Row,
  Col,
  Hr,
  FormSelectField,
  FormDatepickerField,
  Text,
  Button,
  Icon,
  FormTextAreaField,
} from '@/ui-kit';
import { ClaimItem } from '@/core-types/claim-item';
import { ClaimsOptionsInterface } from '@/store/user/types';
import { ValueType } from 'react-uforms/dist/components/validator';

export interface ClaimItemInterface {
  item: ClaimItem;
  damageId: number;
  counter: number;
  claimOptions: ClaimsOptionsInterface;
  onDeleteHandler?: () => void;
}
export const DamageBox: React.FC<ClaimItemInterface> = ({ item, claimOptions, damageId, counter, onDeleteHandler }) => {
  const formContext = useContext(ContextApi);
  const typeOptions = claimOptions.damageTypes.map((v) => ({ label: v.name, value: v.id.toString() }));
  const [specificDamageOptions, setSpecificDamageOptions] = useState(
    claimOptions.specificDamages
      .filter((v) => {
        return v.parrentId == formContext.getValue(`addDamageDetails.${item.id}.${damageId}.type`);
      })
      .map((v) => ({ label: v.name, value: v.id.toString() })),
  );

  const specificLocationOptions = claimOptions.specificLocations.map((v) => ({
    label: v.name,
    value: v.id.toString(),
  }));
  const occuredReasonOptions = claimOptions.howDidOccur.map((v) => ({ label: v.name, value: v.id.toString() }));
  const actionTakenOptions = claimOptions.actionsTaken.map((v) => ({ label: v.name, value: v.id.toString() }));

  return (
    <>
      <Hr color="gray500" m={[16, 0]} />

      <Box>
        <Row>
          <Col col={5}>
            <Text measure="sm" fontWeight="bold" color="gray700" uppercase letterSpacing={2} mt={0}>
              Damage {counter}
            </Text>
          </Col>
          {counter > 1 && (
            <Col col={7}>
              <Button
                style={{ fontSize: '12px', letterSpacing: '2px', lineHeight: '22px', float: 'right' }}
                variant="link"
                color="danger"
                as="div"
                uppercase
                measure="sm"
                onClick={onDeleteHandler}
                p={[0]}
              >
                <Icon name="delete-page" measure={16} /> Delete Damage
              </Button>
            </Col>
          )}
        </Row>
      </Box>

      <Box mb={15}>
        <Row>
          <Col sm={6} lg={4}>
            <FormSelectField
              name={`addDamageDetails.${item.id}.${damageId}.type`}
              label="Damage Category: *"
              options={typeOptions}
              placeholder="Required"
              onChange={(e) => {
                if (e) {
                  const spdmg = claimOptions.specificDamages
                    .filter((v) => {
                      return v.parrentId == (e as ValueType).value;
                    })
                    .map((v) => ({ label: v.name, value: v.id.toString() }));
                  setSpecificDamageOptions(spdmg);
                  formContext.setValue(`addDamageDetails.${item.id}.${damageId}.specificDamage`, null);
                } else {
                  setSpecificDamageOptions([]);
                  formContext.setValue(`addDamageDetails.${item.id}.${damageId}.specificDamage`, null);
                }
              }}
              pb={24}
              isClearable
            />
          </Col>
          <Col sm={6} lg={4}>
            <FormSelectField
              name={`addDamageDetails.${item.id}.${damageId}.specificDamage`}
              label="Specific Damage: *"
              tooltip={'Please note: a Specific Damage will not display until you select a Damage Category.'}
              options={specificDamageOptions}
              placeholder="Required"
              pb={24}
              isClearable
            />
          </Col>
          <Col sm={6} lg={4}>
            <FormSelectField
              name={`addDamageDetails.${item.id}.${damageId}.specificLocation`}
              label="Damage Area: *"
              tooltip={
                'Stand facing the item (all damage locations must be identified from this position. Is the damage to your left or to your right?)'
              }
              options={specificLocationOptions}
              placeholder="Required"
              pb={24}
              isClearable
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6} lg={4}>
            <FormDatepickerField
              id={`addDamageDetails.${item.id}.${damageId}.damageDate`}
              autoComplete="off"
              label="When did you notice the damage: *"
              name={`addDamageDetails.${item.id}.${damageId}.damageDate`}
              placeholderText="Required"
              popperPlacement="bottom-start"
              showMonthDropdown
              showYearDropdown
              pb={24}
              maxDate={new Date()}
              readOnly
            />
          </Col>
          <Col sm={6} lg={4}>
            <FormSelectField
              name={`addDamageDetails.${item.id}.${damageId}.occuredReason`}
              label="How did it happen: *"
              options={occuredReasonOptions}
              placeholder="Required"
              pb={24}
              isClearable
            />
          </Col>
          <Col sm={6} lg={4}>
            <FormSelectField
              name={`addDamageDetails.${item.id}.${damageId}.actionTaken`}
              label="Did you take any steps to remedy: *"
              options={actionTakenOptions}
              placeholder="Required"
              pb={24}
              isClearable
            />
          </Col>
        </Row>
        <Row>
          <Col sm={16} lg={12}>
            <FormTextAreaField
              name={`addDamageDetails.${item.id}.${damageId}.notes`}
              id={`addDamageDetails.${item.id}.${damageId}.notes`}
              label="Note: *"
              tooltip={'Please provide a brief summary of what happened to your item.'}
              measure="md"
              placeholder="Required"
              maxLength={100}
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};
