import { styled } from '../../utils';
import { Colors } from '../../const';
import { Button } from '../button';
import { IconStyled } from '../icon';
import { PopoverProps, PopoverElementProps } from './types';

export const PopoverStyled = styled('div')<PopoverProps>`
  width: 400px;
  background-color: ${Colors.white};
  padding: 25px;
  left: 0;
  top: 100%;
  margin: 15px 0 0;
  box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.3);
  position: absolute;
  z-index: 10;
`;

export const PopoverWrapStyled = styled('div')<PopoverElementProps>`
  position: relative;
`;

export const PopoverHeaderStyled = styled('header')<PopoverProps>`
  margin: 0 0 15px;
  position: relative;
`;

export const PopoverTitleStyled = styled('p')<PopoverElementProps>`
  font-weight: 700;
  margin: 0;
`;

export const PopoverBodyStyled = styled('div')<PopoverElementProps>`
  margin: 0;
`;

export const PopoverCloseStyled = styled(Button)`
  background-color: transparent;
  border: none;
  color: ${Colors.black};
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  margin: -15px -15px 0 0;
  ${IconStyled} * {
    fill: #000;
  }
  &:hover,
  &:focus {
    ${IconStyled} * {
      fill: ${Colors.primary};
    }
  }
`;
