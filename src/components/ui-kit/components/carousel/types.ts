import { FC } from 'react';
import { HtmlProps, WithStyle } from '../../utils';
import { SpacingProps } from '../../const';

export interface CarouselImgProps extends HtmlProps<HTMLDivElement>, SpacingProps {
  current?: number;
  count?: number;
}

export interface CarouselControlProps extends Omit<HtmlProps<HTMLButtonElement>, 'type'> {
  disabled?: boolean;
  position: 'left' | 'right';
}

export interface CarouselThumbProps extends HtmlProps<HTMLAnchorElement>, SpacingProps {
  active?: boolean;
}

export interface CarouselStaticProps {
  Img?: FC<CarouselImgProps> & WithStyle;
  Control?: FC<CarouselControlProps> & WithStyle;
  Thumb?: FC<CarouselThumbProps> & WithStyle;
}
