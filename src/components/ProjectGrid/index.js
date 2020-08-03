import React from 'react';
import styled from 'styled-components';
// import { AnimatePresence } from 'framer-motion';

import ProjectGridItem from 'components/ProjectGridItem';

import Grid from '@material-ui/core/Grid';

/**
 * Add location prop based on Project status
 */
// const withProjectLocation = projects => {
//   return projects.map(project => {
//     switch (project.status) {
//       case ACTIVE:
//         project.location = 'active';
//         return project;

//       case ARCHIVED:
//         project.location = 'archived';
//         return project;

//       case DELETED:
//         project.location = 'removed';
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
  padding-top: 0px;
  transition: all 5s;
`;

/**
 * This component is displayed when the projectsDisplayMode is set to "compact" or "expanded".
 * Grid tiles can be expanded by toggling the display mode in the Header component.
 */

function ProjectGrid(props) {
  const { projects, projectsDisplayMode } = props;
  // const projectsWithLocation = withProjectLocation(projects);

  return (
    <Container>
      <Grid container spacing={1}>
        {/* <AnimatePresence> */}
        {projects.map((project) => (
          <ProjectGridItem
            key={project._id}
            project={project}
            projectsDisplayMode={projectsDisplayMode}
          />
        ))}
        {/* </AnimatePresence> */}
      </Grid>
    </Container>
  );
}

export default ProjectGrid;
