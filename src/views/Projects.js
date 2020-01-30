import React, { useEffect, useContext } from 'react';
import { StringContext } from 'strings';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { Helmet } from 'react-helmet';
import requireAuth from 'hocs/requireAuth';

import ProjectsGrid from 'components/ProjectsGrid';
import Header from 'components/Header';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

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
  const { preload, projects, pathname, getProjects } = props;
  const strings = useContext(StringContext);

  useEffect(() => {
    !preload && getProjects();
  }, [preload, getProjects]);

  console.log('====================================');
  console.log('Projects, pathname:', pathname);
  console.log('====================================');

  return !projects ? null : (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {strings.ttl__active}
        </title>
      </Helmet>
      <Header
        nav
        title={strings.ttl__active}
        headerActions={<HeaderActions />}
      />
      <div
        style={{ textAlign: 'left', padding: 10, margin: 10, display: 'flex' }}
      >
        Toolbar {pathname}
      </div>
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
    projects: state.projects.activeProjects,
    pathname: state.router.location.pathname
  };
};

export default connect(mapStateToProps, actions)(requireAuth(Projects));
