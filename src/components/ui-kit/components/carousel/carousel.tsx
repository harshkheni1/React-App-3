import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { CarouselImgProps, CarouselControlProps, CarouselThumbProps, CarouselStaticProps } from './types';
import { CarouselImgStyled, CarouselControlStyled, CarouselThumbStyled, CounterStyled } from './carousel.styled';

export const Carousel: FC<any> & CarouselStaticProps & WithStyle = () => <div />;

export const CarouselImg: FC<CarouselImgProps> & WithStyle = (props) => {
  const { children, current, count } = props;
  return (
    <CarouselImgStyled>
      {children}
      <CounterStyled>
        {current}/{count}
      </CounterStyled>
    </CarouselImgStyled>
  );
};

export const CarouselControl: FC<CarouselControlProps> & WithStyle = (props) => {
  const { children, ...rest } = props;
  return (
    <CarouselControlStyled {...rest} type="button">
      {children}
    </CarouselControlStyled>
  );
};

export const CarouselThumb: FC<CarouselThumbProps> & WithStyle = (props) => {
  const { children, ...rest } = props;
  return <CarouselThumbStyled {...rest}>{children}</CarouselThumbStyled>;
};

Carousel.Img = CarouselImg;
CarouselImg.displayName = 'Carousel.Img';
CarouselImg.Style = CarouselImgStyled;

Carousel.Control = CarouselControl;
CarouselControl.displayName = 'Carousel.Control';
CarouselControl.Style = CarouselControlStyled;

Carousel.Thumb = CarouselThumb;
CarouselThumb.displayName = 'Carousel.Thumb';
CarouselThumb.Style = CarouselThumbStyled;
