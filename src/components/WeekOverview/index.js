import React, { useContext } from 'react';
import styled from 'styled-components';
import { StringContext } from 'strings';
import moment from 'moment';

import WeekChart from 'components/WeekOverview/WeekChart';

import Typography from '@material-ui/core/Typography';

import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  BarSeries
} from '@devexpress/dx-react-chart-material-ui';
import {
  Scheduler,
  DayView,
  Appointments,
  WeekView
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

const Container = styled.div`
  padding: 1px;
  text-align: left;
`;

export default function WeekOverview(props) {
  const { work } = props;
  const strings = useContext(StringContext);

  const schedulerData = work.map(workItem => {
    return {
      startDate: workItem.start,
      endDate: workItem.end,
      title: workItem.notes
    };
  });

  return (
    <Container>
      <div style={{ padding: 18 }}>
        <Typography variant="h6" style={{ padding: 12 }}>
          {strings.ttl__this__week}
        </Typography>
      </div>
      {/* <WeekChart work={work} /> */}
      <Scheduler locale={navigator.language} data={schedulerData}>
        <ViewState />
        <WeekView />
        <Appointments />
      </Scheduler>
    </Container>
  );
}
