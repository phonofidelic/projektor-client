import React from 'react';
import styled from 'styled-components';

import ProjectInfo from 'components/ProjectDetail/ProjectInfo';
import WorkSection from 'components/ProjectDetail/WorkSection';
import ActiveWork from 'components/ProjectDetail/ActiveWork';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { strings } from 'strings';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const InfoContainer = styled(Grid)`
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: left;
  height: 201px;
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

export default function ProjectDetail(props) {
  const { project, createWork, updateWork, removeWork } = props;

  return project ? (
    <Container>
      <InfoContainer container>
        <Description item xs={12} sm={6} lg={8}>
          {project.description === 'No description provided' ||
          project.description === '' ? (
            <Typography color="textSecondary">
              {strings.msg__empty_project_description}
            </Typography>
          ) : (
            <Typography>{project.description}</Typography>
          )}
        </Description>
        <ProjectInfoContainer item xs={12} sm={6} lg={4}>
          <ProjectInfo project={project} />
        </ProjectInfoContainer>
      </InfoContainer>
      <WorkSection
        project={project}
        createWork={createWork}
        updateWork={updateWork}
        removeWork={removeWork}
      />
      <ActiveWork project={project} createWork={createWork} />
    </Container>
  ) : (
    <div>Loading...</div>
  );
}
