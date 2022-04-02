import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { SubscriptionClient } from 'subscriptions-transport-ws';
import { RootState } from '../../store';
import * as actions from '../../actions/metricsActions';

// const subClient = new SubscriptionClient('https://react-assessment.herokuapp.com/graphql', { reconnect: true });

export default (props: { metric: string }) => {
  const { metric } = props;
  const tracking = useSelector((state: RootState) => state.metrics[metric].tracking);
  const latestMeas = useSelector((state: RootState) => state.metrics[metric].latestMeasurement);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(actions.toggleTracking(metric));
  const text = tracking ? `${metric}: ${latestMeas}` : metric;

  return (
    <span key={metric}>
      <button type='button' onClick={handleClick}>
        {text}
      </button>
    </span>
  );
};
