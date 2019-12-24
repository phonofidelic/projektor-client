import React, { useEffect, useContext } from 'react';
import { StringContext } from 'strings';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';
import requireAuth from 'hocs/requireAuth';

import ProjectsGrid from 'components/ProjectsGrid';
import Header from 'components/Header';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

function HeaderActions(props) {
  const strings = useContext(StringContext);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Tooltip
        title={strings.btn__create_project}
        placement="top-start"
        enterDelay={400}
      >
        <IconButton
          style={{ textDecoration: 'none', color: '#fff' }}
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
  const { projects, getProjects } = props;
  const strings = useContext(StringContext);

  useEffect(() => {
    getProjects('active');
  }, [getProjects]);

  return (
    <div>
      <Header
        nav
        title={strings.ttl__active}
        headerActions={<HeaderActions />}
      />
      <div>
        {projects.length ? (
          <ProjectsGrid projects={projects} />
        ) : (
          <DefaultEmptyMessage text={strings.msg__default_empty_active} />
        )}
        <div>
          <Button onClick={props.logoutUser}>Sign out</Button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projectList
  };
};

export default connect(mapStateToProps, actions)(requireAuth(Projects));
