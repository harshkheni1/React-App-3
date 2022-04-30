import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { TextProps } from './types';
import { TextStyled } from './text.styled';

export const Text: FC<TextProps> & WithStyle = ({ color, fontWeight, letterSpacing, children, ...rest }) => {
  return (
    <TextStyled $color={color} $fontWeight={fontWeight} $letterSpacing={letterSpacing} {...rest}>
      {children}
    </TextStyled>
  );
};

Text.defaultProps = {
  as: 'p',
  color: 'gray800',
  measure: 'md',
};

Text.displayName = 'Text';
Text.Style = TextStyled;
