import React, { useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';
// eslint-disable-next-line
import momentDurationFormatSetup from 'moment-duration-format';
import { StringContext } from 'strings';

import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Green from '@material-ui/core/colors/green';

const SHADE = 400;

const InfoContainer = styled(Grid)`
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: left;
`;

const Description = styled(Grid)`
  padding: 18px;
  max-height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
`;

const ProjectInfoContainer = styled(Grid)`
  padding: 18px;
  max-height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
`;

const ProgressContainer = styled.div`
  display: flex;
  /* background-color: #ccc; */
  background-color: ${({ theme }) => theme.palette.action.focus};
  height: 10px;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
`;

const Progress = styled.div`
  background-color: #000;
  width: ${({ project }) =>
    (project.timeUsed / (project.budgetedTime * 3.6e6)) * 100}%;
  height: 10px;
  transition: width ease-in-out 0.3s;
`;

const CurrentProgress = styled.div`
  background-color: ${Green[SHADE]};
  width: ${({ time, project }) =>
    (time / (project.budgetedTime * 3.6e6)) * 100}%;
  height: 10px;
`;

export default function ProjectInfo(props) {
  const { project, time } = props;
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();
  const theme = useTheme();

  return (
    <InfoContainer container>
      <Description item xs={12} sm={6} lg={6}>
        {project.description === 'No description provided' ||
        project.description === '' ? (
          <Typography color="textSecondary">
            {strings.msg__empty_project_description}
          </Typography>
        ) : (
          <Typography>{project.description}</Typography>
        )}
      </Description>

      <ProjectInfoContainer item xs={12} sm={6} lg={6}>
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
          <Typography variant="overline">
            {strings.lbl__budgeted_time}
          </Typography>{' '}
          {project.budgetedTime &&
            project.budgetedTime.toLocaleString(navigator.language) +
              strings.frg__hours_short}
        </div>
        <div>
          <Typography variant="overline">{strings.lbl__time_used}</Typography>{' '}
          {moment
            .duration(project.timeUsed + time, 'ms')
            .format('h:mm', { trim: false })}
        </div>
        <div>
          <ProgressContainer theme={theme}>
            <Progress project={project} />
            <CurrentProgress project={project} time={time} />
          </ProgressContainer>
        </div>
      </ProjectInfoContainer>
    </InfoContainer>
  );
}
