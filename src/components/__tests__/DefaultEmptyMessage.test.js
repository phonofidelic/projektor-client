import React from 'react';
import { shallow } from 'enzyme';
import DefaultEmptyMessage from 'components/DefaultEmptyMessage';

describe('DefaultEmptyMessage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DefaultEmptyMessage text="This is a test message" />);
  });

  it('shows a message', () => {
    expect(wrapper.text()).toBe('This is a test message');
  });
});
