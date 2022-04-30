import React, { Fragment } from 'react';

import { Plan } from '@/core-types/plan';
import { ModalContainerStyled } from '@/components/modal-content.styled';
import { Row, Col, Text, Img, Box } from '@/components/ui-kit';

import PlanImgStub from '@/images/plan-placeholder.png';

interface PlanHeaderProps {
  plan: Plan;
}

const PlanHeader: React.FC<PlanHeaderProps> = ({ plan }) => {
  const { title, dealerName, number } = plan ?? {};
  return (
    <Fragment>
      {plan && (
        <ModalContainerStyled p={[16]}>
          <Row alignItems="center">
            <Col md={7}>
              <Box display="flex" alignItems="center" style={{ width: '100%' }}>
                <Img src={PlanImgStub} height={54} alt={dealerName} />
                <Text as="span" fontWeight="sbold" measure="lg" uppercase letterSpacing={2} ml={10}>
                  {title || dealerName}
                </Text>
              </Box>
            </Col>
            <Col md={5}>
              <Text
                as="em"
                fontWeight="bold"
                measure="sm"
                color="gray700"
                display="block"
                align={{ xs: 'left', md: 'right' }}
                mt={{ xs: 20, md: 0 }}
              >
                Plan#: {number}
              </Text>
            </Col>
          </Row>
        </ModalContainerStyled>
      )}
    </Fragment>
  );
};

export default PlanHeader;
