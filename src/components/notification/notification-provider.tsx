import React, { ReactNode, useReducer } from 'react';
import { NotificationState } from './types';
import { NotificationDispatchContext, NotificationStateContext } from './context';
import { notificationReducer } from './reducer';

const initialState: NotificationState = [];

const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  return (
    <NotificationDispatchContext.Provider value={dispatch}>
      <NotificationStateContext.Provider value={state}>{children}</NotificationStateContext.Provider>
    </NotificationDispatchContext.Provider>
  );
};

export default NotificationProvider;
