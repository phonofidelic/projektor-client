import React from 'react';
import { shallow } from 'enzyme';
import { Removed } from 'views/Removed';
import ProjectsGrid from 'components/ProjectsGrid';
import Header from 'components/Header';

describe('Removed view', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Removed projects={[]} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('has one Header component', () => {
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('has one ProjectsGrid component', () => {
    expect(wrapper.find(ProjectsGrid).length).toBe(1);
  });
});
