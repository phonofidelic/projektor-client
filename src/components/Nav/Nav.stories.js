import React from 'react';
import Nav from '.';
import NavList from './NavList';

export default {
  component: Nav,
  title: 'Nav',
  decorators: [
    storyFn => <div style={{ height: 500, width: 178 }}>{storyFn()}</div>
  ]
};

export const Default = () => <NavList />;
