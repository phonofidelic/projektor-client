import React from 'react';
import { mockProjects } from './__mock_data';
import ProjectGrid from 'components/ProjectGrid';

export default {
  component: ProjectGrid,
  title: 'ProjectGrid',
  excludeStories: /.*Data$/,
};

export const projectsData = {
  projects: mockProjects,
};

export const Compact = () => (
  <ProjectGrid {...projectsData} projectsDisplayMode="compact" />
);

export const Expanded = () => (
  <ProjectGrid {...projectsData} projectsDisplayMode="expanded" />
);
