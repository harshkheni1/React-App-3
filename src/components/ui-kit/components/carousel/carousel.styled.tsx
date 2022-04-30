import { styled } from '../../utils';
import { Colors, spacingStyle, TextSize } from '../../const';
import { CarouselImgProps, CarouselControlProps, CarouselThumbProps } from './types';

export const CounterStyled = styled('div')<CarouselImgProps>`
  display: block;
  position: absolute;
  padding: 5px 21px;
  font-size: ${TextSize.sm};
  text-align: center;
  background: ${Colors.white};
  left: 50%;
  bottom: 15px;
  transform: translateX(-50%);
`;

export const CarouselImgStyled = styled('div')<CarouselImgProps>`
  display: block;
  position: relative;
`;

export const CarouselControlStyled = styled('button')<CarouselControlProps>`
  width: 64px;
  height: 64px;
  line-height: 64px;
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  bottom: 0;
  border: none;
  z-index: 1;
  left: auto;
  right: auto;
  border-radius: 100%;
  ${({ position }) => position === 'left' && 'left: 0;'};
  ${({ position }) => position === 'right' && 'right: 0;'};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${({ disabled }) => (disabled ? Colors.gray700 : Colors.primary)};
`;

export const CarouselThumbStyled = styled('a')<CarouselThumbProps>`
  cursor: pointer;
  display: block;
  box-shadow: ${({ active }) => (active ? `0 0 0 3px ${Colors.primary}` : 'none')};
  ${(props) => spacingStyle(props)}
`;
