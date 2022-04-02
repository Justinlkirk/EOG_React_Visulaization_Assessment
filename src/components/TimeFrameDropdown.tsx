import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../actions/timeActions';

export default () => {
  const dispatch = useDispatch();
  const handleSelect = () => {
    // eslint-disable-next-line no-console
    const dropDown: any = document.getElementById('timeFrameDropdown');
    const newTimeFrame = parseInt(dropDown?.value, 10);
    if (typeof newTimeFrame === 'number' && !Number.isNaN(newTimeFrame)) dispatch(actions.setTimeFrame(newTimeFrame));
  };

  return (
    <select id="timeFrameDropdown" onChange={handleSelect}>
      <option value={60000}>Last Minute</option>
      <option value={600000}>Last 10 Minutes</option>
      <option value={3600000}>Last Hour</option>
    </select>
  );
};
