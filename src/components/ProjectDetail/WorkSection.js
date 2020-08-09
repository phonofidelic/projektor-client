import React, { useState, useContext, useEffect } from 'react';
import { StringContext } from 'strings';
import styled from 'styled-components';
import matchSorter from 'match-sorter';
import useMobileDetect from 'use-mobile-detect-hook';

import WorkTable from 'components/ProjectDetail/WorkTable';
import WorkList from './WorkList';
import WorkModal from 'components/ProjectDetail/WorkModal';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';
import WorkForm from 'components/WorkForm';
import SearchBar from 'components/SearchBar';
import TaskAnalysis from 'components/TaskAnalysis';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

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

  const { isMobile } = useMobileDetect();

  const handleOpenWork = workItem => {
    workItem ? setWorkItem(workItem) : setWorkItem(null);

    setWorkFormOpen(true);
  };

  const handleCloseWork = () => {
    setWorkItem(null);
    setWorkFormOpen(false);
  };

  const handleSearch = query => {
    // console.log('handleSearch, query:', query);
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
          display: 'flex'
          // justifyContent: 'space-between'
        }}
      >
        <Typography
          variant="h5"
          align="left"
          style={{
            height: 48,
            lineHeight: '48px'
          }}
        >
          {strings.ttl__work}
        </Typography>
        <div
          style={{
            flex: 1,
            marginLeft: 5
          }}
        >
          <SearchBar handleSearch={handleSearch} />
        </div>
        {!isMobile() && (
          <TaskAnalysis project={project} handleSearch={handleSearch} />
        )}
        <IconButton variant="outlined" onClick={() => handleOpenWork(false)}>
          <AddIcon />
        </IconButton>
      </div>
      <WorkContainer>
        {filterdWork.length > 0 ? (
          isMobile() ? (
            <WorkList
              work={filterdWork}
              handleOpenWork={handleOpenWork}
              removeWork={removeWork}
            />
          ) : (
            <WorkTable
              work={filterdWork}
              handleOpenWork={handleOpenWork}
              removeWork={removeWork}
            />
          )
        ) : (
          <DefaultEmptyMessage text={strings.msg__default_empty_work} />
        )}
      </WorkContainer>
      {/* <ActiveWork project={project} createWork={createWork} /> */}
    </Container>
  );
}
