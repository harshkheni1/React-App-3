import React from 'react';
import { TooltipPositionType, TooltipProps } from './types';
import { css, styled } from '../../utils';
import { Colors, FontWeightValue, TextSize } from '../../const';
import { default as TooltipLite } from 'react-tooltip-lite';
import { IconStyled } from '../../';

const tooltipPosition = (position: TooltipPositionType[]) => css`
  position: absolute;
  display: block;
  top: ${position[0] != 'auto' ? `${position[0]}px` : 'auto'};
  right: ${position[1] != 'auto' ? `${position[1]}px` : 'auto'};
  bottom: ${position[2] != 'auto' ? `${position[2]}px` : 'auto'};
  left: ${position[3] != 'auto' ? `${position[3]}px` : 'auto'};
`;

export const TooltipStyled = styled(({ children, className }) => <div className={className}>{children}</div>)<
  TooltipProps
>`
  button,
  span {
    box-shadow: 0 0 8px -5px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    background-color: ${Colors.primary};
    border-radius: 50%;
    font-size: ${TextSize.xl};
    font-weight: ${FontWeightValue.medium};
    color: ${Colors.white};
    cursor: pointer;
    text-align: center;
    padding: 0;
    letter-spacing: 0px;
    > span {
      font-size: 15px;
    }
    &:hover {
      background-color: ${Colors.primaryDark};
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 3px 1px ${Colors.focus};
    }
  }
  ${({ position }) => position && position.length > 0 && tooltipPosition(position)}
`;

export const TooltipLiteStyled = styled(TooltipLite)`
  .react-tooltip-lite {
    font-size: 13px;
    color: ${Colors.red};
    background-color: ${Colors.white};
    box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
    min-width: 300px;
    width: auto;
    @media (max-width: 767px) {
      font-size: 12px;
    }
  }

  .react-tooltip-lite-arrow {
    border-color: ${Colors.white};
  }

  ${IconStyled} {
    flex: 0 0 auto;
  }
`;
