import React from 'react';
import styled from 'styled-components';
// import { ACTIVE, ARCHIVED, DELETED } from 'constants/status';

import ProjectGridItem from 'components/ProjectGridItem';

import Grid from '@material-ui/core/Grid';

/**
 * Add location prop based on Project status
 */
// const withProjectLocation = projects => {
//   return projects.map(project => {
//     switch (project.status) {
//       case ACTIVE:
//         project.location = '/projects';
//         return project;

//       case ARCHIVED:
//         project.location = '/archived';
//         return project;

//       case DELETED:
//         project.location = '/removed';
//         return project;

//       default:
//         return project;
//     }
//   });
// };

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: 'hidden';
  text-align: left;
  padding: 10px;
`;

function ProjectGrid(props) {
  const { projects } = props;
  // const projectsWithLocation = withProjectLocation(projects);

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

export default ProjectGrid;
