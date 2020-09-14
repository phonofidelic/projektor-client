import React, { useEffect, useContext, useState } from 'react';
import { StringContext } from 'strings';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import useMobileDetect from 'use-mobile-detect-hook';
import { useAuth, requireAuth } from 'services/AuthProvider';

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

import Typography from '@material-ui/core/Typography';

export function Projects(props) {
  const {
    preload,
    projects,
    projectStatusView,
    getProjects,
    setProjectStatusView,
    searchProjects
  } = props;

  const { getAccessTokenSilently } = useAuth();

  const { isMobile } = useMobileDetect();

  const strings = useContext(StringContext);

  const [projectsDisplayMode, setProjectsDisplayMode] = useState(
    localStorage.getItem('projectsDisplayMode') || COMPACT
  );

  const [searchIsOpen, setSearchIsOpen] = useState(false);

  const handleSelectDisplayMode = displayMode => {
    localStorage.setItem('projectsDisplayMode', displayMode);
    setProjectsDisplayMode(displayMode);
  };

  const handleSearch = async query => {
    const token = await getAccessTokenSilently();

    searchProjects(query, token);
  };

  useEffect(() => {
    // !preload && getProjects();
    // getProjects();

    const loadProjects = async () => {
      const token = await getAccessTokenSilently();
      getProjects(token);
    };
    !preload && loadProjects();
    // loadProjects();
  }, [preload, getProjects, getAccessTokenSilently]);

  // console.log('Projects view, setProjectStatusView:', projectStatusView);

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
        // title={strings.ttl__projects}
        position={isMobile() ? 'fixed' : 'unset'}
      >
        <div
          style={{
            padding: searchIsOpen && isMobile() ? 0 : 12,
            // flexGrow: 2,
            width: searchIsOpen && isMobile() ? 0 : '100%',
            textAlign: 'left',
            transition: 'all ease-in-out 0.1s'
          }}
        >
          <Typography
            noWrap
            variant="h5"
            style={{
              // lineHeight: '24px',
              maxWidth: isMobile() ? '50vw' : '100%'
            }}
          >
            {strings.ttl__projects}
          </Typography>
        </div>
        <div
          style={{
            // flexGrow: 2
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <SearchBar
            placeholderMessage={strings.hnt__search_projects}
            open={searchIsOpen}
            setOpen={setSearchIsOpen}
            handleSearch={handleSearch}
          />
        </div>
        {!isMobile() && (
          <ProjectsDisplayControls
            projectsDisplayMode={projectsDisplayMode}
            selectDisplayMode={handleSelectDisplayMode}
          />
        )}
        <ProjectsStatusSelect
          searchIsOpen={searchIsOpen}
          projectStatusView={projectStatusView}
          setProjectStatusView={setProjectStatusView}
        />
        <div>{projectStatusView === ACTIVE && <CreateProjectButton />}</div>
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
    // activeProjects: state.projects.activeProjects,
    // archivedProjects: state.projects.archivedProjects,
    // removedProjects: state.projects.removedProjects,
    projectStatusView: state.projects.projectStatusView,
    pathname: state.router.location.pathname
  };
};

export default connect(mapStateToProps, actions)(requireAuth(Projects));
