import React from 'react';
import { shallow } from 'enzyme';
import { Landing } from 'views/Landing';
import Header from 'components/Header';

describe('Landing view', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Landing />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('has one Header component', () => {
    expect(wrapper.find(Header).length).toBe(1);
  });
});
