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
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();

  console.log('====================================');
  console.log('appointmentData:', appointmentData);
  console.log('currentLocaleData:', currentLocaleData);
  console.log('====================================');

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" noWrap>
          {appointmentData.projectTitle}
        </Typography>
        <div>
          <Typography variant="overline">
            {strings.lbl__work_tbl_start_date}:
          </Typography>{' '}
          {moment(appointmentData.startDate).format(
            currentLocaleData.longDateFormat('L')
          )}
        </div>
        <div>
          <Typography variant="overline">
            {strings.lbl__work_tbl_start_time}:
          </Typography>{' '}
          {moment(appointmentData.startDate).format(
            currentLocaleData.longDateFormat('LT')
          )}
        </div>
        <div>
          <Typography variant="overline">
            {strings.lbl__work_tbl_end_time}:
          </Typography>{' '}
          {moment(appointmentData.endDate).format(
            currentLocaleData.longDateFormat('LT')
          )}
        </div>
        <div>
          <Typography variant="overline">
            {strings.lbl__work_tbl_duration}:
          </Typography>{' '}
          {moment
            .duration(appointmentData.duration, 'ms')
            .format('hh:mm:ss', { trim: false })}
        </div>
        <div>
          <Typography
            style={{ wrap: 'pre-wrap' }}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {appointmentData.notes}
          </Typography>
        </div>
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
      duration: workItem.duration,
      projectTitle: workItem.project.title,
      notes: workItem.notes,
      projectColor: workItem.project.color
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
