import React, { setState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: left;
  padding: 10px;
  margin: 10px;
  display: flex;
`;

export default function(props) {
  const { projectStatusView } = props;
  return <Container>Toolbar {projectStatusView}</Container>;
}
