import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import requireAuth from 'hocs/requireAuth';

import ProjectsGrid from 'components/ProjectsGrid';
import Header from 'components/Header';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';

import { TTL__ARCHIVED } from 'constants/strings';

import Button from '@material-ui/core/Button';

export function Archived(props) {
  const { projects, getProjects } = props;

  useEffect(() => {
    getProjects('archived');
  }, [getProjects]);

  return (
    <div>
      <Header nav title={TTL__ARCHIVED} />
      <div>
        {projects.length ? (
          <ProjectsGrid projects={projects} />
        ) : (
          <DefaultEmptyMessage text="Archived Projects will show up here" />
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

export default connect(mapStateToProps, actions)(requireAuth(Archived));
