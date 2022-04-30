import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { PageStyled } from './page.styled';
import { PageProps, PageStaticProps } from './types';
import { PageError, PageErrorStyled } from './error';

export const Page: FC<PageProps> & PageStaticProps & WithStyle = (props) => {
  const { children, ...rest } = props;
  return <PageStyled {...rest}>{children}</PageStyled>;
};

Page.displayName = 'Page';
Page.Style = PageStyled;

Page.Error = PageError;
Page.Error.Style = PageErrorStyled;
