import React from 'react';
import { Box, Text, Row, Col } from '@/ui-kit';

import { Customer } from '@/core-types/customer';
import { OptionPlan } from '@/components/ui-kit/components/options/plan';

interface CustomerEntryProps {
  customer: Customer;
  radio?: boolean;
}

export const CustomerEntry: React.FC<CustomerEntryProps> = ({ customer, radio = false }) => {
  return (
    <OptionPlan required={false} value={customer.id} label={customer.id} mb={24} logo={null} radio={radio}>
      <Box p={[0, 15]}>
        <Row alignItems="center">
          <Col col={6} md={3}>
            <Text fontWeight="sbold" measure="sm">
              Full Name:
            </Text>
            <Text measure="sm">{`${customer.firstName} ${customer.lastName}`}</Text>
          </Col>
          <Col col={6} md={3} lg={2}>
            <Text fontWeight="sbold" measure="sm">
              Home ZIP Code:
            </Text>
            <Text measure="sm">{customer.zip}</Text>
          </Col>
          <Col md={6} lg={3}>
            <Text fontWeight="sbold" measure="sm">
              Email:
            </Text>
            <Text measure="sm">{customer.email}</Text>
          </Col>
          <Col col={6} sm={6} lg={2}>
            <Text fontWeight="sbold" measure="sm">
              Phone Number:
            </Text>
            <Text measure="sm">{customer.phone}</Text>
          </Col>
        </Row>
      </Box>
    </OptionPlan>
  );
};
