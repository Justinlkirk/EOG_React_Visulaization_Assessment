import * as types from '../constants/actionTypes';
import * as defaults from '../constants/defaultValues';

type StateType = {
  timeFrame: number;
  currentTime: number;
  initialTime: number;
};

type ActionType = {
  type: string,
  payload: number,
};

const initialState: StateType = {
  timeFrame: defaults.DEFAULT_TIME_FRAME,
  currentTime: Infinity,
  initialTime: Infinity,
};

export default (state = initialState, action: ActionType) => {
  switch (action.type) {
    case types.SET_TIME_FRAME: {
      const copyState = JSON.parse(JSON.stringify(state));
      // 2 * O(n) instead of O(n) with a recursive algo.
      copyState.timeFrame = action.payload;
      return copyState;
    }
    default:
      return state;
  }
};
