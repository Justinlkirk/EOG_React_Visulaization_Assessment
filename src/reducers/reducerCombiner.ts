import { combineReducers } from 'redux';

import metricsReducer from './metricsReducer';
import timeReducer from './timeReducer';

export default combineReducers({
  metrics: metricsReducer,
  time: timeReducer,
});
