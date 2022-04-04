import * as types from '../constants/actionTypes';

type StateType = {
  [key: string]: {
    tracking: boolean;
    latestMeasurement: string;
  },
};

type ActionType = {
  type: string,
  payload: string[] | string,
};

const initialState: StateType = {};

export default (state = initialState, action: ActionType) => {
  switch (action.type) {
    case types.ADD_METRICS: {
      if (!(action.payload instanceof Array)) return state;
      const copyState = JSON.parse(JSON.stringify(state));
      // 2 * O(n) instead of O(n) with a recursive algo.
      action.payload.forEach((metric: string) => {
        if (!(metric in copyState)) {
          copyState[metric] = {
            tracking: false,
            latestMeasurement: 'Reconnecting',
          };
        }
      });
      return copyState;
    }
    case types.TOGGLE_TRACKING: {
      if (typeof action.payload !== 'string') return state;
      const copyState = JSON.parse(JSON.stringify(state));
      // 2 * O(n) instead of O(n) with a recursive algo.
      copyState[action.payload].tracking = !copyState[action.payload].tracking;
      return copyState;
    }
    default:
      return state;
  }
};
