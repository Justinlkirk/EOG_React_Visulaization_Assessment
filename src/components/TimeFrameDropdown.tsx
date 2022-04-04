import React from 'react';
import { useDispatch } from 'react-redux';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import * as actions from '../actions/timeActions';
import * as defaults from '../constants/defaultValues';

export default () => {
  const dispatch = useDispatch();
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTimeFrame = parseInt(event.target.value, 10);
    if (typeof newTimeFrame === 'number' && !Number.isNaN(newTimeFrame)) dispatch(actions.setTimeFrame(newTimeFrame));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Time Frame
      </InputLabel>
      <NativeSelect
        defaultValue={defaults.DEFAULT_TIME_FRAME}
        inputProps={{
          name: 'Time Frame',
          id: 'uncontrolled-native',
        }}
        onChange={handleSelect}
      >
        <option value={60000}>Last Minute</option>
        <option value={600000}>Last 10 Minutes</option>
        <option value={3600000}>Last Hour</option>
      </NativeSelect>
    </Box>
  );
};
