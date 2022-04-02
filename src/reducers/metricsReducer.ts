import * as types from '../actions/actionTypes';

type StateType = {
  [key: string]: {
    tracking: boolean,
    latestMeasurement: string,
  },
};

const initialState: StateType = {};

export default (state = initialState, action: any) => {
  // eslint-disable-next-line no-case-declarations
  const copyState = JSON.parse(JSON.stringify(state));
  // 2 * O(n) instead of O(n) with a recursive algo.
  switch (action.type) {
    case types.ADD_METRICS:
      action.payload.forEach((metric: string) => {
        if (!(metric in copyState)) {
          copyState[metric] = {
            tracking: false,
            latestMeasurement: 'Reconnecting',
          };
        }
      });
      return copyState;
    case types.TOGGLE_TRACKING:
      copyState[action.payload].tracking = !copyState[action.payload].tracking;
      return copyState;
    default:
      return state;
  }
};
