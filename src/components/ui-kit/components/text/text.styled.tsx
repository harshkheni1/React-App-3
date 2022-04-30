import { styled, uppercase, capitalize, lineThrough } from '../../utils';
import {
  alignHelperStyle,
  floatHelperStyle,
  fontFamilyHelperStyle,
  fontWeightHelperStyle,
  GridBreakpointsArrayType,
  spacingStyle,
  TextSizeType,
  map,
  displayHelperStyle,
} from '../../const';
import { TextStyledAttrProps } from './types';
import { Colors, TextSize } from '../../const';

const fontSize = (measure: TextSizeType | { [key in GridBreakpointsArrayType]?: TextSizeType }) =>
  map(measure, (s) => `font-size: ${TextSize[s]};`);

export const TextStyled = styled('div')<TextStyledAttrProps>`
  ${({ measure }) => measure && fontSize(measure)}
  ${(props) => props.lineHeight && `line-height: ${props.lineHeight}px`};
  ${(props) => props.$letterSpacing && `letter-spacing: ${props.$letterSpacing}px`};
  ${(props) => props.breakAll && `word-break: break-all`};
  color: ${({ $color }) => Colors[$color]};
  ${(props) => props.capitalize && capitalize()};
  ${(props) => props.uppercase && uppercase()};
  ${(props) => props.lineThrough && lineThrough()};
  ${(props) => spacingStyle(props)}
  ${({ align }) => align && alignHelperStyle(align)}
  ${({ float }) => float && floatHelperStyle(float)}
  ${({ $fontWeight }) => $fontWeight && fontWeightHelperStyle($fontWeight)}
  ${({ fontFamily }) => fontFamily && fontFamilyHelperStyle(fontFamily)}
  ${({ display }) => display && displayHelperStyle(display)}
  @media (max-width:767px) {
    margin-left: 0px;
    width: 100%;
    display: block;
    letter-spacing: 0px;
    
  }
`;
