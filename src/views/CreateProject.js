import React, { useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import Header from 'components/Header';
import ProjectForm from 'components/ProjectForm';
import { StringContext } from 'strings';

export function CreateProject(props) {
  const strings = useContext(StringContext);

  const handleFormSubmit = data => {
    props.createProject(data);
  };
  return (
    <div>
      <Header
        back="/projects"
        centerTitle
        title={strings.ttl__create_project}
      />
      <ProjectForm handleFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default connect(null, actions)(CreateProject);
