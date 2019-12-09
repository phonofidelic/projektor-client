import React from 'react';
import { shallow } from 'enzyme';
import { Registration } from 'views/Registration';
import Header from 'components/Header';
import RegistrationForm from 'components/RegistrationForm';

describe('Registration view', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Registration />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('has one Header component', () => {
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('has one RegistrationForm component', () => {
    expect(wrapper.find(RegistrationForm).length).toBe(1);
  });
});
