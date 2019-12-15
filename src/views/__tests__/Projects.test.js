import React from 'react';
import { shallow } from 'enzyme';
import { Projects } from 'views/Projects';
import Header from 'components/Header';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';

describe('Projects view', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Projects projects={[]} />);
  });

  it('has one Header component', () => {
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('shows a default message', () => {
    expect(wrapper.find(DefaultEmptyMessage).length).toBe(1);
  });
});
