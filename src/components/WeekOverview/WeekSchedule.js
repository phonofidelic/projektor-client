import React, { useContext } from 'react';
import { StringContext } from 'strings';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from 'react-router-dom';
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
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

moment.locale(navigator.language);

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
      title={
        <Link
          style={{ textDecoration: 'none' }}
          to={`/projects/${appointmentData.projectId}`}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            noWrap
            style={{ color: '#fff' }}
          >
            {appointmentData.title}
          </Typography>
        </Link>
      }
    />
  );
};

const TooltipContent = ({ appointmentData }) => {
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();

  return (
    <Card>
      <CardContent>
        {/* <Typography gutterBottom variant="h5" component="h2" noWrap>
          {appointmentData.title}
        </Typography> */}
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

const DayScaleComponent = (props) => {
  const { cellsData, cellComponent, rowComponent } = props;
  console.log('DayScaleComponent props:', props);

  return <div>test</div>;
};

export default function WeekSchedule(props) {
  const { work, handleWeekNavigation } = props;
  const strings = useContext(StringContext);

  const schedulerData = work.map((workItem) => {
    return {
      startDate: workItem.start,
      endDate: workItem.end,
      title: workItem.project.title,
      id: workItem._id,
      duration: workItem.duration,
      notes: workItem.notes,
      projectColor: workItem.project.color,
      projectId: workItem.project._id,
    };
  });

  return (
    <Scheduler locale={navigator.language} data={schedulerData} height="auto">
      <ViewState />
      <WeekView />
      <Toolbar />
      <TodayButton messages={{ today: strings.btn__today }} />
      <DateNavigator />
      <Appointments appointmentComponent={Appointment} />
      <AppointmentTooltip
        headerComponent={AppointmentHeader}
        contentComponent={TooltipContent}
      />
    </Scheduler>
  );
}
