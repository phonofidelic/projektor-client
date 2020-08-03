import React, { useContext } from 'react';
import { StringContext } from 'strings';
import moment from 'moment';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const currentLocaleData = moment.localeData();

export default function ProjectCardContent(props) {
  const { project } = props;
  const strings = useContext(StringContext);

  return (
    <CardContent>
      <div>
        {project.client && (
          <div>
            <Typography variant="body2" component="p">
              <Typography variant="overline">{strings.lbl__client}</Typography>{' '}
              {project.client}
            </Typography>
          </div>
        )}
        <div>
          <Typography variant="body2" component="p">
            <Typography variant="overline">
              {strings.lbl__start_date}
            </Typography>{' '}
            {project.startDate
              ? moment(project.startDate).format(
                  currentLocaleData.longDateFormat('L')
                )
              : strings.msc__tbd_short}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" component="p">
            <Typography variant="overline">{strings.lbl__deadline}</Typography>{' '}
            {project.deadline
              ? moment(project.deadline).format(
                  currentLocaleData.longDateFormat('L')
                )
              : strings.msc__open}
          </Typography>
        </div>
        {project.budgetedTime && (
          <div>
            <Typography variant="body2" component="p">
              <Typography variant="overline">
                {strings.lbl__budgeted_time}
              </Typography>
              {project.budgetedTime.toLocaleString(navigator.language) +
                strings.frg__hours_short}
            </Typography>
          </div>
        )}
        <div>
          <Typography variant="body2" component="p">
            <Typography variant="overline">{strings.lbl__time_used}</Typography>{' '}
            {moment
              .duration(project.timeUsed, 'ms')
              .format('hh:mm:ss', { trim: false })}
          </Typography>
        </div>
      </div>
      <div>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{
            height: 100,
            overflowY: 'auto',
            whiteSpace: 'pre-wrap'
          }}
          tabIndex="0"
        >
          {project.description === 'No description provided'
            ? strings.msg__empty_project_description
            : project.description}
        </Typography>
      </div>
    </CardContent>
  );
}
