import * as types from '../actions/actionTypes';

type StateType = {
  timeFrame: number;
};

type ActionType = {
  type: string,
  payload: number,
};

const initialState: StateType = {
  timeFrame: 10000,
};
// 10000 is an arbitrary default that corresponds to the default
// value of the drop down in ./src/components/TimeFrameDropdown

export default (state = initialState, action: ActionType) => {
  // eslint-disable-next-line no-case-declarations
  const copyState = JSON.parse(JSON.stringify(state));
  // 2 * O(n) instead of O(n) with a recursive algo.
  switch (action.type) {
    case types.SET_TIME_FRAME:
      // eslint-disable-next-line no-console
      console.log('here');
      copyState.timeFrame = action.payload;
      return copyState;
    default:
      return state;
  }
};
