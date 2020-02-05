import React, { useEffect, useContext, useState } from 'react';
import { StringContext } from 'strings';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { Helmet } from 'react-helmet';
import requireAuth from 'hocs/requireAuth';
import { motion } from 'framer-motion';

import Header from 'components/Header';
import ProjectsGrid from 'components/ProjectsGrid';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';
import ProjectsStatusSelect from 'components/ProjectsStatusSelect';
import ProjectsDisplayControls from 'components/ProjectsDisplayControls';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { ACTIVE } from 'constants/status';
import { COMPACT, EXPANDED, TABLE } from 'constants/projectsDisplayModes';
import { pageVariants, getPageVariant } from 'constants/pageVariants';

function HeaderActions(props) {
  const strings = useContext(StringContext);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        transition: 'opacity 1s'
      }}
    >
      <Tooltip
        arrow
        title={strings.hnt__create_project}
        placement="top-start"
        enterDelay={400}
      >
        <IconButton
          style={{
            textDecoration: 'none'
            // backgroundColor: activeColor[400],
            // color: '#fff'
          }}
          component={Link}
          to="/projects/create"
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export function Projects(props) {
  const {
    preload,
    projects,
    activeProjects,
    archivedProjects,
    removedProjects,
    projectStatusView,
    pathname, // TODO: Remove
    getProjects,
    setProjectStatusView
  } = props;

  const strings = useContext(StringContext);

  const [projectsDisplayMode, setProjectsDisplayMode] = useState(COMPACT);

  const handleSelectDisplayMode = displayMode => {
    console.log('====================================');
    console.log('handleSelectDisplayMode, displayMode:', displayMode);
    console.log('====================================');
    setProjectsDisplayMode(displayMode);
  };

  useEffect(() => {
    !preload && getProjects();
  }, [preload, getProjects]);

  return !projects ? null : (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={getPageVariant('left')}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {strings.ttl__projects}
        </title>
      </Helmet>
      <Header
        nav
        title={strings.ttl__projects}
        headerActions={<HeaderActions />}
      >
        <ProjectsDisplayControls
          projectsDisplayMode={projectsDisplayMode}
          selectDisplayMode={handleSelectDisplayMode}
        />
        <ProjectsStatusSelect
          projectStatusView={projectStatusView}
          setProjectStatusView={setProjectStatusView}
        />
      </Header>

      <div>
        {projects.length ? (
          projectsDisplayMode === TABLE ? (
            <div>Table display</div>
          ) : (
            <ProjectsGrid
              key="projects-grid"
              projects={projects}
              projectsDisplayMode={projectsDisplayMode}
            />
          )
        ) : (
          <DefaultEmptyMessage
            key="default-empry-message"
            text={strings.msg__default_empty_active}
          />
        )}
      </div>
    </motion.div>
  );
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projectListByStatus,
    activeProjects: state.projects.activeProjects,
    archivedProjects: state.projects.archivedProjects,
    removedProjects: state.projects.removedProjects,
    projectStatusView: state.projects.projectStatusView,
    pathname: state.router.location.pathname
  };
};

export default connect(mapStateToProps, actions)(requireAuth(Projects));
