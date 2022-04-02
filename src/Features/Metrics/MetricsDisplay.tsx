import React from 'react';
import { useSelector } from 'react-redux';
import {
  // useSubscription,
  gql,
  useQuery,
} from '@apollo/client';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import { Typography } from '@material-ui/core';
// import Chip from '../../components/Chip';
import { RootState } from '../../store';
import MetricButton from './MetricButton';
import MetricsGraph from './MetricsGraph';
import TimeFrameDropdown from '../../components/TimeFrameDropdown';
// import * as metricsActions from '../../actions/metricsActions';

// const getMetricsQuery = gql`
// {
//   newMeasurement {
//     metric
//     value
//     unit
//   }
// }
// `;

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
    [key: string]: [
      measurements: {
        __typename: 'Measurement';
        at: number;
        value: number;
        unit: string;
      },
    ]
  };
  const query = buildMetricsString ? `query { ${buildMetricsString} }` : 'query { heartBeat }';
  const { error, data } = useQuery<GetMultipleMeasurementsQueryResponse>(gql`${query}`);
  if (error) return {};
  if (!data || data.heartBeat) return {};
  return data;
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
  const graphInfo = queryTrackedMetrics(currentTime, metricsArr, timeFrame);
  const informationInGraphInfo = Object.keys(graphInfo).length;
  const graph = informationInGraphInfo ? <MetricsGraph stats={graphInfo} /> : <></>;
  return (
    <div>
      <div>
        {metrics}
      </div>
      <TimeFrameDropdown />
      {graph}
    </div>
  );
};
