import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
// eslint-disable-next-line
import momentDurationFormatSetup from 'moment-duration-format';

import WorkSection from 'components/ProjectDetail/WorkSection';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const InfoContainer = styled(Grid)`
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: left;
`;

const Info = styled(Grid)`
  padding: 18px;
  max-height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
`;

export default function ProjectDetail(props) {
  const { project, createWork } = props;

  return project ? (
    <div>
      <InfoContainer container>
        <Info item xs={12} sm={6}>
          <Typography>{project.description}</Typography>
        </Info>
        <Info item xs={12} sm={6}>
          <div>
            <Typography variant="overline">Client:</Typography> {project.client}
          </div>
          <div>
            <Typography variant="overline">Start Date:</Typography>{' '}
            {project.startDate
              ? moment(project.startDate).format('ddd, MMM Do YYYY')
              : 'TBD'}
          </div>
          <div>
            <Typography variant="overline">Deadline:</Typography>{' '}
            {project.deadline
              ? moment(project.deadline).format('ddd, MMM Do YYYY')
              : 'open'}
          </div>
          <div>
            <Typography variant="overline">Time Used:</Typography>{' '}
            {moment
              .duration(project.timeUsed, 'ms')
              .format('hh:mm:ss', { trim: false })}
          </div>
          <div>
            <Typography variant="overline">Budgeted Time:</Typography>{' '}
            {project.budgetedTime}h
          </div>
          <div>
            <LinearProgress
              value={(project.timeUsed / (project.budgetedTime * 3.6e6)) * 100}
              variant="determinate"
              style={{ height: 20 }}
            />
          </div>
        </Info>
      </InfoContainer>
      <WorkSection project={project} createWork={createWork} />
    </div>
  ) : (
    <div>Loading...</div>
  );
}
