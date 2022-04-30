import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { createWrapper, MakeStore } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';

import createRootReducer, { RootState } from './root-reducer';
import rootSaga from './root-saga';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

export let coreStore = null;

const makeStore: MakeStore<RootState> = () => {
  const sagaMiddleware = createSagaMiddleware();
  coreStore = createStore(createRootReducer(), composeWithDevTools(applyMiddleware(sagaMiddleware)));
  (coreStore as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return coreStore;
};

export const reduxWrapper = createWrapper<RootState>(makeStore, { debug: false });
