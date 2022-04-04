import * as types from '../src/constants/actionTypes';
import * as metricActions from '../src/actions/metricsActions';
import * as timeActions from '../src/actions/timeActions';

describe('Action creator tests', () => {
  test('addMetrics action should create an action with correct type and given payload.', () => {
    const pL = ['test', 'payload'];
    const result = metricActions.addMetrics(pL);
    expect(result).toEqual({ type: types.ADD_METRICS, payload: pL });
  })

  test('toggleTracking action should create an action with correct type and given payload.', () => {
    const pL = 'test string';
    const result = metricActions.toggleTracking(pL);
    expect(result).toEqual({ type: types.TOGGLE_TRACKING, payload: pL });
  })

  test('setTimeFrame action should create an action with correct type and given payload.', () => {
    const pL = 1337;
    const result = timeActions.setTimeFrame(pL);
    expect(result).toEqual({ type: types.SET_TIME_FRAME, payload: pL });
  })
})
