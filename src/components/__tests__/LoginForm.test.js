import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginForm from 'components/LoginForm';

describe('LoginForm', () => {
  let wrapper;
  let mockSubmit;

  beforeEach(() => {
    wrapper = mount(<LoginForm />);
    mockSubmit = jest.fn();
  });

  afterEach(() => {
    wrapper.unmount();
    mockSubmit = undefined;
  });

  it('has a form with an email and password feld and a submit button', () => {
    expect(wrapper.find('input[name="email"]').length).toBe(1);
    expect(wrapper.find('input[name="password"]').length).toBe(1);
    expect(wrapper.find('button[type="submit"]').length).toBe(1);
  });

  it('has an email field that can be typed in', () => {
    wrapper.find('input[name="email"]').simulate('change', {
      target: {
        value: 'test@test.com',
        name: 'email'
      }
    });
    wrapper.update();
    expect(wrapper.find('input[name="email"]').prop('value')).toBe(
      'test@test.com'
    );
  });

  it('has a password field that can be typed in', () => {
    wrapper.find('input[name="password"]').simulate('change', {
      target: {
        value: 'test1234',
        name: 'password'
      }
    });
    wrapper.update();
    expect(wrapper.find('input[name="password"]').prop('value')).toBe(
      'test1234'
    );
  });
});
