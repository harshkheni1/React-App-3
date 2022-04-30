import { FC } from 'react';
import { HtmlProps, WithStyle } from '../../utils';
import { ColorType, CombineHelper, SpacingProps } from '../../const';

export interface CardProps extends HtmlProps<HTMLLinkElement>, SpacingProps {
  as?: any;
}

export interface CardElementProps extends HtmlProps<HTMLDivElement>, CombineHelper {}

export interface CardFooterProps {
  borderColor?: ColorType;
}

export interface CardStaticProps {
  Header?: FC<CardElementProps> & WithStyle;
  Body?: FC<CardElementProps> & WithStyle;
  Footer?: FC<CardElementProps & CardFooterProps> & WithStyle;
}
