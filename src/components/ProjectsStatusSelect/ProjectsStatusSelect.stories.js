import React from 'react';
import { action } from '@storybook/addon-actions';
import ProjectsStatusSelect from '.';
import { ACTIVE, ARCHIVED, DELETED } from 'constants/status';

export default {
  component: ProjectsStatusSelect,
  title: 'ProjectsStatusSelect',
  excludeStories: /.*Data$/,
  decorators: [storyFn => <div style={{ maxWidth: 150 }}>{storyFn()}</div>]
};

export const Default = () => (
  <ProjectsStatusSelect
    projectStatusView={ACTIVE}
    setProjectStatusView={action('setProjectStatusView')}
  />
);

export const Active = () => (
  <ProjectsStatusSelect
    projectStatusView={ACTIVE}
    setProjectStatusView={action('setProjectStatusView')}
  />
);

export const Archived = () => (
  <ProjectsStatusSelect
    projectStatusView={ARCHIVED}
    setProjectStatusView={action('setProjectStatusView')}
  />
);

export const Removed = () => (
  <ProjectsStatusSelect
    projectStatusView={DELETED}
    setProjectStatusView={action('setProjectStatusView')}
  />
);
