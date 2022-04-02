import { createStore } from 'redux';
import combinedReducers from './reducers/reducerCombiner';

export const store = createStore(
  combinedReducers,
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
