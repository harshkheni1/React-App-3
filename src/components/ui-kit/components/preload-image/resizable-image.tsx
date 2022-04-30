import React from 'react';
import { ImageProps, Size, isImageEntity } from './types';

export const ResizableImage: React.FC<ImageProps> = ({
  src = 'https://screenshotlayer.com/images/assets/placeholder.png',
  size,
  alt,
  width,
  className,
}) => {
  let source: string;
  if (isImageEntity(src)) {
    source = src.url;
    if (size) {
      const sizes: Array<Size> = ['lg', 'md', 'sm'];
      const getSize = (size: Size): any => {
        if (src.thumbnails[size]) {
          return src.thumbnails[size];
        } else {
          const i = sizes.indexOf(size);
          const newSize = sizes[i - 1];
          if (!newSize) {
            return src.url;
          }
          return getSize(newSize);
        }
      };
      source = getSize(size);
    }
  } else {
    source = src;
  }

  return <img src={source} alt={alt} className={className ? className : undefined} width={width ? width : undefined} />;
};
