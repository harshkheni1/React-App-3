import React, { useContext, useEffect } from 'react';
import { ContextApi, FormApiInterface, ValidationRulesInterface, Validator } from 'react-uforms';

import {
  Box,
  Col,
  FormError,
  FormInputField,
  FormInputPassword,
  FormInputPhoneField,
  FormLabel,
  Hr,
  Row,
  Text,
  styled,
  Tooltip,
  Heading,
  alignItemsHelperStyle,
} from '@/ui-kit';

import { ModalContainerStyled } from '../../../modal-content.styled';
import { CreateAccountSearchWith, UserAccount } from './types';
import { ValidatorTrimmedRequired } from '@/core-types/validation-errors';

export interface SectionAddDetailsProps {
  userAccount: UserAccount;
}

const Tooltipwraper = styled('div')`
  display: flex;
  align-items: center;
  p {
    width: auto !important;
    margin-left: 15px !important;
    white-space: nowrap;
  }
  div {
    text-align: center;
  }
`;

const SectionAddDetails: React.FC<SectionAddDetailsProps> & {
  getValidationRules: (api?: FormApiInterface) => ValidationRulesInterface;
  defaultValues;
  accountProfileSubmit;
} = ({ userAccount }) => {
  const { searchWith, search } = userAccount ?? {};

  const { setValue } = useContext(ContextApi);

  useEffect(() => {
    switch (searchWith) {
      case CreateAccountSearchWith.EMAIL:
        setValue('addDetails.email', search);
        break;
      case CreateAccountSearchWith.PHONE:
        setValue('addDetails.phone', search);
        break;
      default:
        break;
    }
  }, [search, searchWith]);

  return (
    <Row>
      <Col md={6} mdOffset={3}>
        <ModalContainerStyled p={[15, 25]}>
          <Text measure="sm" uppercase fontWeight="bold" mt={0} color="gray700">
            1. General Details
          </Text>
          <Row>
            <Col col={6}>
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
            <Col col={6}>
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
          </Row>
          <FormInputField
            name="addDetails.email"
            label="Your email:"
            measure="md"
            placeholder="Required"
            type="text"
            mb={15}
            required
          />
          <FormInputPhoneField
            name="addDetails.phone"
            label="Your Phone:"
            measure="md"
            placeholder="Required"
            type="tel"
            mb={15}
            required
          />
          <Box mb={20}>
            <FormLabel>
              <Row alignItems="center">
                <Col col={6}>
                  <Row>
                    <Tooltipwraper>
                      <Text ml={15} mr={10} as="p" measure="sm" mb={8} display="block">
                        Your password: *
                      </Text>
                      <Tooltip
                        isButton={true}
                        direction="up"
                        content={
                          <div>
                            <Heading as="h6" align="center">
                              <Text as="p" measure="sm" mt={0} mb={0}>
                                Please create your password.
                              </Text>
                              <Text as="p" measure="md" mt={0} color="primary">
                                Password requirements
                              </Text>
                            </Heading>
                            <ul>
                              <li>Must be a minimum of 8 characters.</li>
                              <li>Must contain Uppercased and Lowercased letters.</li>
                              <li>Must contain numbers and special characters.</li>
                            </ul>
                          </div>
                        }
                      />
                    </Tooltipwraper>
                  </Row>
                </Col>
                <Col col={6}>
                  <Text as="em" align="right" color="gray700" measure="sm" mb={8} display="block">
                    8 characters min
                  </Text>
                </Col>
              </Row>
              <FormInputPassword placeholder="Required" type="password" name="addDetails.password" required />
            </FormLabel>
            <FormError name="addDetails.password" />
          </Box>
          <Hr color="gray500" m={[16, 0]} />
          <Text measure="sm" uppercase fontWeight="bold" color="gray700" mt={0}>
            2. Address
          </Text>
          <FormInputField
            name="addDetails.address1"
            label="Address Line 1:"
            measure="md"
            placeholder="Required"
            type="text"
            mb={15}
            required
          />
          <FormInputField
            name="addDetails.address2"
            label="Address Line 2:"
            measure="md"
            placeholder="Enter Apt / Suite / Floor, etc"
            type="text"
            mb={15}
          />
          <Row>
            <Col col={6}>
              <FormInputField
                name="searchPlan.zip"
                label="Zip Code:"
                measure="md"
                placeholder="Required"
                type="text"
                mb={15}
                required
              />
            </Col>
            <Col col={6}>
              <FormInputField
                name="addDetails.state"
                label="State:"
                measure="md"
                placeholder="Required"
                type="text"
                mb={15}
                required
              />
            </Col>
          </Row>
          <FormInputField
            name="addDetails.city"
            label="City:"
            measure="md"
            placeholder="Required"
            type="text"
            required
            mb={15}
          />
        </ModalContainerStyled>
      </Col>
    </Row>
  );
};

SectionAddDetails.defaultValues = (userAccount?: UserAccount) => {
  const { search, searchWith } = userAccount ?? {};

  return {
    email: searchWith === CreateAccountSearchWith.EMAIL ? search : '',
    phone: searchWith === CreateAccountSearchWith.PHONE ? search : '',
  };
};

SectionAddDetails.getValidationRules = () => ({
  email: [Validator.Required(), Validator.Email()],
  phone: [
    Validator.Required(),
    Validator.Preg(/\(([0-9]{3})\)([ ])([0-9]{3})([-])([0-9]{4})/, 'Phone number format: (XXX) XXX-XXXX'),
  ],
  password: [
    Validator.Required(),
    Validator.MinLength(8),
    Validator.Preg(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&/,><\’:;|_~`])\S{8,99}$/,
      'Lowercased letters, uppercased letters, numbers, special characters are required',
    ),
  ],

  address1: [ValidatorTrimmedRequired],
  state: [ValidatorTrimmedRequired],
  city: [ValidatorTrimmedRequired],
});

SectionAddDetails.accountProfileSubmit = ({
  addDetails: { email, phone, password, address1, address2, state, city },
  searchPlan: { name, surname, zip },
}) => ({
  name,
  surname,
  email,
  phone,
  password,

  zip,
  address1,
  address2,
  state,
  city,
});

export default SectionAddDetails;
