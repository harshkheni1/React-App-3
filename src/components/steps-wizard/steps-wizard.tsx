import React from 'react';
import { useRouter } from 'next/router';

import {
  Box,
  FormGroup,
  Button,
  Container,
  Row,
  Col,
  Text,
  Heading,
  Icon,
  styled,
  GridBreakpointsMediaDown,
  Tooltip,
} from '@/ui-kit';
import { StepsWizardWrapStyled, StepsWizardInnerStyled, StepsWizardHeaderStyled } from './steps-wizard.styled';
import { getAsNumber } from '../../service/helpers';
import { StepInterface, StepButtonInterface } from './types';
import { FileClaimSteps } from './sections/claim/types';

export interface StepsWizardProps {
  steps: StepInterface[];
  nextButton: StepButtonInterface;
  backButton: StepButtonInterface;
  title: string;
  onClick?: (event) => void;
  errorSteps?: unknown;
}

const ButtonControlStyled = styled(Button)`
  ${GridBreakpointsMediaDown.md} {
    border-radius: 8px;
    width: 53px;
    height: 58px;
  }
`;

export const StepsWizard: React.FC<StepsWizardProps> = ({
  steps,
  nextButton,
  backButton,
  title,
  onClick,
  errorSteps,
}) => {
  const stepId = getAsNumber(useRouter().query.step, 1);
  const defaultStep = stepId >= 1 && stepId <= steps.length ? stepId - 1 : 0;
  return (
    <StepsWizardWrapStyled onClick={onClick}>
      {steps.map((step, idx) => {
        const isDefaultStep = idx === defaultStep;
        const isLastStep = steps.length - 1 !== idx;
        const nextStep: StepInterface = steps[idx + 1];
        const previousStep: StepInterface = steps[idx - 1];

        return (
          <FormGroup key={step.name} defaultActive={isDefaultStep} name={step.name} renderOnActive={true}>
            <StepsWizardHeaderStyled>
              <Container>
                <Row alignItems="center">
                  <Col col={3} md={2.5} lg={2}>
                    <ButtonControlStyled
                      onClick={() => backButton.onClick(previousStep?.name)}
                      fullWidth
                      color="gray800"
                      measure="md"
                      type="button"
                      uppercase={false}
                      variant="outlined"
                    >
                      <Box as="span" display={{ xs: 'none', md: 'inline-block' }}>
                        {idx > 1 ? 'Go Back' : 'Cancel'}
                      </Box>
                      <Icon name="angle-left" measure={14} display={{ xs: 'inline-block', md: 'none' }} />
                    </ButtonControlStyled>
                  </Col>
                  <Col col={6} md={7} lg={8}>
                    <Text measure="xs" mt={0} mb={10} align="center">
                      {title}
                    </Text>
                    <Heading fontSize={{ xs: 14, md: 22 }} fontWeight="sbold" m={[0]} align="center">
                      Step {idx + 1} of {steps.length}: {step.name}
                    </Heading>
                    {errorSteps && errorSteps[stepId] && (
                      <Text color="danger" measure="md" mt={0} mb={18} align="center">
                        {errorSteps[stepId]}
                      </Text>
                    )}
                  </Col>
                  <Col col={3} md={2.5} lg={2}>
                    {!nextButton.isDisabled(step.name) && step.name === FileClaimSteps.ADD_CLAIM_ITEMS_DETAILS ? (
                      <Tooltip
                        direction="right"
                        content={'To add more items, click the "Go Back" button at the top of the screen.'}
                      >
                        <ButtonControlStyled
                          fullWidth
                          color="primaryDark"
                          onClick={() => {
                            if (isLastStep && !nextButton.isDisabled(step.name)) {
                              nextButton.onClick(nextStep.name);
                              if (typeof window !== 'undefined') {
                                window.scrollTo(0, 0);
                              }
                            }
                          }}
                          disabled={(() => nextButton.isDisabled(step.name))()}
                          measure="md"
                          type={isLastStep ? 'button' : 'submit'}
                          uppercase={false}
                          variant="solid"
                          style={{ float: 'right' }}
                        >
                          <Icon name="angle-right" measure={14} display={{ xs: 'inline-block', md: 'none' }} />
                          <Box as="span" display={{ xs: 'none', md: 'inline-block' }}>
                            {step.nextButtonText || 'Next'}
                          </Box>
                        </ButtonControlStyled>
                      </Tooltip>
                    ) : (
                      <ButtonControlStyled
                        fullWidth
                        color="primaryDark"
                        onClick={() => {
                          if (isLastStep && !nextButton.isDisabled(step.name)) {
                            nextButton.onClick(nextStep.name);
                            if (typeof window !== 'undefined') {
                              window.scrollTo(0, 0);
                            }
                          }
                        }}
                        disabled={(() => nextButton.isDisabled(step.name))()}
                        measure="md"
                        type={isLastStep ? 'button' : 'submit'}
                        uppercase={false}
                        variant="solid"
                        style={{ float: 'right' }}
                      >
                        <Icon name="angle-right" measure={14} display={{ xs: 'inline-block', md: 'none' }} />
                        <Box as="span" display={{ xs: 'none', md: 'inline-block' }}>
                          {step.nextButtonText || 'Next'}
                        </Box>
                      </ButtonControlStyled>
                    )}
                  </Col>
                </Row>
              </Container>
            </StepsWizardHeaderStyled>
            <Box p={{ xs: [0], lg: [20, 0] }}>
              <Container>
                <StepsWizardInnerStyled>{step.component}</StepsWizardInnerStyled>
              </Container>
            </Box>
          </FormGroup>
        );
      })}
    </StepsWizardWrapStyled>
  );
};
