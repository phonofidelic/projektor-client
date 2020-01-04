import React, { useState, useContext } from 'react';
import { StringContext } from 'strings';
import styled from 'styled-components';

import WorkTable from 'components/ProjectDetail/WorkTable';
import WorkModal from 'components/ProjectDetail/WorkModal';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';

import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  border-top: solid #e0e0e0 1px;
  flex: 1;
`;

const WorkContainer = styled.div`
  // flex: 1;
`;

export default function WorkSection(props) {
  const { project, createWork, updateWork, removeWork } = props;
  const strings = useContext(StringContext);
  const [noteOpen, setNoteOpen] = useState(false);
  const [workItem, setWorkItem] = useState(null);

  const hadleOpenWork = work => {
    if (work) setWorkItem(work);
    setNoteOpen(true);
  };

  const handleCloseWork = () => {
    setNoteOpen(false);
    setWorkItem(null);
  };

  return (
    <Container>
      <WorkModal
        open={noteOpen}
        workItem={workItem}
        handleClose={handleCloseWork}
        updateWork={updateWork}
      />
      <div style={{ margin: 18, display: 'flex' }}>
        <Typography variant="h5" align="left">
          {strings.ttl__work}
        </Typography>
      </div>
      <WorkContainer>
        {project.work.length > 0 ? (
          <WorkTable
            project={project}
            hadleOpenWork={hadleOpenWork}
            removeWork={removeWork}
          />
        ) : (
          <DefaultEmptyMessage text={strings.msg__default_empty_work} />
        )}
      </WorkContainer>
      {/* <ActiveWork project={project} createWork={createWork} /> */}
    </Container>
  );
}
