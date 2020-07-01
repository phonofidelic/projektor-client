import React, { useState, useContext, useEffect } from 'react';
import { StringContext } from 'strings';
import styled from 'styled-components';
import matchSorter from 'match-sorter';

import WorkTable from 'components/ProjectDetail/WorkTable';
import WorkModal from 'components/ProjectDetail/WorkModal';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';
import WorkForm from 'components/WorkForm';
import SearchBar from 'components/SearchBar';

import Button from '@material-ui/core/Button';
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
  const [workItem, setWorkItem] = useState(null);
  const [workFormOpen, setWorkFormOpen] = useState(false);
  const [filterdWork, setFilteredWork] = useState(project.work);

  const handleOpenWork = (workItem) => {
    workItem ? setWorkItem(workItem) : setWorkItem(null);

    setWorkFormOpen(true);
  };

  const handleCloseWork = () => {
    setWorkItem(null);
    setWorkFormOpen(false);
  };

  const handleSearch = (query) => {
    setFilteredWork(matchSorter(project.work, query, { keys: ['notes'] }));
  };

  useEffect(() => setFilteredWork(project.work), [project.work]);

  return (
    <Container>
      <WorkModal
        open={workFormOpen}
        // workItem={workItem}
        handleClose={handleCloseWork}
        updateWork={updateWork}
      >
        <WorkForm
          project={project}
          workItem={workItem}
          handleClose={handleCloseWork}
          createWork={createWork}
          updateWork={updateWork}
        />
      </WorkModal>
      <div
        style={{
          margin: 18,
          display: 'flex',
          // justifyContent: 'space-between'
        }}
      >
        <Typography variant="h5" align="left">
          {strings.ttl__work}
        </Typography>
        <div
          style={{
            flex: 1,
            marginLeft: 5,
          }}
        >
          <SearchBar handleSearch={handleSearch} />
        </div>
        <Button variant="outlined" onClick={() => handleOpenWork(false)}>
          Add new Task
        </Button>
      </div>
      <WorkContainer>
        {filterdWork.length > 0 ? (
          <WorkTable
            work={filterdWork}
            handleOpenWork={handleOpenWork}
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
