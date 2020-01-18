import React from 'react';
import { shallow, mount } from 'enzyme';
import { mockProject } from 'utils/mockData';
import { Project } from 'views/Project';
import Header from 'components/Header';
import Root from 'Root';
import ProjectDetail from 'components/ProjectDetail';

/**
 * From: https://stackoverflow.com/a/58180976
 */
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    projectId: '5deccf102d02734c530164ff'
  }),
  useRouteMatch: () => ({ url: '/projects/:projectId' })
}));

describe('Project view', () => {
  let wrapper;
  const getProject = jest.fn();
  beforeEach(() => {
    wrapper = mount(
      <Root>
        <Project project={mockProject} getProject={getProject} />
      </Root>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('has one Header component', () => {
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('has one ProjectDetail component', () => {
    expect(wrapper.find(ProjectDetail).length).toBe(1);
  });
});
