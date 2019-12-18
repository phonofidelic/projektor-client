import React from 'react';
import { mount } from 'enzyme';
import { Projects } from 'views/Projects';
import Header from 'components/Header';
import Root from 'Root';
import { TTL__ACTIVE, MSG__DEFAULT_EMPTY_ACTIVE } from 'constants/strings';

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
    expect(wrapper.text()).toContain(TTL__ACTIVE);
  });

  it('displays a default message', () => {
    expect(wrapper.text()).toContain(MSG__DEFAULT_EMPTY_ACTIVE);
  });
});
