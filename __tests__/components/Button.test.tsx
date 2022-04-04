/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import MetricButton from '../../src/Features/Metrics/MetricButton';
import { store } from '../../src/store';
import * as actions from '../../src/actions/metricsActions';
import '@testing-library/jest-dom';

describe('MetricButton test.', () => {
  const metricName = 'testMetric1';
  let button: HTMLButtonElement;
  beforeAll(() => {
    store.dispatch(actions.addMetrics([metricName]));
    render(
      <Provider store={store}>
        <MetricButton metric={metricName} />
      </Provider>,
    );
    button = screen.getByTestId(metricName);
  });

  test('MetricButton should render', async () => {
    expect(button).toBeDefined();
  });

  test('MetricButton should render', async () => {
    expect(fireEvent.click(button)).toBeTruthy();
  });
});
