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

const queryTrackedMetrics = (currTime: number, metArr: any) => {
  const dynamicQuery = metArr.reduce((acc: string, curr: any) => {
    if (curr[1].tracking) {
      acc += `
        ${curr[0]}: getMultipleMeasurements(input: { metricName: "${curr[0]}", after: ${currTime - 10000} }) {
          metric
          measurements { at, value, unit }
        }
    `;
    }
    return acc;
  }, '');
  /*
    I went back and forth on whether I should dynamically build this quite a bit. I built it
    out 3 or 4 times with different approaches, and I finally landed on doing it fully dynamic
    considering there is no direct user input to the query (they can toggle the true or false,
    but they can't actually inject any text into the query). If you read this I'd be interested
    to know what your opinion is?
  */
  type GetMultipleMeasurementsQueryResponse = {
    getMultipleMeasurements: {
      metric: string;
      at: number;
      value: number;
      unit: string;
    }[]
  };
  const { error, data } = useQuery<GetMultipleMeasurementsQueryResponse>(gql`${dynamicQuery ? `query { ${dynamicQuery} }` : 'query { heartBeat }'}`);
  if (error) return [];
  if (!data) return [];
  // eslint-disable-next-line no-console
  console.log(data);
  return data.getMultipleMeasurements;
};

type EntriesArrayType = [
  string,
  { tracking: boolean, latestMeasurement: string },
];

export default () => {
  const allMetrics = useSelector((state: RootState) => state);
  const metricsArr: EntriesArrayType[] = Object.entries(allMetrics);
  const metrics: JSX.Element[] = metricsArr.map((entry: EntriesArrayType) => {
    const met = entry[0];
    return <MetricButton key={met} metric={met} />;
  });
  const currentTime: number = getHeartBeat();
  queryTrackedMetrics(currentTime, metricsArr);
  // const dispatch = useDispatch();
  // const { loading, error, data } = useSubscription<{ getMetrics: string[] }>(getMetricsQuery);
  // dispatch({ type: 'test', payload: { metric: 'blue', value: 2, unit: 'hyperParsecs' } });
  return (
    <div>
      {metrics}
    </div>
  );
};
