import React from 'react';
import { mockProjects } from './__mock_data';
import ProjectGrid from 'components/ProjectGrid';

export default {
  title: 'ProjectGrid',
  parameters: {
    component: ProjectGrid,
    componentSubtitle: 'Displays a grid of ProjectGridItems',
  },
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
