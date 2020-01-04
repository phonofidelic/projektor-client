import React, { useContext } from 'react';
import styled from 'styled-components';
import { StringContext } from 'strings';
import moment from 'moment';

import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  BarSeries
} from '@devexpress/dx-react-chart-material-ui';

export default function WeekChart(props) {
  const { work } = props;

  const currentLocaleData = moment.localeData();

  const days = currentLocaleData.weekdays().map((day, i) => {
    return {
      label: day,
      value: moment()
        .startOf('week')
        .add(i + 1, 'days')
    };
  });

  console.log('====================================');
  console.log('days:', days);
  console.log('====================================');

  const getWorkforDay = (work, day) => {
    let totalDuration = 0;

    work.forEach(workItem => {
      const m_workStart = moment(workItem.start).format();
      const m_dayStart = day.value.format();
      const m_dayEnd = day.value.add(1, 'day').format();
      // console.log('====================================');
      // console.log('m_workStart:', m_workStart);
      // console.log('m_dayStart:', m_dayStart);
      // console.log('m_dayEnd:', m_dayEnd);
      // console.log('====================================');

      if (moment(m_workStart).isBetween(m_dayStart, m_dayEnd)) {
        totalDuration += workItem.duration;
      }

      console.log(`getWork, totalDurration for ${day.label}:`, totalDuration);
    });
    return moment.duration(totalDuration, 'ms').asHours();
  };

  const chartData = days.map(day => {
    return {
      argument: day.label,
      value: getWorkforDay(work, day)
    };
  });

  console.log('====================================');
  console.log('chartData:', chartData);
  console.log('====================================');

  return (
    <Chart data={chartData}>
      <ArgumentAxis />
      <ValueAxis />
      <BarSeries valueField="value" argumentField="argument" />
    </Chart>
  );
}
