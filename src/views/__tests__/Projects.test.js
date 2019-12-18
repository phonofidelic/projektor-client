import React from 'react';
import { mount } from 'enzyme';
import { Projects } from 'views/Projects';
import Header from 'components/Header';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';
import Root from 'Root';
import { TTL__ACTIVE } from 'constants/strings';

describe('Projects view', () => {
  let wrapper;
  const getProjects = jest.fn();
  beforeEach(() => {
    wrapper = mount(
      <Root>
        <Projects projects={[]} getProjects={getProjects} />
      </Root>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('has a Header component', () => {
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('displays the view title', () => {
    expect(wrapper.find(Header).text()).toContain(TTL__ACTIVE);
  });

  it('shows a default message', () => {
    expect(wrapper.find(DefaultEmptyMessage).length).toBe(1);
  });
});
