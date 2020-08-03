import React from 'react';
import ProjectTable from 'components/ProjectTable';
import mockProjects from 'utils/mockProjects';

export default {
  component: ProjectTable,
  title: 'ProjectTable'
};

export const Default = () => <ProjectTable projects={mockProjects} />;
