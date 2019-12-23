import React, { useEffect, useContext } from 'react';
import { StringContext } from 'strings';
import { connect } from 'react-redux';
import * as actions from 'actions';
import requireAuth from 'hocs/requireAuth';

import ProjectsGrid from 'components/ProjectsGrid';
import Header from 'components/Header';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';

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
  const strings = useContext(StringContext);

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
        title={strings.ttl__removed}
        headerActions={<HeaderActions emptyTrash={emptyTrash} />}
      />
      <div>
        {projects.length ? (
          <ProjectsGrid projects={projects} />
        ) : (
          <DefaultEmptyMessage text={strings.msg__default_empty_removed} />
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
