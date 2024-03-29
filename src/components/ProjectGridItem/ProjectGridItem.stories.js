import React from 'react';
import ProjectGridItem from 'components/ProjectGridItem';
import { mockProject } from './__mock_data';

// import moment from 'moment';
// moment.locale(navigator.language);

export default {
  component: ProjectGridItem,
  title: 'ProjectGridItem',
  excludeStories: /.*Data$/,
};

export const projectData = {
  project: mockProject,
  // projectDisplayMode: 'compact',
};

export const Default = () => <ProjectGridItem {...projectData} />;

export const Expanded = () => (
  <ProjectGridItem {...projectData} projectsDisplayMode="expanded" />
);
