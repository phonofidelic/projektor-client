import React from 'react';
import styled from 'styled-components';
import WorkTable from 'components/WorkTable';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const Description = styled.div`
  // margin-top: 80px;
  margin: 80px;
  text-align: left;
`;

export default function ProjectDetail(props) {
  const { project } = props;
  console.log('====================================');
  console.log(project);
  console.log('====================================');
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{project.title}</Typography>
        </Toolbar>
      </AppBar>
      <Description>
        <Typography>{project.description}</Typography>
      </Description>
      {project.work ? <WorkTable project={project} /> : <div>loading...</div>}
    </div>
  );
}
