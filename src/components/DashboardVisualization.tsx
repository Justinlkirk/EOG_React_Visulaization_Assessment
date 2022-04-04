import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {
  useQuery,
  gql,
} from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import CardHeader from './CardHeader';
import Chip from './Chip';
import MetricsDisplay from '../Features/Metrics/MetricsDisplay';
import * as metricsActions from '../actions/metricsActions';

const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
  },
});

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
        <MetricsDisplay />
        <Typography variant="body1">
          Click the buttons above to view a graphical analysis of past data{' '}
        </Typography>
      </CardContent>
    </Card>
  );
};
