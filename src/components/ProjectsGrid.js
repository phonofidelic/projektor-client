import React from 'react';
import moment from 'moment';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';

import styled from 'styled-components';

const mockProjects = [
  {
    id: 1,
    title: 'Test Project 1',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    budgetedTime: 8,
    timeUsed: 6,
    startDate: 1575153708162,
    deadline: null,
    work: []
  },
  {
    id: 2,
    title: 'Test Project 2',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    budgetedTime: 40,
    timeUsed: 8,
    startDate: 1575153708162,
    deadline: null,
    work: []
  },
  {
    id: 3,
    title: 'Test Project 3',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    budgetedTime: 16,
    timeUsed: 4,
    startDate: 1575153708162,
    deadline: null,
    work: []
  },
  {
    id: 4,
    title: 'Test Project 4',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    budgetedTime: 16,
    timeUsed: 10,
    startDate: 1575153708162,
    deadline: null,
    work: []
  }
];

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

export default function CenteredGrid() {
  return (
    <Container>
      <Grid container>
        {mockProjects.map(project => (
          <StyledGridItem key={project.id} item xs={12} sm={6} md={4}>
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
