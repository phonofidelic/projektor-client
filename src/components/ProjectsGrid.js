import React from 'react';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import styled from 'styled-components';

const mockProjects = [
  {
    id: 1,
    title: 'Test Project 1',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    budgetedTime: 8,
    timeUsed: 0,
    deadline: null,
    work: []
  },
  {
    id: 2,
    title: 'Test Project 2',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    budgetedTime: 40,
    timeUsed: 0,
    deadline: null,
    work: []
  },
  {
    id: 3,
    title: 'Test Project 3',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    budgetedTime: 16,
    timeUsed: 0,
    deadline: null,
    work: []
  },
  {
    id: 4,
    title: 'Test Project 4',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    budgetedTime: 16,
    timeUsed: 0,
    deadline: null,
    work: []
  }
];

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: 'hidden';
`;

const StyledGridList = styled(GridList)`
  width: 100%;
  // border: 1px solid red;
`;

const StyledGridListTile = styled(GridListTile)`
  // border: 1px solid blue;
  padding: 5px;
`;

export default function CenteredGrid() {
  return (
    <Container>
      <StyledGridList cellHeight={180} cols={3} spacing={4}>
        {mockProjects.map(project => (
          <StyledGridListTile key={project.id} cols={1}>
            <div>{project.title}</div>
            <div>{project.description}</div>
          </StyledGridListTile>
        ))}
      </StyledGridList>
    </Container>
  );
}
