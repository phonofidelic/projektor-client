import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';
import requireAuth from 'hocs/requireAuth';

import ProjectsGrid from 'components/ProjectsGrid';
import Header from 'components/Header';

import Button from '@material-ui/core/Button';

export function Archived(props) {
  const { projects } = props;

  useEffect(() => {
    props.getProjects('archived');
  }, []);

  return (
    <div>
      <Header nav title="Archive" />
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

export default connect(mapStateToProps, actions)(requireAuth(Archived));
