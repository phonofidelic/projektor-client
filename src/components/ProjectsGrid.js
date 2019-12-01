import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import mockProjects from 'utils/mockProjects';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: 'hidden';
  text-align: left;
`;

const StyledGridItem = styled(Grid)`
  padding: 20px;
  // border: 1px solid red;
`;

const ProjectInfoContainer = styled.div`
  // display: flex;
  // justify-content: space-around;
`;

export default function ProjectGrid(props) {
  return (
    <Container>
      <Grid container>
        {mockProjects.map(project => (
          <StyledGridItem
            key={project.id}
            item
            xs={12}
            sm={6}
            md={4}
            component={Link}
            to={`project/${project.id}`}
            onClick={() => props.handleProjectSelection(project.id)}
          >
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {project.title}
                  </Typography>
                  <ProjectInfoContainer>
                    <Typography variant="overline">Start Date:</Typography>{' '}
                    {moment(project.startDate).format('ddd, MMM Do YYYY')}
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
              <LinearProgress
                value={(project.timeUsed / project.budgetedTime) * 100}
                variant="determinate"
                style={{ height: 20 }}
              />
            </Card>
          </StyledGridItem>
        ))}
      </Grid>
    </Container>
  );
}
