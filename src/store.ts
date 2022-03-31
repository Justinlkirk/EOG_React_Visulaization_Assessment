import { createStore } from 'redux';
import metricsReducer from './reducers/metricsReducer';

export const store = createStore(
  metricsReducer,
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
