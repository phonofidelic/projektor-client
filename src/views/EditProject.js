import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as actions from 'actions';
import { StringContext } from 'strings';
import { Helmet } from 'react-helmet';
import requireAuth from 'hocs/requireAuth';

import Header from 'components/Header';
import ProjectForm from 'components/ProjectForm';

export function EditProject(props) {
  const { projectId } = useParams();
  const { project, getProject, editProject } = props;
  const strings = useContext(StringContext);

  useEffect(() => {
    getProject(projectId);
  }, [getProject, projectId]);

  const handleFormSubmit = data => {
    editProject(projectId, data);
  };

  return project ? (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {project.title}
        </title>
      </Helmet>
      <Header back title={project.title} />
      <ProjectForm project={project} handleFormSubmit={handleFormSubmit} />
    </div>
  ) : (
    <div>loading...</div>
  );
}

const mapStateToProps = state => {
  return {
    project: state.projects.selectedProject
  };
};

export default connect(mapStateToProps, actions)(requireAuth(EditProject));
