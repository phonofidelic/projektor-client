import React from 'react';
import styled from 'styled-components';

import ProjectInfo from 'components/ProjectDetail/ProjectInfo';
import WorkSection from 'components/ProjectDetail/WorkSection';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { strings } from 'strings';

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
          <Typography>
            {project.description === 'No description provided'
              ? strings.msg__empty_project_description
              : project.description}
          </Typography>
        </Info>
        <ProjectInfo project={project} />
      </InfoContainer>
      <WorkSection project={project} createWork={createWork} />
    </div>
  ) : (
    <div>Loading...</div>
  );
}
