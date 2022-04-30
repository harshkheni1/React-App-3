import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormCheckboxContainer } from './container';
import { FormCheckboxIcon } from './icon';
import { FormCheckboxLabelPlan } from './label-plan';
import { FormCheckboxPlanGroupFieldProps } from './types';
import { FormCheckboxHiddenPlanItemStyled } from './hidden';
import { Text } from '../../text';
import { Row, Col } from '@/components/ui-kit';

export const FormCheckboxPlanGroupField: FC<FormCheckboxPlanGroupFieldProps> & WithStyle = ({
  m,
  mt,
  mr,
  mb,
  ml,
  p,
  pt,
  pr,
  pb,
  pl,
  ...props
}) => {
  const { value, onChange, id, className, disabled, onClick } = props;
  return (
    <FormCheckboxContainer {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl, id, className }}>
      <FormCheckboxHiddenPlanItemStyled {...{ value, onChange, disabled, onClick }} />
      <FormCheckboxLabelPlan {...props}>
        <FormCheckboxIcon />
        <Col col={8} sm={8} lg={8}>
          <Row>
            <Text as="span" fontWeight="sbold">
              {props.label}
            </Text>
          </Row>
          <Row>
            {props.itemDescription && (
              <Text as="span">
                <Text as="span" color="gray700" measure="sm">
                  {/* {'Description: '} */}
                </Text>
                <Text as="span" measure="sm">
                  {props.itemDescription}
                </Text>
              </Text>
            )}
          </Row>
        </Col>
        <Col col={4} sm={4} lg={4}>
          <Row>
            {props.sku && (
              <Text as="span">
                <Text as="span" color="gray700" measure="sm">
                  {'Sku: '}
                </Text>
                <Text as="b" measure="sm">
                  {props.sku}
                </Text>
              </Text>
            )}
          </Row>
          <Row>
            {props.vendor && (
              <Text as="span">
                <Text as="span" color="gray700" measure="sm">
                  {'Vendor: '}
                </Text>
                <Text as="b" measure="sm">
                  {props.vendor}
                </Text>
              </Text>
            )}
          </Row>
        </Col>
      </FormCheckboxLabelPlan>
    </FormCheckboxContainer>
  );
};

FormCheckboxPlanGroupField.defaultProps = {
  required: false,
};

FormCheckboxPlanGroupField.displayName = 'FormCheckboxPlanGroupField';
