import { NotificationAction, NotificationState } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const notificationReducer = (state: NotificationState, action: { type: NotificationAction; payload: any }) => {
  switch (action.type) {
    case NotificationAction.ADD_NOTIFICATION: {
      return [
        ...state,
        {
          ...action.payload,
        },
      ];
    }
    case NotificationAction.REMOVE_NOTIFICATION: {
      return state.filter((item) => item.id !== action.payload);
    }
    case NotificationAction.UPDATE_NOTIFICATION: {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
    }
    default: {
      throw new Error();
    }
  }
};
