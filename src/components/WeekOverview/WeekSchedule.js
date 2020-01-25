import React, { useContext } from 'react';
import { StringContext } from 'strings';

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

export default function WeekSchedule(props) {
  const { work, handleWeekNavigation } = props;
  const strings = useContext(StringContext);

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
      <Toolbar />
      <TodayButton messages={{ today: strings.btn__today }} />
      <DateNavigator />

      <WeekView />
      <Appointments />
      <AppointmentTooltip />
    </Scheduler>
  );
}
