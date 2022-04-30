import { css, styled } from '../../utils';
import { FontFamilyValue, FontWeightValue, spacingStyle, fontWeightHelperStyle, alignHelperStyle } from '../../const';
import {
  ButtonVariantType,
  ButtonSizeType,
  ButtonSizeStyles,
  ButtonColorType,
  ButtonStates,
  ButtonStyles,
} from './const';
import { ButtonStyledAttrProps } from './types';

const buttonSize = (measure: ButtonSizeType, square: boolean) =>
  css`
    min-width: ${ButtonSizeStyles[measure].height}px;
    min-height: ${ButtonSizeStyles[measure].height}px;
    padding: ${ButtonSizeStyles[measure].paddingVertical}px
      ${square ? ButtonSizeStyles[measure].paddingVertical : ButtonSizeStyles[measure].paddingHorizontal}px;
    line-height: ${ButtonSizeStyles[measure].lineHeight}px;
    font-size: ${ButtonSizeStyles[measure].fontSize}px;
    letter-spacing: ${ButtonSizeStyles[measure].letterSpacing}px;
  `;

const buttonLink = css`
  line-height: 16px;
  padding: 0 !important;
  box-shadow: none !important;
  border: none;
`;

const buttonVariation = (variant: ButtonVariantType, color: ButtonColorType) =>
  ButtonStates.map(
    (item: string, index: number) => css`
      ${item} {
        background-color: ${ButtonStyles[variant][color].bg[index]};
        color: ${ButtonStyles[variant][color].color[index]};
        border-color: ${ButtonStyles[variant][color].border[index]};
        svg {
          fill: ${ButtonStyles[variant][color].color[index]};
          display: inline-block;
          vertical-align: ${variant == 'link' ? 'text-bottom' : 'middle'};
          * {
            fill: ${ButtonStyles[variant][color].color[index]};
            stroke: ${ButtonStyles[variant][color].color[index]};
          }
        }
      }
    `,
  );

export const ButtonStyled = styled('button')<ButtonStyledAttrProps>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  display: inline-block;
  border: 1px solid transparent;
  ${({ variant, $color }) => buttonVariation(variant, $color)};
  ${({ variant, measure, square }) => (variant !== 'link' ? buttonSize(measure, square) : buttonLink)};
  font-family: ${FontFamilyValue.primary};
  font-weight: ${FontWeightValue.sbold};
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
  border-radius: ${({ borderRadius }) => (borderRadius || borderRadius === 0 ? `${borderRadius}px` : '24.5px')};
  box-shadow: ${({ shade }) => (shade ? '0 1px 6px 0 #cfcde1' : 'none')};
  cursor: pointer;
  text-align: center;
  appearance: none !important;
  text-decoration: none;
  ${({ fontWeight }) => (fontWeight ? fontWeightHelperStyle(fontWeight) : '')}
  ${({ align }) => (align ? alignHelperStyle(align) : '')}
  &:disabled {
    cursor: not-allowed;
  }
  &:focus {
    outline: none;
  }
  ${(props) => spacingStyle(props)}
`;
