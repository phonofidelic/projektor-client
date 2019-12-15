import React from 'react';
import { shallow } from 'enzyme';
import ProjectGrid from 'components/ProjectsGrid';
import ProjectGridItem from 'components/ProjectGridItem';
import { mockProject } from 'utils/mockData';

describe('ProjectGridItem', () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  // it('shows a message if no Project item exists', () => {
  //   wrapper = shallow(<ProjectGrid projects={[]} />);
  //   expect(wrapper.text()).toBe('Add a project to get started');
  // });

  it('shows a Project item if one exists', () => {
    wrapper = shallow(<ProjectGrid projects={[mockProject]} />);
    expect(wrapper.find(ProjectGridItem).length).toBe(1);
  });
});
