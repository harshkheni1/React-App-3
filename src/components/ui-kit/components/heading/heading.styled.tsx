import { css, styled, uppercase, lineThrough } from '../../utils';
import { HeadingStyledAttrProps } from './types';
import {
  alignHelperStyle,
  Colors,
  displayHelperStyle,
  fontFamilyHelperStyle,
  fontWeightHelperStyle,
  GridBreakpointsArrayType,
  map,
  spacingStyle,
} from '../../const';
import { HeadingSize, HeadingTagType, HeadingSizeType } from './const';

const measureSize = (measure: HeadingSizeType | { [key in GridBreakpointsArrayType]?: HeadingSizeType }) =>
  map(measure, (s) => `font-size: ${HeadingSize[s]};`);

const fontsSize = (size: number | { [key in GridBreakpointsArrayType]?: number }) =>
  map(size, (s) => `font-size: ${s}px;`);

const tagStyle = (tag: HeadingTagType) => css`
  font-size: ${HeadingSize[tag]};
`;

export const HeadingStyled = styled('h1')<HeadingStyledAttrProps>`
  ${(props) =>
    props.$fontSize ? fontsSize(props.$fontSize) : (props.measure && measureSize(props.measure)) || tagStyle(props.as)};
  color: ${({ $color }) => Colors[$color]};
  ${(props) => props.lineHeight && `line-height: ${props.lineHeight}px`};
  ${(props) => props.$letterSpacing && `letter-spacing: ${props.$letterSpacing}px`};
  ${(props) => props.uppercase && uppercase()};
  ${(props) => props.lineThrough && lineThrough()};
  margin: 0;
  padding: 0;
  ${(props) => spacingStyle(props)}
  ${({ align }) => align && alignHelperStyle(align)}
  ${({ $fontWeight }) => $fontWeight && fontWeightHelperStyle($fontWeight)}
  ${({ $fontFamily }) => $fontFamily && fontFamilyHelperStyle($fontFamily)}
  ${({ $display }) => $display && displayHelperStyle($display)}
`;
