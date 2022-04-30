import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { MediaProps, MediaStaticProps, MediaBodyProps, MediaAsideProps } from './types';
import { MediaStyled, MediaBodyStyled, MediaAsideStyled } from './media.styled';

export const Media: FC<MediaProps> & MediaStaticProps & WithStyle = (props) => {
  const { children, ...rest } = props;
  return <MediaStyled {...rest}>{children}</MediaStyled>;
};

Media.defaultProps = {
  as: 'div',
};

export const MediaBody: FC<MediaBodyProps> & WithStyle = (props) => {
  const { children, ...rest } = props;
  return <MediaBodyStyled {...rest}>{children}</MediaBodyStyled>;
};

export const MediaAside: FC<MediaAsideProps> & WithStyle = (props) => {
  const { children, ...rest } = props;
  return <MediaAsideStyled {...rest}>{children}</MediaAsideStyled>;
};

MediaBody.defaultProps = {
  vertical: 'flex-start',
};
MediaAside.defaultProps = {
  vertical: 'flex-start',
};

MediaBody.displayName = 'Media.Body';
MediaAside.displayName = 'Media.Aside';

Media.Body = MediaBody;
Media.Body.Style = MediaBodyStyled;
Media.Aside = MediaAside;
Media.Aside.Style = MediaAsideStyled;
