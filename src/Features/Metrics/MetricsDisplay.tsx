import React from 'react';
import { useSelector } from 'react-redux';
import {
  gql,
  useQuery,
} from '@apollo/client';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import { RootState } from '../../store';
import MetricButton from './MetricButton';
import MetricsGraph from './MetricsGraph';
import TimeFrameDropdown from '../../components/TimeFrameDropdown';

const getHeartBeat = () => {
  const getHeartBeatQuery = gql`
    query {
      heartBeat
    }
  `;

  const { error, data } = useQuery<{ heartBeat: number }>(getHeartBeatQuery, { fetchPolicy: 'no-cache' });
  // fetchPolicy: 'no-cache' is not working.
  // From what I've read it needs to be included server side as well.
  if (error) return Infinity;
  if (!data) return Infinity;
  return data.heartBeat;
};

type EntriesArrayType = [
  string,
  { tracking: boolean, latestMeasurement: string },
];

const queryTrackedMetrics = (currTime: number, metArr: EntriesArrayType[], timeFrame: number) => {
  const howFarBackToLook = currTime - timeFrame;
  const buildMetricsString = metArr.reduce((acc: string, curr: EntriesArrayType) => {
    if (curr[1].tracking) {
      acc += `
        ${curr[0]}: getMultipleMeasurements(input: { metricName: "${curr[0]}", after: ${howFarBackToLook}, before: ${currTime} }) {
          measurements { at, value, unit }
        }
    `;
    }
    return acc;
  }, '');

  type GetMultipleMeasurementsQueryResponse = {
    [key: string]: [{
      __typename: string;
      measurements: {
        __typename: string;
        at: number;
        value: number;
        unit: string;
      }[],
    }]
  };
  const query = buildMetricsString ? `query { ${buildMetricsString} }` : 'query { heartBeat }';
  const { loading, error, data } = useQuery<GetMultipleMeasurementsQueryResponse>(gql`${query}`);
  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data || data.heartBeat) return <></>;
  return <MetricsGraph stats={data} />;
};

export default () => {
  const allMetrics = useSelector((state: RootState) => state.metrics);
  const timeFrame = useSelector((state: RootState) => state.time.timeFrame);
  const metricsArr: EntriesArrayType[] = Object.entries(allMetrics);
  const metrics: JSX.Element[] = metricsArr.map((entry: EntriesArrayType) => {
    const met = entry[0];
    return <MetricButton key={met} metric={met} />;
  });
  const currentTime: number = getHeartBeat();
  const graph = queryTrackedMetrics(currentTime, metricsArr, timeFrame);
  return (
    <div>
      <Grid
        container
        direction="row"
        alignContent="center"
        alignItems="center"
        rowSpacing={2}
      >
        {metrics}
      </Grid>
      <TimeFrameDropdown />
      {graph}
    </div>
  );
};
