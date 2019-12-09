import React from 'react';
import { shallow } from 'enzyme';
import { Login } from 'views/Login';
import Header from 'components/Header';
import LoginForm from 'components/LoginForm';

describe('Login view', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('has one Header component', () => {
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('has one LoginForm component', () => {
    expect(wrapper.find(LoginForm).length).toBe(1);
  });
});
