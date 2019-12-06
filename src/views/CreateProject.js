import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { useHistory } from 'react-router-dom';
import Header from 'components/Header';
import ProjectForm from 'components/ProjectForm';

function CreateProject(props) {
  const history = useHistory();

  const handleFormSubmit = data => {
    props.createProject(data, history);
  };
  return (
    <div>
      <Header back="/projects" centerTitle title="Create Project" />
      <ProjectForm handleFormSubmit={handleFormSubmit} />
    </div>
  );
}

const mapStateToProps = state => {
  return {};
};

export default connect(null, actions)(CreateProject);
