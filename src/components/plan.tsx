import React from 'react';
import {
  Box,
  Img,
  Button,
  Text,
  Hr,
  Section,
  Row,
  Col,
  Icon,
  A,
  FormRadioHiddenRawStyled,
  styled,
  SectionHeaderStyled,
  Colors,
  BoxStyled,
  FormRadioGroupItem,
  FormErrorStyled,
} from '@/ui-kit';
import moment from 'moment';

import { Plan as PlanType, PlanStatus } from '@/core-types/plan';
import FieldBlock from './field-block';
import PlanImgStub from '../images/plan-placeholder.png';
import { ModalContainerStyled } from '@/components/modal-content.styled';
import { Claim as ClaimType, ClaimStatus } from '@/core-types/claim';

const PlanWarrantyItemGroupStyled = styled('div')`
  ${FormErrorStyled} {
    display: block;
    width: 100%;
    padding: 15px;
  }
`;

export const PlanWarrantyItemStyled = styled('div')`
  padding: 15px;
  margin: 10px 0px 10px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  background: ${Colors.white};
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

interface PlanProps {
  plan: PlanType;
  claims?: ClaimType[];
  isRadio?: boolean;
  isExpanded?: boolean;
  onVeiwClaimHandler?: () => void;
  onFileClaimHandler?: () => void;
}

export const Smallinmob = styled('span')`
  @media (max-width: 767px) {
    font-size: 14px !important;
  }
`;
export const PlanItemStyled = styled('label')`
  cursor: pointer;

  ${FormRadioHiddenRawStyled} {
    background: red;
    ~ ${SectionHeaderStyled} > ${BoxStyled}:first-child {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      padding-left: 52px !important;
      position: relative;

      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 15px;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        border: 1px solid ${Colors.primary};
        background: ${Colors.white};
        transition: 0.3s;
      }

      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 19px;
        width: 12px;
        height: 12px;
        background: ${Colors.primary};
        z-index: 1;
        border-radius: 100%;
        opacity: 0;
      }
    }

    &:checked {
      ~ ${SectionHeaderStyled} {
        > ${BoxStyled}:first-child {
          background: ${Colors.gray200};
          &::after {
            opacity: 1;
          }
        }
      }
    }
  }
