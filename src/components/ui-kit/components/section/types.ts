import React from 'react';
import { WithStyle } from '../../utils';
import { SpacingProps } from '../../const/helpers';
import { IconArrayType } from '../icon';

export interface SectionProps extends SpacingProps {
  children?: any;
  collapsable?: boolean;
  expanded?: boolean;
}

export interface SectionHeaderProps {
  children?: any;
  clickable?: boolean;
}

export interface SectionTitleProps {
  children?: any;
}

export interface SectionActionProps {
  children?: any;
  icon?: IconArrayType;
  text?: string;
  tooltip?: string;
}

export interface SectionBodyProps extends SpacingProps {
  children?: any;
}

export interface SectionStaticProps {
  Header?: React.FC<SectionHeaderProps> & WithStyle;
  Title?: React.FC<SectionTitleProps> & WithStyle;
  Action?: React.FC<SectionActionProps> & WithStyle;
  Body?: React.FC<SectionBodyProps> & WithStyle;
}
