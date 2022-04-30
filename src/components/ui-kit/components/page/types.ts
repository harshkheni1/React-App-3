import { FC } from 'react';
import { HtmlProps, WithStyle } from '../../utils';
import { BgHelper, SpacingProps } from '../../const';

export interface PageProps extends HtmlProps<HTMLDivElement>, BgHelper, SpacingProps {}

export interface PageErrorProps extends HtmlProps<HTMLDivElement> {
  code: number;
  title: string;
  img: string;
  text: string;
  link: any;
}

export interface PageStaticProps {
  Error?: FC<PageErrorProps> & WithStyle;
}
