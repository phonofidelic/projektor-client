import React from 'react';
import styled from 'styled-components';
import WorkTable from 'components/WorkTable';
import Header from 'components/Header';

import Typography from '@material-ui/core/Typography';

const Description = styled.div`
  // margin-top: 80px;
  margin: 80px;
  text-align: left;
`;

export default function ProjectDetail(props) {
  const { project } = props;

  return (
    <div>
      <Header back="/projects" title={project.title} />
      <Description>
        <Typography>{project.description}</Typography>
      </Description>
      {project.work ? <WorkTable project={project} /> : <div>loading...</div>}
    </div>
  );
}
