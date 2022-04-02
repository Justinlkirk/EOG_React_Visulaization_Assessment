import React from 'react';
import {
  ChartComponent,
  Inject,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Category,
  Legend,
  Tooltip,
  Crosshair,
} from '@syncfusion/ej2-react-charts';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../store';
// import * as actions from '../../actions/metricsActions';

// const subClient = new SubscriptionClient('https://react-assessment.herokuapp.com/graphql', { reconnect: true });
type StatsType = {
  [key: string]: [
    measurements: {
      __typename: 'Measurement';
      at: number;
      value: number;
      unit: string;
    },
  ]
};

export default (props: { stats: StatsType }) => {
  const { stats } = props;
  // eslint-disable-next-line no-console
  const series = Object.entries(stats).reduce((acc: any, curr: any) => {
    const metricName = curr[0];
    const metricUnit = curr[1][0].measurements[0].unit;
    const { measurements } = curr[1][0];
    // eslint-disable-next-line no-console
    console.log(metricName, metricUnit, measurements);
    acc.push(<SeriesDirective
      key={metricName}
      name={metricName}
      type="Line"
      dataSource={measurements}
      xName="at"
      yName="value"
    // yAxisName={metricName}
    />);
    return acc;
  }, []);

  return (
    <ChartComponent
      title="Data Visualization"
      primaryXAxis={{ valueType: 'Category', title: 'time' }}
      legendSettings={{ visible: true }}
      tooltip={{ enable: true, shared: true }}
      crosshair={{ enable: true }}
    >
      <Inject services={[LineSeries, Category, Legend, Tooltip, Crosshair]} />
      <SeriesCollectionDirective>
        {series}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};
