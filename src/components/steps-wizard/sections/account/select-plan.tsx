import React, { Fragment, useContext, useCallback, useEffect, useState } from 'react';
import { FormApiInterface, ValidationRulesInterface, Validator, ContextApi } from 'react-uforms';

import { A, Box, Col, FormCheckboxGroupField, Hr, Icon, Img, Row, Text } from '@/ui-kit';
import { ModalContainerStyled } from '../../../modal-content.styled';
import { CreateAccountSearchWith, UserAccount } from './types';
import { Customer } from '@/core-types/customer';
import { CustomerEntry } from '@/components/customer';
import { SearchCustomerDto } from '@/core-types/customer';

import NoPlans from '../../../../images/no-plans.png';

export interface SectionSelectPlanProps {
  userAccount: UserAccount;
  customers: Customer[];
  searchCustomer: (dto: SearchCustomerDto) => void;
}

const SectionSelectPlan: React.FC<SectionSelectPlanProps> & {
  getValidationRules: (api?: FormApiInterface) => ValidationRulesInterface;
  defaultValues;
  accountProfileSubmit;
} = ({ userAccount, customers, searchCustomer }) => {
  const { name, surname, zip, searchWith, search } = userAccount ?? {};

  const { getValue, setValue } = useContext(ContextApi);

  const fetchCustomers = useCallback(() => {
    let searchCustomerDto: SearchCustomerDto = null;
    switch (searchWith) {
      case CreateAccountSearchWith.PHONE:
        searchCustomerDto = {
          search_type: 'search_plan_2',
          name_first: name,
          name_last: surname,
          phone_number: search,
        };
        break;

      case CreateAccountSearchWith.INVOICE:
        searchCustomerDto = {
          search_type: 'search_plan_3',
          zip_code: zip,
          invoice_number: search,
        };
        break;

      default:
        searchCustomerDto = {
          search_type: 'search_plan_1',
          name_first: name,
          name_last: surname,
          zip_code: zip,
        };
        break;
    }

    searchCustomer(searchCustomerDto);
  }, [name, surname, zip, searchWith, search]);

  useEffect(() => {
    if (!name && !surname && !zip) {
      return;
    }
    fetchCustomers();
    setValue('selectPlan.plan', '');
  }, [name, surname, zip, searchWith, search]);

  return (
    <Fragment>
      <ModalContainerStyled p={[0, 15]}>
        <Row alignItems="center">
          <Col col={6} md={3}>
            <Text fontWeight="bold" measure="sm">
              Full Name:
            </Text>
            <Text measure="sm">{`${name} ${surname}`}</Text>
          </Col>
          <Col col={6} md={3} lg={2}>
            <Text fontWeight="bold" measure="sm">
              Home ZIP Code:
            </Text>
            <Text measure="sm">{zip}</Text>
          </Col>
          <Col md={5} lg={6}>
            <Text fontWeight="bold" measure="sm" style={{ textTransform: 'capitalize' }}>
              {searchWith}:
            </Text>
            <Text measure="sm">{search}</Text>
          </Col>
        </Row>
      </ModalContainerStyled>
      {customers?.length > 0 ? (
        <>
          <Text measure="sm">Please select your plan(s) below.</Text>
          <Hr color="gray500" m={[16, 0]} />
          <Row>
            <Col col={6}>
              <Text measure="xxs" uppercase>
                {customers.length} plans found
              </Text>
            </Col>
            <Col col={6}>
              <Box align="right">
                <Text measure="xxs" uppercase>
                  {getValue('selectPlan.plan')?.length}/{customers.length} selected
                </Text>
              </Box>
            </Col>
          </Row>
          <FormCheckboxGroupField name="selectPlan.plan" hideError>
            {customers.map((customer: Customer, idx) => (
              <CustomerEntry key={`${customer.email}_${idx}`} customer={customer} />
            ))}
          </FormCheckboxGroupField>
        </>
      ) : (
        <Box mt={70} align="center">
          <Img src={NoPlans} alt="No plans have been found" height={96} />
          <br />
          {/* <Icon name="email" mr={10} measure={96} color="primaryDark" /><br /> */}
          Unfortunately, we were not able to locate your contract with the information provided. <br />
          Please{' '}
          <A href={'mailto:support@myprotectall.com'} color="primary" measure="sm">
            email
          </A>{' '}
          and provide us the following information to help us locate your account:
          <br />
          <Text measure="sm">
            First Name (as listed on the original invoice)
            <br />
            Last Name (as listed on the original invoice)
            <br />
            Zip Code (as listed on the original invoice)
            <br />
            Phone Number (as listed on the original invoice)
            <br />
            Invoice # (as listed on the original invoice)
            <br />
            Email Address (as listed on the original invoice)
            <br />
            If possible, attach a copy of your invoice to your email.
          </Text>
          <A href={'mailto:support@myprotectall.com'} color="primary" measure="sm">
            support@myprotectall.com
          </A>
        </Box>
      )}
    </Fragment>
  );
};

SectionSelectPlan.defaultValues = () => {
  return {
    plan: '',
  };
};

SectionSelectPlan.getValidationRules = () => ({
  plan: [Validator.Required()],
});

SectionSelectPlan.accountProfileSubmit = ({ selectPlan: { plan } }) => ({
  plan,
});

export default SectionSelectPlan;
