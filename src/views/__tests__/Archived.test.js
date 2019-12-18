import React from 'react';
import { mount } from 'enzyme';
import { Archived } from 'views/Archived';
import Header from 'components/Header';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';
import Root from 'Root';
import { TTL__ARCHIVED } from 'constants/strings';

describe('Removed view', () => {
  let wrapper;
  const getProjects = jest.fn();
  beforeEach(() => {
    wrapper = mount(
      <Root>
        <Archived projects={[]} getProjects={getProjects} />
      </Root>
    );
  });

  it('has one Header component', () => {
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('displays the view title', () => {
    expect(wrapper.find(Header).text()).toContain(TTL__ARCHIVED);
  });

  it('shows a default message', () => {
    expect(wrapper.find(DefaultEmptyMessage).length).toBe(1);
  });
});
