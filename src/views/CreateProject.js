import React from 'react';
import Header from 'components/Header';
import ProjectForm from 'components/ProjectForm';

export default function CreateProject(props) {
  return (
    <div>
      <Header backButton title="Create Project" />
      <ProjectForm />
    </div>
  );
}
