import * as types from '../constants/actionTypes';

export const setTimeFrame = (payload: number) => ({
  type: types.SET_TIME_FRAME,
  payload,
});
