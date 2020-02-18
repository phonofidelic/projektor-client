import React, { useContext } from 'react';
import { StringContext } from 'strings';
import styled from 'styled-components';

import {
  Scheduler,
  Toolbar,
  // DayView,
  DateNavigator,
  Appointments,
  AppointmentTooltip,
  WeekView,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

const Appointment = ({ children, data, ...restProps }) => {
  return (
    <Appointments.Appointment
      {...restProps}
      data={data}
      style={{ backgroundColor: data.projectColor }}
    >
      {children}
    </Appointments.Appointment>
  );
};

export default function WeekSchedule(props) {
  const { work, handleWeekNavigation } = props;
  const strings = useContext(StringContext);

  console.log('====================================');
  console.log('WeekSchedule, work:', work);
  console.log('====================================');

  const schedulerData = work.map(workItem => {
    return {
      startDate: workItem.start,
      endDate: workItem.end,
      title: workItem.notes,
      projectColor: workItem.projectColor
    };
  });

  return (
    <Scheduler locale={navigator.language} data={schedulerData}>
      <ViewState />
      <Toolbar />
      <TodayButton messages={{ today: strings.btn__today }} />
      <DateNavigator />
      <WeekView />
      <Appointments appointmentComponent={Appointment} />
      <AppointmentTooltip />
    </Scheduler>
  );
}
