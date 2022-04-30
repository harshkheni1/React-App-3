import React from 'react';
import { styled } from '../../utils';
import { uppercase, lineThrough, underline } from '../../utils/style';
import { LinkProps } from './types';
import {
  spacingStyle,
  Colors,
  TextSize,
  alignHelperStyle,
  fontWeightHelperStyle,
  fontFamilyHelperStyle,
  textDecorationHelperStyle,
} from '../../const';

export const AStyled = styled('a')<LinkProps>`
  font-size: ${({ measure }) => TextSize[measure]};
  ${(props) => props.lineHeight && `line-height: ${props.lineHeight}px`};
  ${(props) => props.letterSpacing && `letter-spacing: ${props.letterSpacing}px`};
  color: ${({ color }) => Colors[color]};
  ${(props) => props.uppercase && uppercase()};
  ${(props) => props.lineThrough && lineThrough()};
  ${(props) => props.underline && underline()};
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    ${(props) => props.underline && 'text-decoration: none !important;'};
    ${(props) => props.hoverColor && `color: ${Colors[props.hoverColor]};`};
  }
  &:focus {
    color: ${Colors.focus};
    outline: none;
  }
  ${(props) => spacingStyle(props)}
  ${({ align }) => align && alignHelperStyle(align)}
  ${({ textDecoration }) => textDecoration && textDecorationHelperStyle(textDecoration)}
  ${({ fontWeight }) => fontWeight && fontWeightHelperStyle(fontWeight)}
  ${({ fontFamily }) => fontFamily && fontFamilyHelperStyle(fontFamily)}
`;
