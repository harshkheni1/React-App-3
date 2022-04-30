import React, { useContext } from 'react';
import { ContextApi, FormApiInterface, ValidationRulesInterface, Validator } from 'react-uforms';

import {
  Box,
  Col,
  FormInputClearable,
  FormInputField,
  FormInputPhoneField,
  FormLabel,
  FormRadioField,
  Hr,
  Row,
  Text,
  Tooltip,
} from '@/ui-kit';
import { ModalContainerStyled } from '../../../modal-content.styled';
import { CreateAccountSearchWith } from './types';
import { FormRadioBlockWrapperStyled } from '@/components/ui-kit/components/form/radio/block/block-wrapper.styled';
import { ValidatorTrimmedRequired } from '@/core-types/validation-errors';

const SectionSearchPlan: React.FC & {
  getValidationRules: (api?: FormApiInterface) => ValidationRulesInterface;
  defaultValues;
  accountProfileSubmit;
} = () => {
  const { getValue, setValue, setTouched } = useContext(ContextApi);
  const searchOptionSelect = () => {
    setValue('searchPlan.search', null);
    setTouched('searchPlan.search');
  };
  return (
    <Row>
      <Col md={6} mdOffset={3}>
        <ModalContainerStyled>
          <Text align="center" p={[23, 25, 15]} m={[0]} measure="sm">
            Please fill the details below to find your plan.
          </Text>
          <Hr color="gray500" m={[8, 0, 20]} />
          <Box p={[0, 25, 16]}>
            <Row>
              <Col lg={6}>
                <FormInputField
                  name="searchPlan.name"
                  label="First Name:"
                  measure="md"
                  placeholder="Required"
                  type="text"
                  mb={15}
                  required
                />
              </Col>
              <Col lg={6}>
                <FormInputField
                  name="searchPlan.surname"
                  label="Last Name:"
                  measure="md"
                  placeholder="Required"
                  type="text"
                  mb={15}
                  required
                />
              </Col>
              <Col lg={6}>
                <FormInputField
                  name="searchPlan.zip"
                  label="Home ZIP Code:"
                  measure="md"
                  placeholder="Required"
                  type="text"
                  mb={15}
                  required
                />
              </Col>
            </Row>
            <Hr color="gray500" mb={23} />
            <Row>
              <FormLabel ml={15} mr={10}>
                Search with:
              </FormLabel>
              <Tooltip
                direction="up"
                isButton={true}
                content={
                  <>
                    Please search with one of the following: <br />
                    Your email (at the date of purchase), <br />
                    Your phone number (at the date of purchase), or <br />
                    Your invoice #.
                  </>
                }
              />
            </Row>
            <FormRadioBlockWrapperStyled mb={16}>
              <FormRadioField
                block
                label="Email"
                name="searchPlan.searchWith"
                value={CreateAccountSearchWith.EMAIL}
                onChange={searchOptionSelect}
              />
              <FormRadioField
                block
                label="Phone #"
                name="searchPlan.searchWith"
                value={CreateAccountSearchWith.PHONE}
                onChange={searchOptionSelect}
              />
              <FormRadioField
                block
                label="Invoice #"
                name="searchPlan.searchWith"
                value={CreateAccountSearchWith.INVOICE}
                onChange={searchOptionSelect}
              />
            </FormRadioBlockWrapperStyled>

            {getValue('searchPlan.searchWith') === CreateAccountSearchWith.PHONE ? (
              <FormInputPhoneField
                name="searchPlan.search"
                measure="md"
                placeholder="Enter your phone"
                type="tel"
                mb={15}
                required
              />
            ) : (
              <FormInputClearable
                type="text"
                name="searchPlan.search"
                required
                clearable
                maxLength={getValue('searchPlan.searchWith') === CreateAccountSearchWith.INVOICE ? 40 : 254}
                placeholder={`Enter your ${getValue('searchPlan.searchWith')}`}
                onChange={() => setTouched('searchPlan.search')}
              />
            )}
          </Box>
          <Hr color="gray500" mb={16} />
          <Box p={[0, 25, 25]} align="center">
            <Text m={[0]} measure="sm">
              Don’t have a plan?
            </Text>
            <Text m={[0]} measure="sm">
              Learn more about ProtectionAll and our retail partners
            </Text>
          </Box>
        </ModalContainerStyled>
      </Col>
    </Row>
  );
};

SectionSearchPlan.defaultValues = () => ({
  searchWith: CreateAccountSearchWith.EMAIL,
});

SectionSearchPlan.getValidationRules = ({ getValue }) => {
  let search: Validator.ValidatorInterface[] = [];
  switch (getValue('searchPlan.searchWith')) {
    case CreateAccountSearchWith.PHONE:
      search = [
        Validator.Required(),
        Validator.MaxLength(64),
        Validator.Preg(/\(([0-9]{3})\)([ ])([0-9]{3})([-])([0-9]{4})/, 'Phone number format: (XXX) XXX-XXXX'),
      ];
      break;
    case CreateAccountSearchWith.INVOICE:
      search = [ValidatorTrimmedRequired, Validator.MaxLength(64)];
      break;
    case CreateAccountSearchWith.EMAIL:
      search = [Validator.Required(), Validator.Email()];
  }

  return {
    name: [ValidatorTrimmedRequired, Validator.MaxLength(64)],
    surname: [ValidatorTrimmedRequired, Validator.MaxLength(64)],
    zip: [ValidatorTrimmedRequired, Validator.MaxLength(10)],
    searchWith: [Validator.Required(), Validator.Range(Object.values(CreateAccountSearchWith))],
    search,
  };
};

SectionSearchPlan.accountProfileSubmit = ({ searchPlan: { name, surname, zip, searchWith, search } }) => ({
  name,
  surname,
  zip,
  searchWith,
  search,
});

export default SectionSearchPlan;
