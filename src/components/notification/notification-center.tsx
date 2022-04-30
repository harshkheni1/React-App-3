import React from 'react';
import { useNotificationState } from './hooks';
import { NotificationList } from '../ui-kit';

const NotificationCenter: React.FC = () => {
  const notifications = useNotificationState();
  return <NotificationList items={notifications} />;
};

export default NotificationCenter;
