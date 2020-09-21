import React, { useState, useContext, useEffect, useRef } from 'react';
import { StringContext } from 'strings';
import styled from 'styled-components';
import matchSorter from 'match-sorter';
import useMobileDetect from 'use-mobile-detect-hook';

import ContextualHelp from 'components/ContextualHelp';
import WorkTable from 'components/ProjectDetail/WorkTable';
import WorkList from './WorkList';
import WorkModal from 'components/ProjectDetail/WorkModal';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';
import WorkForm from 'components/WorkForm';
import SearchBar from 'components/SearchBar';
import TaskAnalysis from 'components/TaskAnalysis';

import { useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

const Container = styled.div`
  /* border-top: solid #e0e0e0 1px; */
  flex: 1;
`;

const WorkContainer = styled.div`
  // flex: 1;
`;

const CreateWorkButton = React.forwardRef((props, ref) => (
  <IconButton
    ref={ref}
    variant="outlined"
    onClick={() => props.handleOpenWork(false)}
  >
    <AddIcon />
  </IconButton>
));

export default function WorkSection(props) {
  const { project, createWork, updateWork, removeWork } = props;
  const strings = useContext(StringContext);
  const [workItem, setWorkItem] = useState(null);
  const [workFormOpen, setWorkFormOpen] = useState(false);
  const [filterdWork, setFilteredWork] = useState(project.work);
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  const { isMobile } = useMobileDetect();

  const theme = useTheme();

  const createWorkButtonRef = useRef();

  const handleOpenWork = (workItem) => {
    workItem ? setWorkItem(workItem) : setWorkItem(null);

    setWorkFormOpen(true);
  };

  const handleCloseWork = () => {
    setWorkItem(null);
    setWorkFormOpen(false);
  };

  const handleSearch = (query) => {
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
      {!project.isDemo && <Divider />}
      <div
        style={{
          backgroundColor: theme.palette.background.default,
          // borderTop: 'solid #e0e0e0 1px',
          position: isMobile() ? 'sticky' : 'inherit',
          top: theme.dimensions.projectDetailHeader.height,
          padding: '9px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 1,
        }}
      >
        <div
          style={{
            flex: searchIsOpen ? 0 : 1,
            width: searchIsOpen && isMobile() ? 0 : 'inherit',
            transition: 'all ease-in-out 0.1s',
          }}
        >
          <Typography
            noWrap
            variant="h6"
            align="left"
            style={{
              height: 48,
              lineHeight: '48px',
            }}
          >
            {strings.ttl__work}
          </Typography>
        </div>
        <div style={{ flex: searchIsOpen ? 1 : 0 }}>
          <SearchBar
            placeholderMessage={strings.hnt__search_work}
            open={searchIsOpen}
            setOpen={setSearchIsOpen}
            handleSearch={handleSearch}
          />
        </div>
        {!isMobile() && !project.isDemo && (
          <TaskAnalysis project={project} handleSearch={handleSearch} />
        )}
        <ContextualHelp
          childRef={createWorkButtonRef}
          open={project.isDemo}
          text={strings.hnt__demo_create_work}
          uiBackground={theme.palette.background.default}
          backdropBackground={theme.palette.action.active}
          tooltipBackground={theme.palette.background.default}
          focusComponent={
            <CreateWorkButton
              ref={createWorkButtonRef}
              handleOpenWork={handleOpenWork}
            />
          }
          focusClickAction={handleOpenWork}
        />
        <CreateWorkButton
          ref={createWorkButtonRef}
          handleOpenWork={handleOpenWork}
        />
        {/* <IconButton
          ref={createWorkButtonRef}
          variant="outlined"
          onClick={() => handleOpenWork(false)}
        >
          <AddIcon />
        </IconButton> */}
        {/* </ContextualHelp> */}
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
