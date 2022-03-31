import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import * as actions from '../../actions/metricsActions';

export default (props: { metric: string }) => {
  const { metric } = props;
  const tracking = useSelector((state: RootState) => state[metric].tracking);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-console
  const handleClick = () => dispatch(actions.toggleTracking(metric));
  const text = tracking ? `${metric}: ooo we are tracking now` : metric;

  return (
    <div key={metric}>
      <button type='button' onClick={handleClick}>
        {text}
      </button>
    </div>
  );
};
