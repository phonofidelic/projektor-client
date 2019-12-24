import React, { useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';
// eslint-disable-next-line
import momentDurationFormatSetup from 'moment-duration-format';
import { StringContext } from 'strings';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const Container = styled(Grid)`
  padding: 18px;
  max-height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
`;

export default function ProjectInfo(props) {
  const { project } = props;
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();

  return (
    <Container item xs={12} sm={6}>
      <div>
        <Typography variant="overline">{strings.lbl__client}</Typography>{' '}
        {project.client}
      </div>
      <div>
        <Typography variant="overline">{strings.lbl__start_date}</Typography>{' '}
        {project.startDate
          ? moment(project.startDate).format(
              currentLocaleData.longDateFormat('LL')
            )
          : strings.msc_tbd_short}
      </div>
      <div>
        <Typography variant="overline">{strings.lbl__deadline}</Typography>{' '}
        {project.deadline
          ? moment(project.deadline).format(
              currentLocaleData.longDateFormat('LL')
            )
          : strings.msc_open}
      </div>
      <div>
        <Typography variant="overline">{strings.lbl__budgeted_time}</Typography>{' '}
        {project.budgetedTime &&
          project.budgetedTime.toLocaleString(navigator.language) +
            strings.frg__hours_short}
      </div>
      <div>
        <Typography variant="overline">{strings.lbl__time_used}</Typography>{' '}
        {moment
          .duration(project.timeUsed, 'ms')
          .format('hh:mm:ss', { trim: false })}
      </div>
      <div>
        <LinearProgress
          value={(project.timeUsed / (project.budgetedTime * 3.6e6)) * 100}
          variant="determinate"
          style={{ height: 20 }}
        />
      </div>
    </Container>
  );
}
