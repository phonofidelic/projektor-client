import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import Header from 'components/Header';
import ProjectForm from 'components/ProjectForm';

export function CreateProject(props) {
  const handleFormSubmit = data => {
    props.createProject(data);
  };
  return (
    <div>
      <Header back="/projects" centerTitle title="Create Project" />
      <ProjectForm handleFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default connect(null, actions)(CreateProject);
