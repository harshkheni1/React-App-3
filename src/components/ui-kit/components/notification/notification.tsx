import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { NotificationProps } from './types';
import { Icon } from '../icon';
import { Button } from '../button';
import { NotificationStyled } from './notification.styled';

export const Notification: FC<NotificationProps> & WithStyle = (props) => {
  const { id, type, title, buttonTitle } = props;
  return (
    <NotificationStyled $type={type} {...{ id }}>
      <Icon color="black" measure={17} name={type === 'error' ? 'warning' : 'check'} />
      <span>{title}</span>
      {buttonTitle && <Button onClick={props.onClickButton}>{props.buttonTitle}</Button>}
    </NotificationStyled>
  );
};

Notification.displayName = 'Notification';
Notification.Style = NotificationStyled;
