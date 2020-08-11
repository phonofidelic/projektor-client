import React, { useEffect, useContext, useState } from 'react';
import { StringContext } from 'strings';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { Helmet } from 'react-helmet';
import requireAuth from 'hocs/requireAuth';
import { motion } from 'framer-motion';
import useMobileDetect from 'use-mobile-detect-hook';

import Header from 'components/Header';
import ProjectGrid from 'components/ProjectGrid';
import ProjectTable from 'components/ProjectTable';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';
import ProjectsStatusSelect from 'components/ProjectsStatusSelect';
import ProjectsDisplayControls from 'components/ProjectsDisplayControls';
import SearchBar from 'components/SearchBar';
import CreateProjectButton from 'components/CreateProjectButton';

import { COMPACT, TABLE } from 'constants/projectsDisplayModes';
import { getPageVariant } from 'constants/pageVariants';
import { ACTIVE } from 'constants/status';

export function Projects(props) {
  const {
    preload,
    projects,
    projectStatusView,
    getProjects,
    setProjectStatusView,
    searchProjects
  } = props;

  const { isMobile } = useMobileDetect();

  const strings = useContext(StringContext);

  const [projectsDisplayMode, setProjectsDisplayMode] = useState(
    localStorage.getItem('projectsDisplayMode') || COMPACT
  );

  const handleSelectDisplayMode = displayMode => {
    localStorage.setItem('projectsDisplayMode', displayMode);
    setProjectsDisplayMode(displayMode);
  };

  useEffect(() => {
    !preload && getProjects();
    getProjects();
  }, [preload, getProjects]);

  console.log('Projects view, setProjectStatusView:', projectStatusView);

  return !projects ? (
    <div>Loading...</div>
  ) : (
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
        position={isMobile() ? 'fixed' : 'relative'}
      >
        <SearchBar handleSearch={searchProjects} />
        {!isMobile() && (
          <ProjectsDisplayControls
            projectsDisplayMode={projectsDisplayMode}
            selectDisplayMode={handleSelectDisplayMode}
          />
        )}
        <ProjectsStatusSelect
          projectStatusView={projectStatusView}
          setProjectStatusView={setProjectStatusView}
        />
        {projectStatusView === ACTIVE && <CreateProjectButton />}
      </Header>

      <div>
        {projects.length ? (
          !isMobile() && projectsDisplayMode === TABLE ? (
            <ProjectTable key="projects-table" projects={projects} />
          ) : (
            <ProjectGrid
              key="projects-grid"
              projects={projects}
              projectsDisplayMode={projectsDisplayMode}
            />
          )
        ) : (
          <DefaultEmptyMessage
            key="default-empty-message"
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
