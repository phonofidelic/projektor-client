import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentTooltip,
  WeekView
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

export default function WeekSchedule(props) {
  const { work } = props;

  const schedulerData = work.map(workItem => {
    return {
      startDate: workItem.start,
      endDate: workItem.end,
      title: workItem.notes
    };
  });

  return (
    <Scheduler locale={navigator.language} data={schedulerData}>
      <ViewState />
      <WeekView />
      <Appointments />
      <AppointmentTooltip />
    </Scheduler>
  );
}
