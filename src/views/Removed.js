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
        Empty trash
      </Button>
    </div>
  );
}

export function Removed(props) {
  const { projects } = props;

  useEffect(() => {
    props.getProjects('deleted');
  }, []);

  return (
    <div>
      <Header nav title="Trash" headerActions={<HeaderActions />} />
      <div>
        <ProjectsGrid projects={projects} />
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

export default connect(mapStateToProps, actions)(requireAuth(Removed));