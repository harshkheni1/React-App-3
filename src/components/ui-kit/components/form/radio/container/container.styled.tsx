import { styled } from '../../../../utils';
import { SpacingProps, spacingStyle } from '../../../../const/helpers';
import { FormRadioContainerProps } from '../types';

export const FormRadioContainerStyled = styled('label')<FormRadioContainerProps & SpacingProps>`
  position: relative;
  display: block;
  ${(props) => spacingStyle(props)}
  ${({ block }) => block && 'flex: 1;'}
`;
