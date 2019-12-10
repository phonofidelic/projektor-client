import React from 'react';
import { shallow, mount } from 'enzyme';
import RegistrationForm from 'components/RegistrationForm';

describe('RegistrationForm', () => {
  let wrapper;
  let mockSubmit;

  beforeEach(() => {
    wrapper = mount(<RegistrationForm handleRegistrationSubmit={mockSubmit} />);
    mockSubmit = jest.fn();
  });

  afterEach(() => {
    wrapper.unmount();
    mockSubmit = undefined;
  });

  it('has a form with an email field, password felds and a submit button', () => {
    expect(wrapper.find('input[type="email"]').length).toBe(1);
    expect(wrapper.find('input[type="password"]').length).toBe(2);
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

  it('has a password confirmation field that can be typed in', () => {
    wrapper.find('input[name="passwordMatch"]').simulate('change', {
      target: {
        value: 'test1234',
        name: 'passwordMatch'
      }
    });
    wrapper.update();
    expect(wrapper.find('input[name="passwordMatch"]').prop('value')).toBe(
      'test1234'
    );
  });

  // it('shows validation messages', done => {
  //   wrapper.find('button[type="submit"]').simulate('click');

  //   // wrapper.update();

  //   setTimeout(() => {
  //     console.log(wrapper.debug());
  //     done();
  //   }, 1000);
  // });
});
