import React from 'react';
import { Box, Text, Tag, Row, Col, Colors, styled } from '@/ui-kit';
import moment from 'moment';

import { Damage as DamageType, DamageSatusToUI } from '@/core-types/damage';
import FieldBlock from './field-block';
import { Claim, ClaimStatus } from '@/core-types/claim';

const DamageStyled = styled('div')`
  width: 100%;
  border-left: 4px solid ${Colors.gray700};
  padding-left: 16px;
  margin: 20px 0;
  display: inline-block;
`;

export interface DamageInterface {
  claim: Claim;
  item: DamageType;
  idx: number;
}
export const Damage: React.FC<DamageInterface> = ({ item, idx, claim }) => {
  const { status } = claim ?? {};

  return (
    <DamageStyled>
      <Box mb={15}>
        <Text as="b" measure="sm" color="gray700" uppercase mr={15} letterSpacing={2}>
          Damage {idx + 1}
        </Text>
        {idx != 0 && status !== ClaimStatus.NOT_SUBMITTED && item.status && (
          <Tag color={DamageSatusToUI[item.status].color}>{DamageSatusToUI[item.status].text}</Tag>
        )}
      </Box>
      <Box>
        <Row>
          <Col sm={4}>
            <FieldBlock name="Damage Category" value={item.type?.name} />
          </Col>
          <Col sm={4}>
            <FieldBlock name="Specific Damage" value={item.specificDamage?.name} />
          </Col>
          <Col sm={4}>
            <FieldBlock name="Damage Area" value={item.specificLocation?.name} />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <FieldBlock name="When did it happen" value={moment(item.damageDate).format('MMMM Do, YYYY')} />
          </Col>
          <Col sm={4}>
            <FieldBlock name="How did it happen" value={item.occuredReason?.name} />
          </Col>
          <Col sm={4}>
            <FieldBlock name="Did you take any steps to remedy" value={item.actionTaken?.name} />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <FieldBlock name="Notes" value={item.notes} />
          </Col>
        </Row>
      </Box>
    </DamageStyled>
  );
};
