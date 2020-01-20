import React, { useEffect, useContext } from 'react';
import { StringContext } from 'strings';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { Helmet } from 'react-helmet';
import requireAuth from 'hocs/requireAuth';

import ProjectsGrid from 'components/ProjectsGrid';
import Header from 'components/Header';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function HeaderActions(props) {
  const { emptyTrash } = props;
  const strings = useContext(StringContext);

  const handleEmptyTrash = () => {
    if (window.confirm(strings.msg__empty_trash_confirm)) {
      emptyTrash();
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Tooltip arrow title={strings.btn__empty_trash}>
        <IconButton onClick={handleEmptyTrash}>
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export function Removed(props) {
  const { preload, projects, getProjects, deleteAllTrash } = props;
  const strings = useContext(StringContext);

  const emptyTrash = () => {
    deleteAllTrash();
  };

  useEffect(() => {
    !preload && getProjects();
  }, [preload, getProjects]);

  return !projects ? null : (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {strings.ttl__removed}
        </title>
      </Helmet>
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
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    projects: state.projects.removedProjects
  };
};

export default connect(mapStateToProps, actions)(requireAuth(Removed));
