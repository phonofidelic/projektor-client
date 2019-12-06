import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import WorkTable from 'components/WorkTable';
import Header from 'components/Header';
import WorkSection from 'components/WorkSection';
import ProjectMenu from 'components/ProjectMenu';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

const InfoContainer = styled(Grid)`
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: left;
`;

const Info = styled(Grid)`
  padding: 18px;
`;

export default function ProjectDetail(props) {
  const { project, createWork } = props;

  return (
    <div>
      <Header
        back="/projects"
        title={project.title}
        headerActions={<ProjectMenu project={project} color="#fff" />}
      />
      <InfoContainer container>
        <Info item xs={12} sm={6}>
          {project.description}
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
            {project.budgetedTime}
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
  );
}
