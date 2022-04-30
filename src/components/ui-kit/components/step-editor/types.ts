import React from 'react';
import { HtmlProps, WithStyle } from '../../utils/types';
import { SpacingProps } from '../../const/helpers';

export interface StepEditorProps extends HtmlProps<HTMLDivElement>, SpacingProps {
  title: string;
  children: any;
}

export interface StepEditorItemProps extends HtmlProps<HTMLDivElement> {
  /** show only on desktop view **/
  title: string;
  /** show only on desktop view into title if item disabled **/
  counter: number;
  /** show 'step(current)' only on desktop view into title if item disabled and current **/
  current?: boolean;
  /** on desktop it make it disabled and on mobile item disappeared **/
  disabled?: boolean;
  onClick?: () => void;
}

export interface StepEditorStaticProps {
  Item?: React.FC<StepEditorItemProps> & WithStyle;
}
