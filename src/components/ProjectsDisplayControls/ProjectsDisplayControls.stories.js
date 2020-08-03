import React from 'react';
import { action } from '@storybook/addon-actions';
import ProjectsDisplayControls from 'components/ProjectsDisplayControls';

export default {
  component: ProjectsDisplayControls,
  title: 'ProjectsDisplayControls'
};

export const Default = () => (
  <ProjectsDisplayControls
    projectsDisplayMode="compact"
    selectDisplayMode={action('selectDisplayMode')}
  />
);
