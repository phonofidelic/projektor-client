import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import WorkTable from 'components/WorkTable';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackArrow from '@material-ui/icons/ArrowBack';

const Description = styled.div`
  // margin-top: 80px;
  margin: 80px;
  text-align: left;
`;

export default function ProjectDetail(props) {
  const { project } = props;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            style={{ marginRight: 25, textDecoration: 'none' }}
            component={Link}
            to="/projects"
            replace
          >
            <BackArrow style={{ color: '#fff' }} />
          </IconButton>
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
