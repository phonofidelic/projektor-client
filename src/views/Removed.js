import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import requireAuth from 'hocs/requireAuth';

import ProjectsGrid from 'components/ProjectsGrid';
import Header from 'components/Header';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';

import { TTL__DELETED } from 'constants/strings';

import Button from '@material-ui/core/Button';

function HeaderActions(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button style={{ color: '#fff' }} onClick={props.emptyTrash}>
        Empty trash
      </Button>
    </div>
  );
}

export function Removed(props) {
  const { projects, getProjects, deleteAllTrash } = props;

  const emptyTrash = () => {
    deleteAllTrash();
  };

  useEffect(() => {
    getProjects('deleted');
  }, [getProjects]);

  return (
    <div>
      <Header
        nav
        title={TTL__DELETED}
        headerActions={<HeaderActions emptyTrash={emptyTrash} />}
      />
      <div>
        {projects.length ? (
          <ProjectsGrid projects={projects} />
        ) : (
          <DefaultEmptyMessage text="Removed Projects will show up here" />
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

export default connect(mapStateToProps, actions)(requireAuth(Removed));
