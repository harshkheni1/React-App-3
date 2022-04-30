import { ArrayToType } from '../../const';
import { NotificationProps, NotificationListProps } from './types';

export const NotificationTypes = ['error', 'success'] as const;
export type NotificationTypesType = ArrayToType<typeof NotificationTypes>;

export const NotificationDefault: NotificationProps = {
  id: 'Notification1',
  type: 'error',
  title: 'title',
  buttonTitle: 'buttonTitle',
};

export const itemsDefault: NotificationListProps = {
  items: [
    { type: NotificationTypes[0], id: 'rer', title: 'Title', buttonTitle: 'Button Title' },
    { type: NotificationTypes[1], id: 'tttt', title: 'Title1', buttonTitle: 'Button Title1' },
  ],
};
