import * as types from '../src/constants/actionTypes';
import metricsReducer from '../src/reducers/metricsReducer';
import timeReducer from '../src/reducers/timeReducer';

describe('Reducer tests.', () => {
  test('metricsReducer add metrics when action.type is ADD_METRICS', () => {
    const action = { type: types.ADD_METRICS, payload: ['testMetric'] };
    const testState = {};
    const result = metricsReducer(testState, action);
    expect(result).toEqual({ testMetric: { tracking: false, latestMeasurement: 'Reconnecting' } });
  });

  test('metricsReducer toggles tracking when action.type is TOGGLE_TRACKING', () => {
    const action = { type: types.TOGGLE_TRACKING, payload: 'testMetric2' };
    const testState = { testMetric2: { tracking: false, latestMeasurement: 'Reconnecting' } };
    const result = metricsReducer(testState, action);
    expect(result.testMetric2.tracking).toEqual(!testState.testMetric2.tracking);
  });

  test('timeReducer updates time frame when action.type is SET_TIME_FRAME', () => {
    const action = { type: types.SET_TIME_FRAME, payload: 20 };
    const testState = { timeFrame: 50 }
    const result = timeReducer(testState, action);
    expect(result.timeFrame).toEqual(20);
  });
});