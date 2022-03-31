import React from 'react';
import {
  useQuery,
  gql,
} from '@apollo/client';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import Chip from '../../components/Chip';

// const client = new ApolloClient({
//   uri: 'https://react-assessment.herokuapp.com/graphql',
//   cache: new InMemoryCache(),
// });

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

  const handleClick = (metric: string) => console.log(metric);

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="Metrics not found." />;
  const metrics = data.getMetrics.map(metric => <button key={metric} type='button' onClick={() => handleClick(metric)}>{metric}</button>);

  return (
    <div>
      {metrics}
    </div>
  );
};
