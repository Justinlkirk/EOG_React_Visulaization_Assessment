import * as types from '../constants/actionTypes';

export const addMetrics = (payload: string[]) => ({
  type: types.ADD_METRICS,
  payload,
});

export const toggleTracking = (payload: string) => ({
  type: types.TOGGLE_TRACKING,
  payload,
});
