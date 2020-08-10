import React, { useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import ProjectMenu from '.';
import MobileProjectMenu from './MobileProjectMenu';
import { mockProject } from './__mock_data';

export default {
  component: ProjectMenu,
  title: 'ProjectMenu',
  // decorators: [storyFn => <div style={{ width: 500 }}>{storyFn()}</div>],
  excludeStories: /.*Data$/
};

export const menuData = {
  project: mockProject
};

export const actionsData = {
  setProjectStatus: action('setProjectStatus')
};

export const Default = () => <ProjectMenu {...menuData} {...actionsData} />;

// export const Mobile = () => {
//   return <ProjectMenu {...menuData} {...actionsData} />;
// };
