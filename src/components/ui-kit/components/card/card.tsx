import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { CardProps, CardStaticProps, CardElementProps, CardFooterProps } from './types';
import { CardStyled, CardHeaderStyled, CardBodyStyled, CardFooterStyled } from './card.styled';

export const Card: FC<CardProps> & CardStaticProps & WithStyle = (props) => {
  const { children, ...rest } = props;
  return <CardStyled {...rest}>{children}</CardStyled>;
};

Card.defaultProps = {
  as: 'div',
};

export const CardHeader: FC<CardElementProps> & WithStyle = (props) => {
  const { children, ...rest } = props;
  return <CardHeaderStyled {...rest}>{children}</CardHeaderStyled>;
};

CardHeader.defaultProps = {
  p: [15],
};

export const CardBody: FC<CardElementProps> & WithStyle = (props) => {
  const { children, ...rest } = props;
  return <CardBodyStyled {...rest}>{children}</CardBodyStyled>;
};

CardBody.defaultProps = {
  p: [15],
};

export const CardFooter: FC<CardElementProps & CardFooterProps> & WithStyle = (props) => {
  const { children, ...rest } = props;
  return <CardFooterStyled {...rest}>{children}</CardFooterStyled>;
};

CardFooter.defaultProps = {
  p: [20, 15],
};

Card.displayName = 'Card';
Card.Style = CardStyled;

Card.Header = CardHeader;
CardHeader.displayName = 'Card.Header';
CardHeader.Style = CardHeaderStyled;

Card.Body = CardBody;
CardBody.displayName = 'Card.Body';
CardBody.Style = CardBodyStyled;

Card.Footer = CardFooter;
CardFooter.displayName = 'Card.Footer';
CardFooter.Style = CardFooterStyled;
