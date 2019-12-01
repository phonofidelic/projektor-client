import React from 'react';
import styled from 'styled-components';

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
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{props.project.title}</Typography>
        </Toolbar>
      </AppBar>
      <Description>
        <Typography>{props.project.description}</Typography>
      </Description>
    </div>
  );
}
