import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {
  // ApolloClient,
  useQuery,
  gql,
  // InMemoryCache,
  // ApolloProvider,
} from '@apollo/client';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import CardHeader from './CardHeader';
import Chip from './Chip';
// import Avatar from './Avatar';
import MetricsDisplay from '../Features/Metrics/MetricsDisplay';
import * as metricsActions from '../actions/metricsActions';

const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
  },
});

// const webSocketClient = new ApolloClient({
//   uri: 'wws://react-assessment.herokuapp.com/graphql',
//   cache: new InMemoryCache(),
// });

const getMetricsQuery = gql`
  query {
    getMetrics
  }
`;

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery<{ getMetrics: string[] }>(getMetricsQuery);
  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="Metrics not found." />;
  dispatch(metricsActions.addMetrics(data.getMetrics));

  return (
    <Card className={classes.card}>
      <CardHeader title="DASHBOARD" />
      <CardContent>
        {/* <ApolloProvider client={webSocketClient}> */}
        <MetricsDisplay />
        {/* </ApolloProvider> */}
        <Typography variant="body1">
          Remember to refer to our <a href="https://react.eogresources.com/assessing">How We Assess Submissions</a>{' '}
          guidelines, as well as the <a href="https://react.eogresources.com/api">GraphQL API Documentation</a>.
        </Typography>
      </CardContent>
    </Card>
  );
};
