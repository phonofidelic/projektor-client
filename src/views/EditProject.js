import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as actions from 'actions';
import Header from 'components/Header';
import ProjectForm from 'components/ProjectForm';

export function EditProject(props) {
  const { projectId } = useParams();
  const { project, getProject, editProject } = props;

  useEffect(() => {
    getProject(projectId);
  }, [getProject, projectId]);

  const handleFormSubmit = data => {
    editProject(projectId, data);
  };

  return (
    <div>
      <Header back title={project && project.title} />
      {project && (
        <ProjectForm project={project} handleFormSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    project: state.projects.selectedProject
  };
};

export default connect(mapStateToProps, actions)(EditProject);
