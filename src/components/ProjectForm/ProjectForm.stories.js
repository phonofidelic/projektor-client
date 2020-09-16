import React from 'react';
import ProjectForm from 'components/ProjectForm';
import { mockProject } from './__mock_data';

export default {
  component: ProjectForm,
  title: 'ProjectForm',
  excludeStories: /.*Data$/,
};

export const projectData = {
  project: mockProject,
};

export const Default = () => <ProjectForm />;

export const EditMode = () => <ProjectForm {...projectData} />;
