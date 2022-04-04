import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { RootState } from '../../store';
import * as actions from '../../actions/metricsActions';

export default (props: { metric: string }) => {
  const { metric } = props;
  const tracking = useSelector((state: RootState) => state.metrics[metric]?.tracking);
  const latestMeas = useSelector((state: RootState) => state.metrics[metric]?.latestMeasurement);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(actions.toggleTracking(metric));
  const measurement = tracking ? latestMeas : '';

  return (
    <Grid item key={metric} xs={4} lg={3}>
      <Button variant="contained" onClick={handleClick} data-testid={metric}>
        {metric}<br />
        {measurement}
      </Button>
    </Grid>
  );
};
