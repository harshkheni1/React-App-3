import { FC } from 'react';
import { HtmlProps, WithStyle } from '../../utils';
import { ModalVerticalType } from './const';
import { AlignHelper, BgHelper, SpacingProps } from '../../const/helpers';

export interface MediaElementProps extends SpacingProps, AlignHelper {
  vertical?: ModalVerticalType;
}

export interface MediaProps extends HtmlProps<HTMLLinkElement>, SpacingProps, BgHelper {
  as?: any;
}

export interface MediaAsideProps extends HtmlProps<HTMLDivElement>, MediaElementProps {
  width?: number;
}

export interface MediaBodyProps extends HtmlProps<HTMLDivElement>, MediaElementProps {}

export interface MediaStaticProps {
  Body: FC<MediaBodyProps> & WithStyle;
  Aside: FC<MediaAsideProps> & WithStyle;
}
