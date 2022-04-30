import { styled } from '../../utils';
import { spacingStyle, combineStyle, Colors } from '../../const';
import { CardProps, CardElementProps, CardFooterProps } from './types';

export const CardStyled = styled('a')<CardProps>`
  display: block;
  text-decoration: none;
  cursor: ${({ as }) => (as === 'a' ? 'pointer' : 'default')};
  ${(props) => spacingStyle(props)}
`;

export const CardHeaderStyled = styled('header')<CardElementProps>``;
export const CardBodyStyled = styled('div')<CardElementProps>`
  ${(props) => combineStyle(props)}
`;
export const CardFooterStyled = styled('footer')<CardElementProps & CardFooterProps>`
  line-height: 24px;
  ${({ borderColor }) => borderColor && `border-top: 1px solid ${Colors[borderColor]};`}
  ${(props) => combineStyle(props)}
  &,
  * {
    vertical-align: text-bottom;
  }
`;
