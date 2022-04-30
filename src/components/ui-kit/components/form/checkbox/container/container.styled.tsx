import { spacingStyle } from '../../../../const';
import { styled } from '../../../../utils';
import { FormCheckboxContainerStyledAttrProps } from '../types';

export const FormCheckboxContainerStyled = styled('label')<FormCheckboxContainerStyledAttrProps>`
  position: relative;
  min-height: 20px;
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  ${(props) => spacingStyle(props)}
`;
