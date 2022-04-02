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
  DateTime,
  AxesDirective,
  AxisDirective,
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
  const statsEntries = Object.entries(stats);
  const axesAndSeriesObj = statsEntries.reduce((acc: any, curr: any) => {
    const metricName = curr[0];
    const metricUnit = curr[1][0].measurements[0].unit;
    const { measurements } = curr[1][0];
    acc.series.push(<SeriesDirective
      key={metricName}
      name={metricName}
      type="Line"
      dataSource={measurements}
      xName="at"
      yName="value"
      yAxisName={metricUnit}
    />);
    if (metricUnit in acc.units) return acc;
    // eslint and prettier disagree about the indentation. Prettier is correct.
    // eslint-disable-next-line react/jsx-indent
    acc.axes.push(<AxisDirective
      key={metricUnit}
      name={metricUnit}
      title={metricUnit}
      labelFormat={`{value} ${metricUnit}`}
      opposedPosition={acc.imbalanced}
    />);
    acc.units[metricUnit] = true;
    acc.imbalanced = !acc.imbalanced;
    return acc;
  }, {
    axes: [],
    series: [],
    units: {},
    imbalanced: false,
  });

  return (
    <ChartComponent
      title="Data Visualization"
      primaryXAxis={{ valueType: 'DateTime', title: 'time' }}
      legendSettings={{ visible: true }}
      tooltip={{ enable: true, shared: true }}
      crosshair={{ enable: true }}
    >
      <Inject services={[
        LineSeries,
        Category,
        Legend,
        Tooltip,
        Crosshair,
        DateTime,
      ]}
      />
      <AxesDirective>
        {axesAndSeriesObj.axes}
      </AxesDirective>
      <SeriesCollectionDirective>
        {axesAndSeriesObj.series}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};
