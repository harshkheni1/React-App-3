import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { PanelProps, PanelStaticProps, PanelElementProps } from './types';
import { PanelStyled, PanelHeaderStyled, PanelTitleStyled, PanelBodyStyled, PanelFooterStyled } from './panel.styled';

export const Panel: FC<PanelProps> & PanelStaticProps & WithStyle = ({ children, ...rest }) => {
  return <PanelStyled {...rest}>{children}</PanelStyled>;
};

export const PanelHeader: FC<PanelElementProps> & WithStyle = ({ children }) => {
  return <PanelHeaderStyled>{children}</PanelHeaderStyled>;
};

export const PanelTitle: FC<PanelElementProps> & WithStyle = ({ children }) => {
  return <PanelTitleStyled>{children}</PanelTitleStyled>;
};

export const PanelBody: FC<PanelElementProps> & WithStyle = ({ children }) => {
  return <PanelBodyStyled>{children}</PanelBodyStyled>;
};

export const PanelFooter: FC<PanelElementProps> & WithStyle = ({ children }) => {
  return <PanelFooterStyled>{children}</PanelFooterStyled>;
};

Panel.Header = PanelHeader;
Panel.Header.Style = PanelHeaderStyled;

Panel.Title = PanelTitle;
Panel.Title.Style = PanelTitleStyled;

Panel.Body = PanelBody;
Panel.Body.Style = PanelBodyStyled;

Panel.Footer = PanelFooter;
Panel.Footer.Style = PanelFooterStyled;
