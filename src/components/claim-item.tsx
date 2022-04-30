import React from 'react';
import { Box, Tag, Section, Row, Col, Text, Hr, GridThemeProvider } from '@/ui-kit';
import { ClaimItem as ClaimItemType } from '@/core-types/claim-item';
import { Damage as DamageType, DamageSatusToUI } from '@/core-types/damage';

import { Damage } from './damage';
import FieldBlock from './field-block';
import { Claim, ClaimStatus } from '@/core-types/claim';

export interface ClaimItemInterface {
  item: ClaimItemType;
  claim: Claim;
  idx: number;
}

export const ClaimItem: React.FC<ClaimItemInterface> = ({ idx, item, claim }) => {
  const { manufacturer, color, material } = item;
  const isExpanded = true; //claim.status === ClaimStatus.NOT_SUBMITTED;

  return (
    <Section collapsable mb={10} expanded={isExpanded}>
      <Section.Header clickable>
        <GridThemeProvider
          gridTheme={{
            row: {
              padding: 1,
            },
            col: {
              padding: 1,
            },
          }}
        >
          <Row>
            <Col col={2} sm={1}>
              <Box bg="gray200" display="flex" alignItems="center" justifyContent="center" style={{ height: '100%' }}>
                <span>{idx}</span>
              </Box>
            </Col>
            <Col col={4} sm={8}>
              <Box bg="gray200" style={{ height: '100%' }} p={[10, 16]}>
                <Text fontWeight="bold" measure="sm" m={[0]}>
                  {item.damages && item.damages[0]
                    ? item.type?.name || '' + ' - ' + item.damages[0]?.type?.name
                    : item.type?.name || ''}
                </Text>
              </Box>
            </Col>
            <Col col={4} sm={2}>
              <Box bg="gray200" display="flex" alignItems="center" justifyContent="center" style={{ height: '100%' }}>
                {item.damages &&
                  item.damages[0] &&
                  claim.status !== ClaimStatus.NOT_SUBMITTED &&
                  item.damages[0].status && (
                    <Tag color={DamageSatusToUI[item.damages[0].status].color}>
                      {DamageSatusToUI[item.damages[0].status].text}
                    </Tag>
                  )}
              </Box>
            </Col>
            <Col col={2} sm={1}>
              <Section.Action icon="arrow-down" />
            </Col>
          </Row>
        </GridThemeProvider>
      </Section.Header>
      <Section.Body>
        <Box>
          <Row>
            {manufacturer && (
              <Col md={2}>
                <FieldBlock name="Manufacturer" value={manufacturer?.name} />
              </Col>
            )}
            <Col md={2}>
              <FieldBlock name="Color" value={color?.name} />
            </Col>
            <Col md={2}>
              <FieldBlock name="Material" value={material?.name} />
            </Col>
            <Col md={2}>
              <FieldBlock name="Vendor" value={item.vendor} />
            </Col>
            <Col md={4}>
              <FieldBlock name="Description" value={item.itemDescription} />
            </Col>
          </Row>
        </Box>
        {item.damages?.length > 0 && <Hr color="gray500" />}
        {item.damages?.map((damage: DamageType, idx) => (
          <Damage key={idx} idx={idx} item={damage} claim={claim} />
        ))}
      </Section.Body>
    </Section>
  );
};
