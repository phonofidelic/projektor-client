import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';
import requireAuth from 'hocs/requireAuth';

import ProjectsGrid from 'components/ProjectsGrid';
import Header from 'components/Header';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';

import { TTL__ACTIVE } from 'constants/strings';

import Button from '@material-ui/core/Button';

function HeaderActions(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        style={{ textDecoration: 'none', color: '#fff' }}
        component={Link}
        to="/projects/create"
      >
        New
      </Button>
    </div>
  );
}

export function Projects(props) {
  const { projects, getProjects } = props;

  useEffect(() => {
    getProjects('active');
  }, [getProjects]);

  return (
    <div>
      <Header nav title={TTL__ACTIVE} headerActions={<HeaderActions />} />
      <div>
        {projects.length ? (
          <ProjectsGrid projects={projects} />
        ) : (
          <DefaultEmptyMessage text="Add a project to get started" />
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
