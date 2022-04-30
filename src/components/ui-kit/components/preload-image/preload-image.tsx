import React, { FC, Fragment } from 'react';
import { WithStyle } from '../../utils';
import { ResizableImage } from './resizable-image';
import { ImageProps } from './types';
import { PreloadImageStyled } from './preload-image.styled';

export const PreloadImage: FC<{ withoutText?: boolean } & ImageProps> & WithStyle = ({ withoutText, ...props }) => {
  return (
    <Fragment>
      <PreloadImageStyled withoutText={withoutText}>
        <div />
      </PreloadImageStyled>
      <ResizableImage {...props} />
    </Fragment>
  );
};

PreloadImage.defaultProps = {
  withoutText: false,
  src: 'https://screenshotlayer.com/images/assets/placeholder.png',
};

PreloadImage.displayName = 'PreloadImage';
PreloadImage.Style = PreloadImageStyled;
