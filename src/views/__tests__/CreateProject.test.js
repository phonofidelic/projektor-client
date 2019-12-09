import React from 'react';
import { shallow } from 'enzyme';
import { CreateProject } from 'views/CreateProject';
import Header from 'components/Header';
import ProjectForm from 'components/ProjectForm';

describe('CreateProject view', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CreateProject />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('has one Header component', () => {
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('has one ProjectsGrid component', () => {
    expect(wrapper.find(ProjectForm).length).toBe(1);
  });
});
