import React, { useState, useContext, useEffect, useRef } from 'react';
import { StringContext } from 'strings';
import styled from 'styled-components';
import matchSorter from 'match-sorter';
import useMobileDetect from 'use-mobile-detect-hook';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import ContextualHelp from 'components/ContextualHelp';
import WorkTable from 'components/ProjectDetail/WorkTable';
import WorkList from './WorkList';
import WorkModal from 'components/ProjectDetail/WorkModal';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';
import WorkForm from 'components/WorkForm';
import SearchBar from 'components/SearchBar';
// import TaskKeywords from 'components/TaskKeywords';
import { TaskTable } from 'components/TaskAnalysis';

import { useTheme } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

const WORK_TABLE_VIEW = 'work_table';
const TASK_TABLE_VIEW = 'task_table';
// const WORK_DETAIL_VIEW = 'work_detail';
// const TASK_DETAIL_VIEW = 'task_detail';

const Container = styled.div`
  /* border-top: solid #e0e0e0 1px; */
  flex: 1;
`;

const WorkSectionHeader = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  position: ${({ isMobile }) => (isMobile ? 'sticky' : 'inherit')};
  top: ${({ theme }) => theme.dimensions.header.height}px;
  padding: 9px 18px;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  border-bottom: ${({ theme, isMobile, showBottomBorder }) =>
    isMobile && showBottomBorder
      ? `solid ${theme.palette.divider} 1px`
      : 'none'};
`;

const WorkSectionMain = styled.div``;

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
  const [workItem, setWorkItem] = useState({});
  const [workFormOpen, setWorkFormOpen] = useState(false);
  const [filterdWork, setFilteredWork] = useState(project.work);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [mainView, setMainView] = useState(WORK_TABLE_VIEW);
  const [showBottomBorder, setShowBottomBorder] = useState(false);

  const { isMobile } = useMobileDetect();

  const theme = useTheme();

  const createWorkButtonRef = useRef();
  const workSectionHeaderRef = useRef();

  const handleOpenWork = (workItem) => {
    setWorkItem(workItem);

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

  useScrollPosition(
    ({ prevPos, currPos }) => {
      setShowBottomBorder(currPos.y <= theme.dimensions.header.height);
    },
    [theme.dimensions.header.height],
    workSectionHeaderRef
  );

  useEffect(() => {
    setFilteredWork(project.work);
  }, [project.work]);

  // console.log('WorkSection, workItem:', workItem);

  return (
    <Container>
      <WorkModal open={workFormOpen} handleClose={handleCloseWork}>
        <WorkForm
          project={project}
          workItem={workItem}
          handleClose={handleCloseWork}
          createWork={createWork}
          updateWork={updateWork}
        />
      </WorkModal>
      {!project.isDemo && <Divider />}
      <WorkSectionHeader
        ref={workSectionHeaderRef}
        theme={theme}
        isMobile={isMobile()}
        showBottomBorder={showBottomBorder}
      >
        <div
          style={{
            display: 'flex',
            // justifyContent: 'space-between',
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
              marginRight: 16,
              lineHeight: '48px',
              cursor: 'pointer',

              borderBottom:
                mainView === WORK_TABLE_VIEW
                  ? `4px solid ${theme.palette.secondary.main}`
                  : 'none',
            }}
            color={mainView === WORK_TABLE_VIEW ? 'initial' : 'textSecondary'}
            onClick={() => setMainView(WORK_TABLE_VIEW)}
          >
            {strings.ttl__work}
          </Typography>
          <Typography
            noWrap
            variant="h6"
            align="left"
            style={{
              height: 48,
              lineHeight: '48px',
              cursor: 'pointer',
              borderBottom:
                mainView === TASK_TABLE_VIEW
                  ? `4px solid ${theme.palette.secondary.main}`
                  : 'none',
            }}
            color={mainView === TASK_TABLE_VIEW ? 'initial' : 'textSecondary'}
            onClick={() => setMainView(TASK_TABLE_VIEW)}
          >
            {strings.ttl__tasks}
          </Typography>
        </div>
        <div
          style={{
            flex: searchIsOpen ? 1 : 0,
            // maxWidth: 360,
            margin: 'auto',
          }}
        >
          <SearchBar
            placeholderMessage={strings.hnt__search_work}
            open={searchIsOpen}
            setOpen={setSearchIsOpen}
            handleSearch={handleSearch}
          />
        </div>
        {/* {!isMobile() && !project.isDemo && (
          <TaskKeywords project={project} handleSearch={handleSearch} />
        )} */}
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
        <div style={{ margin: 'auto' }}>
          <CreateWorkButton
            ref={createWorkButtonRef}
            handleOpenWork={handleOpenWork}
          />
        </div>
      </WorkSectionHeader>

      <WorkSectionMain>
        <Slide
          in={mainView === WORK_TABLE_VIEW}
          direction="right"
          mountOnEnter
          unmountOnExit
        >
          <div>
            {filterdWork.length > 0 ? (
              isMobile() ? (
                //<Slide in={true} direction="right" mountOnEnter unmountOnExit>
                <WorkList
                  work={filterdWork}
                  handleOpenWork={handleOpenWork}
                  removeWork={removeWork}
                />
              ) : (
                //</Slide>
                //<Slide in={true} direction="right" mountOnEnter unmountOnExit>
                <WorkTable
                  work={filterdWork}
                  handleOpenWork={handleOpenWork}
                  removeWork={removeWork}
                />
                //</Slide>
              )
            ) : (
              <DefaultEmptyMessage text={strings.msg__default_empty_work} />
            )}
          </div>
        </Slide>
        <Slide
          in={mainView === TASK_TABLE_VIEW}
          direction="left"
          mountOnEnter
          unmountOnExit
        >
          <div>
            <TaskTable project={project} />
          </div>
        </Slide>
      </WorkSectionMain>
      {/* <ActiveWork project={project} createWork={createWork} /> */}
    </Container>
  );
}
