import { FC } from 'react';
import { HtmlProps, WithStyle } from '../../utils';
import { SpacingProps } from '../../const';

export type PanelElementProps = HtmlProps<HTMLDivElement>;

export interface PanelProps extends PanelElementProps, SpacingProps {
  as?: any;
}

export interface PanelStaticProps {
  Header?: FC<PanelElementProps> & WithStyle;
  Title?: FC<PanelElementProps> & WithStyle;
  Body?: FC<PanelElementProps> & WithStyle;
  Footer?: FC<PanelElementProps> & WithStyle;
}
