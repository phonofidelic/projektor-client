import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ProjectMenu from 'components/ProjectMenu';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const StyledGridItem = styled(Grid)`
  padding: 20px;
  // border: 1px solid red;
  text-decoration: none;
`;

const CardHeader = styled.div`
  display: flex;
  padding: 16px;
`;

const ProjectInfoContainer = styled.div`
  // display: flex;
  // justify-content: space-around;
`;

export default function ProjectGridItem(props) {
  const { project } = props;

  return (
    <StyledGridItem key={project._id} item xs={12} sm={6} md={4}>
      <Card>
        <CardHeader>
          <Typography
            style={{ flexGrow: 1 }}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {project.title}
          </Typography>
          <ProjectMenu project={project} />
        </CardHeader>
        <CardActionArea component={Link} to={`projects/${project._id}`}>
          <CardContent>
            <ProjectInfoContainer>
              <Typography variant="overline">Start Date:</Typography>{' '}
              {project.startDate
                ? moment(project.startDate).format('ddd, MMM Do YYYY')
                : 'TBD'}
              <br />
              <Typography variant="overline">Dealine:</Typography>{' '}
              {project.deadline
                ? moment(project.deadline).format('ddd, MMM Do YYYY')
                : 'open'}
            </ProjectInfoContainer>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ height: 100, overflowY: 'auto' }}
            >
              {project.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <div style={{ height: 20 }}>
          {project.budgetedTime && (
            <LinearProgress
              value={(project.timeUsed / (project.budgetedTime * 3.6e6)) * 100}
              variant="determinate"
              style={{ height: 20 }}
            />
          )}
        </div>
      </Card>
    </StyledGridItem>
  );
}
