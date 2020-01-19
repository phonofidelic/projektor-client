import React, { useEffect, useContext } from 'react';
import { StringContext } from 'strings';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { Helmet } from 'react-helmet';
import requireAuth from 'hocs/requireAuth';

import ProjectsGrid from 'components/ProjectsGrid';
import Header from 'components/Header';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';

export function Archived(props) {
  const { preload, projects, getProjects } = props;
  const strings = useContext(StringContext);

  useEffect(() => {
    !preload && getProjects('archived');
  }, [getProjects]);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {strings.ttl__archived}
        </title>
      </Helmet>
      <Header nav title={strings.ttl__archived} />
      <div>
        {projects.length ? (
          <ProjectsGrid projects={projects} />
        ) : (
          <DefaultEmptyMessage text={strings.msg__default_empty_archived} />
        )}
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
