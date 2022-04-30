import { TooltipProps } from './types';
import React, { FC } from 'react';
import { WithStyle } from '../../utils/types';
import { SpacingProps } from '../../const/helpers';
import { TooltipStyled, TooltipLiteStyled } from './tooltip.styled';
import { Text } from '../text';

export const Tooltip: FC<TooltipProps> & WithStyle & SpacingProps = (props) => {
  return props.isButton ? (
    <TooltipStyled {...props}>
      <TooltipLiteStyled
        useHover={props.useHover == false ? false : true}
        distance={20}
        direction={props.direction || 'down'}
        padding={15}
        tagName="span"
        eventToggle={props.useHover == false ? 'onClick' : ''}
        // eventOff={props.useHover == false ? "onClick" : "onMouseOut"}
        content={props.content}
      >
        <Text as="span" color="white">
          ?
        </Text>
      </TooltipLiteStyled>
    </TooltipStyled>
  ) : (
    <TooltipLiteStyled
      useHover={props.useHover == false ? false : true}
      distance={20}
      direction={props.direction || 'down'}
      padding={15}
      content={props.content}
    >
      {props.children}
    </TooltipLiteStyled>
  );
};

Tooltip.displayName = 'Tooltip';
Tooltip.Style = TooltipStyled;
