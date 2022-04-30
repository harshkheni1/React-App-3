import { useContext } from 'react';
import { NotificationDispatchContext, NotificationStateContext } from './context';
import { NotificationAction, NotificationMessage, NotificationType } from './types';

const generateId = () => Math.random().toString(36).substring(2, 15);

export type UseNotificationHookInterface = (
  type: NotificationType,
  title: string,
  seconds?: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buttonTitle?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClickButton?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRemove?: any,
) => Promise<void>;

export const useNotification = (): UseNotificationHookInterface => {
  const dispatch = useContext(NotificationDispatchContext);
  //const state = useNotificationState();

  const clickNotificationButton = (id: string, callback: () => void) => {
    if (callback) {
      callback();
    }
    dispatch({ type: NotificationAction.REMOVE_NOTIFICATION, payload: id });
  };

  const pushNotification: UseNotificationHookInterface = async (
    type: NotificationType,
    title: string,
    seconds = 3,
    buttonTitle = null,
    onClickButton = null,
    onRemove = null,
  ) => {
    const id = generateId();
    const newMessage: NotificationMessage = {
      id,
      type,
      title,
      buttonTitle,
      onClickButton: () => clickNotificationButton(id, onClickButton),
      onRemove,
    };
    dispatch({ type: NotificationAction.ADD_NOTIFICATION, payload: newMessage });
    await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    dispatch({ type: NotificationAction.REMOVE_NOTIFICATION, payload: newMessage.id });
    if (newMessage.onRemove) {
      newMessage.onRemove();
    }
  };

  return pushNotification;
};

export const useNotificationState = () => {
  return useContext(NotificationStateContext);
};
