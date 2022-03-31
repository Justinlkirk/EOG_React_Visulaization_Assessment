import React from 'react';
import {
  useQuery,
  gql,
} from '@apollo/client';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Chip from '../../components/Chip';
import MetricButton from './MetricButton';
import * as metricsActions from '../../actions/metricsActions';

const query = gql`
  query {
    getMetrics
  }
`;

type MetricsDataResponse = {
  getMetrics: string[];
};

export default () => {
  const { loading, error, data } = useQuery<MetricsDataResponse>(query);
  const dispatch = useDispatch();
  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="Metrics not found." />;
  dispatch(metricsActions.addMetrics(data.getMetrics));
  const metrics = data.getMetrics
    .map((metric: string) => <MetricButton key={metric} metric={metric} />);

  return (
    <div>
      {metrics}
    </div>
  );
};
