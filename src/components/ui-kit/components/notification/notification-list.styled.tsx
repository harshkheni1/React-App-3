import React, { FC } from 'react';
import { styled } from '../../utils';
import { GridBreakpointsMediaDown } from '../../const';
import { NotificationListProps } from './types';

const NotificationListChild: FC<NotificationListProps> = (props) => {
  const { className, children } = props;
  return <div {...{ className }}>{children}</div>;
};
export const NotificationListStyled = styled(NotificationListChild)`
  width: ${({ measure }) => (measure === 'md' && '400px') || (measure === 'lg' && '600px')};
  position: fixed;
  z-index: 3000;
  bottom: 10px;
  left: 50%;
  margin: 0 0 0 ${({ measure }) => (measure === 'md' && '-200px') || (measure === 'lg' && '-300px')};
  ${GridBreakpointsMediaDown.sm} {
    width: auto;
    margin: 0;
    left: 20px;
    right: 20px;
  }
  & > div > div:not(:last-of-type) {
    margin: 0 0 30px;
  }
`;
