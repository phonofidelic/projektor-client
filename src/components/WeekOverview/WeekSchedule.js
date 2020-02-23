import React, { useContext } from 'react';
import { StringContext } from 'strings';
import styled from 'styled-components';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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

const AppointmentHeader = ({ appointmentData }) => {
  return (
    <CardHeader
      style={{ backgroundColor: appointmentData.projectColor }}
    ></CardHeader>
  );
};

const TooltipContent = ({ appointmentData }) => {
  console.log('====================================');
  console.log('TooltipContent, appointmentData:', appointmentData);
  console.log('====================================');
  const currentLocaleData = moment.localeData();

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" noWrap>
          {appointmentData.projectTitle}
        </Typography>
        <Typography>
          {moment(appointmentData.startDate).format(
            currentLocaleData.longDateFormat('L')
          )}
        </Typography>
        <Typography
          style={{ wrap: 'pre-wrap' }}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {appointmentData.notes}
        </Typography>
      </CardContent>
    </Card>
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
      title: workItem.projectTitle,
      projectTitle: workItem.projectTitle,
      notes: workItem.notes,
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
      <AppointmentTooltip
        headerComponent={AppointmentHeader}
        contentComponent={TooltipContent}
      />
    </Scheduler>
  );
}
