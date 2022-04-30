export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface NotificationMessage {
  id: string;
  type: NotificationType;
  title: string;
  buttonTitle?: string;
  onClickButton?: () => void;
  onRemove?: () => void;
}

export type NotificationState = NotificationMessage[];

export enum NotificationAction {
  ADD_NOTIFICATION = 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION',
  UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION',
}
