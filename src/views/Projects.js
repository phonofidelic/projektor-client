import React, { useEffect, useContext, useState } from 'react';
import { StringContext } from 'strings';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { Helmet } from 'react-helmet';
import requireAuth from 'hocs/requireAuth';

import Header from 'components/Header';
import ProjectsGrid from 'components/ProjectsGrid';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';
import ProjectsToolbar from 'components/ProjectsToolbar';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { ACTIVE } from 'constants/status';

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
  // const [filteredProjects, setFilteredProjects] = useState(
  //   projects.filter(project => project.status === ACTIVE)
  // );

  useEffect(() => {
    !preload && getProjects();
  }, [preload, getProjects]);

  console.log('====================================');
  console.log('Projects, projectStatusView:', projectStatusView);
  console.log('====================================');

  return !projects ? null : (
    <div>
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
      />
      <ProjectsToolbar
        projectStatusView={projectStatusView}
        setProjectStatusView={setProjectStatusView}
      />
      <div>
        {projects.length ? (
          <ProjectsGrid projects={projects} />
        ) : (
          <DefaultEmptyMessage text={strings.msg__default_empty_active} />
        )}
      </div>
    </div>
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
