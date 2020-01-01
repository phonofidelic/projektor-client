import React from 'react';

import ProjectGridItem from 'components/ProjectGridItem';

import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: 'hidden';
  text-align: left;
  padding: 0 10px;
`;

export default function ProjectGrid(props) {
  const { projects } = props;

  return (
    <Container>
      <Grid container>
        {projects.map(project => (
          <ProjectGridItem key={project._id} project={project} />
        ))}
      </Grid>
    </Container>
  );
}
