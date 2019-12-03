import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import WorkTable from 'components/WorkTable';
import Header from 'components/Header';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const InfoContainer = styled(Grid)`
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: left;
`;

const Info = styled(Grid)`
  padding: 18px;
`;

export default function ProjectDetail(props) {
  const { project } = props;

  return (
    <div>
      <Header back="/projects" title={project.title} />
      <InfoContainer container>
        <Info item xs={12} sm={6}>
          {project.description}
        </Info>
        <Info item xs={12} sm={6}>
          <div>
            <Typography variant="overline">Client</Typography> {project.client}
          </div>
          <div>
            <Typography variant="overline">
              Start Date:{' '}
              {project.startDate
                ? moment(project.startDate).format('ddd, MMM Do YYYY')
                : 'TBD'}
            </Typography>
          </div>
          <div>
            <Typography variant="overline">
              Deadline:{' '}
              {project.deadline
                ? moment(project.deadline).format('ddd, MMM Do YYYY')
                : 'open'}
            </Typography>
          </div>
        </Info>
      </InfoContainer>
      {project.work ? <WorkTable project={project} /> : <div>loading...</div>}
    </div>
  );
}
