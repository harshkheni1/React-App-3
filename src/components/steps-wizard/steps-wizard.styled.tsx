import { styled, Colors } from '@/ui-kit';

export const StepsWizardWrapStyled = styled('div')`
  position: relative;
  box-sizing: border-box;
`;

export const StepsWizardInnerStyled = styled('div')`
  padding: 24px 0;
`;

export const StepsWizardSeparatorWrapStyled = styled('div')`
  position: relative;
  &:after {
    position: absolute;
    content: '';
    top: 24px;
    bottom: 24px;
    left: 50%;
    border-right: 1px solid ${Colors.secondary};
  }
`;

export const StepsWizardHeaderStyled = styled('header')`
  position: sticky;
  background-color: ${Colors.white};
  padding: 15px 0;
  z-index: 2;
  top: 70px;
`;
