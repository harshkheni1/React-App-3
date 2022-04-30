import { FC } from 'react';
import { SpacingProps, BgHelper, DisplayHelper } from '../../const';
import { HtmlProps, WithStyle } from '../../utils';

export interface InputGroupProps extends HtmlProps<HTMLDivElement>, SpacingProps {
  as?: any;
}
export interface InputGroupElementProps extends HtmlProps<HTMLDivElement>, BgHelper, DisplayHelper {}
export interface InputGroupStaticProps {
  Addon?: FC<InputGroupElementProps> & WithStyle;
  Text?: FC<InputGroupElementProps> & WithStyle;
  Block?: FC<InputGroupElementProps> & WithStyle;
}
