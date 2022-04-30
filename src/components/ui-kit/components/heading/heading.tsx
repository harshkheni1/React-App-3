import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { HeadingProps } from './types';
import { HeadingStyled } from './heading.styled';

export const Heading: FC<HeadingProps> & WithStyle = ({
  color,
  fontWeight,
  letterSpacing,
  fontSize,
  fontFamily,
  display,
  children,
  ...rest
}) => {
  return (
    <HeadingStyled
      $color={color}
      $fontWeight={fontWeight}
      $letterSpacing={letterSpacing}
      $fontSize={fontSize}
      $fontFamily={fontFamily}
      $display={display}
      {...rest}
    >
      {children}
    </HeadingStyled>
  );
};

Heading.defaultProps = {
  as: 'h1',
  fontWeight: 'bold',
  color: 'gray800',
};

Heading.displayName = 'Heading';
Heading.Style = HeadingStyled;
