import React from 'react';
import { NotificationState } from './types';

export const NotificationStateContext = React.createContext<NotificationState>([]);
export const NotificationDispatchContext = React.createContext<React.Dispatch<unknown>>(null);