`;

export const Plan: React.FC<PlanProps> = ({
  plan,
  claims,
  onVeiwClaimHandler,
  onFileClaimHandler,
  isRadio = false,
  isExpanded = true,
}) => {
  const isExpired = plan.planStatus === PlanStatus.INACTIVE;
  const claimsLinked =
    claims?.filter(
      (claim: ClaimType) =>
        claim.warrantyId === plan.id && [ClaimStatus.OPEN, ClaimStatus.CLOSE].includes(claim.status),
    ) ?? [];

  const fileClaimButtonCore = (
    <Button
      variant="outlined"
      color="gray800"
      uppercase={false}
      measure="sm"
      fullWidth
      disabled={isExpired}
      onClick={() => {
        if (!isExpired && onFileClaimHandler) {
          onFileClaimHandler();
        }
      }}
    >
      File a claim
    </Button>
  );
  const content = (
    <Section collapsable expanded={isExpanded}>
      {isRadio && <FormRadioGroupItem value={plan.id} />}
      <Section.Header>
        <Box p={[10, 15, 10, 15]}>
          <Row alignItems="center">
            <Col md={isRadio ? 8 : 5} sm={8}>
              <Text measure="lg" fontWeight="sbold" uppercase m={[0]} letterSpacing={2}>
                <Smallinmob>{plan.title || plan.programName}</Smallinmob>
              </Text>
            </Col>
            <Col sm={4}>
              {isExpired ? (
                <Text measure="sm" color="primary" fontWeight="bold" align={{ xs: 'left', sm: 'right' }}>
                  <Icon measure={10} name="warning" color="danger" /> Expired{' '}
                  {moment(plan.expirationDate).format('MMMM Do, YYYY')}
                </Text>
              ) : (
                plan.expirationDate && (
                  <Text measure="sm" color="success" fontWeight="bold" align={{ xs: 'left', sm: 'right' }}>
                    <Icon measure={10} name="check" color="success" /> Active until{' '}
                    {moment(plan.expirationDate).format('MMMM Do, YYYY')}
                  </Text>
                )
              )}
            </Col>
            {!isRadio && <Col md={3}>{fileClaimButtonCore}</Col>}
          </Row>
        </Box>
        <Hr color="gray500" m={[0]} />
        <Box p={[10, 10, 10, 15]}>
          <Row>
            <Col lg={2} sm={4}>
              <Box mb={15}>
                <Img src={plan.dealerLogoUrl || PlanImgStub} fullWidth alt={plan.dealerName} />
              </Box>
            </Col>
            <Col lg={10} sm={4}>
              <Row>
                <Col lg={2.8} sm={8}>
                  <FieldBlock name="Store" value={plan.store ? plan.store : 'Not available'} />
                </Col>
                <Col lg={3} md={4} col={12}>
                  <FieldBlock
                    name="Purchase Date"
                    value={plan.purchaseDate ? moment(plan.purchaseDate).format('MMMM Do, YYYY') : 'Not available'}
                  />
                </Col>
                <Col lg={3} md={4} col={12}>
                  <FieldBlock
                    name="Delivery Date"
                    value={plan.deliveryDate ? moment(plan.deliveryDate).format('MMMM Do, YYYY') : 'Not available'}
                  />
                </Col>
                <Col lg={3} md={4} col={12}>
                  <FieldBlock name="Total Purchase Price" value={`$${plan.totalPrice.toFixed(2)}`} />
                </Col>
              </Row>
              <Row>
                <Col lg={3} md={4} col={12}>
                  <FieldBlock
                    name="Contract Holder"
                    value={plan.contractHolder ? plan.contractHolder : 'Not available'}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Box>
        <Box bg="gray200" p={[15, 15, 15]}>
          <Row>
            <Col lg={2.4} md={4} col={6}>
              <FieldBlock name="Plan Number" value={plan.number} />
            </Col>
            <Col lg={2.4} md={4} col={6}>
              <FieldBlock name="Protection Plan Price" value={`$${plan.warrantyProgramPrice.toFixed(2)}`} />
            </Col>
            <Col lg={2} md={4} col={6}>
              <FieldBlock name="Invoice" value={plan.invoiceId} />
            </Col>
            <Col lg={2} md={4} col={6}>
              {plan.pdfLink ? (
                <Box mb={10}>
                  <Text measure="sm" fontWeight="sbold" m={[0, 0, 10]}>
                    Terms &amp; Conditions:
                  </Text>
                  <A href={plan.pdfLink} target="_blank" color="primaryLight" download measure="sm">
                    View PDF
                  </A>
                </Box>
              ) : (
                <FieldBlock name="Terms &amp; Conditions" value="Not available" />
              )}
            </Col>
            {claimsLinked.length > 0 && (
              <Col lg={3} md={4} col={6}>
                <Box mb={10}>
                  <Text measure="sm" fontWeight="sbold" m={[0, 0, 10]}>
                    Claims Filed:
                  </Text>
                  <A src="#3" color="primaryLight" measure="sm" onClick={onVeiwClaimHandler}>
                    View Claims ({claimsLinked.length})
                  </A>
                </Box>
              </Col>
            )}
          </Row>
        </Box>
      </Section.Header>
      <Section.Body pb={0}>
        <Box p={[0, 20, 10, 20]}>
          <Text uppercase as="p" measure="xxs" color="gray800" letterSpacing={2}>
            Items in plan: {plan.warrantyItems.length}
          </Text>
          <PlanWarrantyItemGroupStyled>
            <Row>
              {plan.warrantyItems?.map((item) => (
                <Col md={6} key={item.trackKey}>
                  <PlanWarrantyItemStyled>
                    <Col col={7} sm={7} lg={7}>
                      <Row>
                        <Text as="span" fontWeight="sbold">
                          {item.type.name}
                        </Text>
                      </Row>
                      <Row>
                        {item.itemDescription && (
                          <Text as="span">
                            <Text as="span" color="gray700" measure="sm">
                              {/* {'Description: '} */}
                            </Text>
                            <Text as="span" measure="sm">
                              {item.itemDescription}
                            </Text>
                          </Text>
                        )}
                      </Row>
                    </Col>
                    <Col col={5} sm={5} lg={5}>
                      <Row>
                        {item.sku && (
                          <Text as="span">
                            <Text as="span" color="gray700" measure="sm">
                              {'Sku: '}
                            </Text>
                            <Text as="b" measure="sm">
                              {item.sku}
                            </Text>
                          </Text>
                        )}
                      </Row>
                      <Row>
                        {item.vendor && (
                          <Text as="span">
                            <Text as="span" color="gray700" measure="sm">
                              {'Vendor: '}
                            </Text>
                            <Text as="b" measure="sm">
                              {item.vendor}
                            </Text>
                          </Text>
                        )}
                      </Row>
                    </Col>
                  </PlanWarrantyItemStyled>
                </Col>
              ))}
            </Row>
          </PlanWarrantyItemGroupStyled>
        </Box>
      </Section.Body>
      <Section.Action text="warranty items" tooltip={'Click here to show (or hide) the items under your contract.'} />
    </Section>
  );

  return (
    <ModalContainerStyled mb={20}>
      {isRadio ? <PlanItemStyled>{content}</PlanItemStyled> : content}
    </ModalContainerStyled>
  );
};
