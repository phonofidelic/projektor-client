import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';
import requireAuth from 'hocs/requireAuth';

import ProjectsGrid from 'components/ProjectsGrid';
import Header from 'components/Header';

import Button from '@material-ui/core/Button';

function HeaderActions(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        style={{ textDecoratino: 'none', color: '#fff' }}
        component={Link}
        to="/projects/create"
      >
        New
      </Button>
    </div>
  );
}

function Projects(props) {
  const { projects } = props;

  useEffect(() => {
    props.getProjects();
  }, []);

  return projects.length > 0 ? (
    <div>
      <Header nav title="Projects" headerActions={<HeaderActions />} />
      <ProjectsGrid projects={projects} />
      <div>
        <Button onClick={props.logoutUser}>Sign out</Button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projectList
  };
};

export default connect(mapStateToProps, actions)(requireAuth(Projects));
