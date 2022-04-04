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

type StatsType = {
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

type AccumulatorType = {
  axes: JSX.Element[];
  series: JSX.Element[];
  units: { [key: string]: boolean };
  imbalanced: boolean;
};

type CurrentType = [
  string,
  [{
    __typename: string;
    measurements: {
      __typename: string;
      at: number;
      value: number;
      unit: string;
    }[],
  }],
];

export default (props: { stats: StatsType }) => {
  const { stats } = props;
  const statsEntries = Object.entries(stats);
  const initAccVal: AccumulatorType = {
    axes: [],
    series: [],
    units: {},
    imbalanced: false,
  };
  const axesAndSeriesObj = statsEntries.reduce((acc: AccumulatorType, curr: CurrentType) => {
    const metricName = curr[0];
    const metricUnit = curr[1][0].measurements[0].unit;
    const { measurements } = curr[1][0];
    acc.series.push(
      <SeriesDirective
        key={metricName}
        name={metricName}
        type="Line"
        dataSource={measurements}
        xName="at"
        yName="value"
        yAxisName={metricUnit}
      />,
    );
    if (metricUnit in acc.units) return acc;
    acc.axes.push(
      <AxisDirective
        key={metricUnit}
        name={metricUnit}
        title={metricUnit}
        labelFormat={`{value} ${metricUnit}`}
        opposedPosition={acc.imbalanced}
      />,
    );
    acc.units[metricUnit] = true;
    acc.imbalanced = !acc.imbalanced;
    return acc;
  }, initAccVal);

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
