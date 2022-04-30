import React, { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { NotificationListStyled } from './notification-list.styled';
import { Notification } from './notification';
import { NotificationListProps } from './types';

export const NotificationList: FC<NotificationListProps> = (props) => {
  const { items, measure, timeout } = props;
  return (
    <NotificationListStyled {...{ items, measure, timeout }}>
      <TransitionGroup>
        {items?.map((props, index) => (
          <CSSTransition key={`notification-${index}`} timeout={timeout} classNames="animation">
            <Notification {...props} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </NotificationListStyled>
  );
};

NotificationList.defaultProps = {
  measure: 'md',
  timeout: {
    enter: 150,
    exit: 100,
  },
};

NotificationList.displayName = 'NotificationList';
