import React from 'react';
import { mount } from 'enzyme';
import { Removed } from 'views/Removed';
import Header from 'components/Header';
import Root from 'Root';
import { TTL__DELETED, MSG__DEFAULT_EMPTY_REMOVED } from 'constants/strings';

describe('Removed view', () => {
  let wrapper;
  const getProjects = jest.fn();
  beforeEach(() => {
    wrapper = mount(
      <Root>
        <Removed projects={[]} getProjects={getProjects} />
      </Root>
    );
  });

  it('has one Header component', () => {
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('displays the view title', () => {
    expect(wrapper.text()).toContain(TTL__DELETED);
  });

  it('shows a default message', () => {
    expect(wrapper.text()).toContain(MSG__DEFAULT_EMPTY_REMOVED);
  });
});
