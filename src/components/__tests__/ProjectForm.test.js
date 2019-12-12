import React from 'react';
import { mount } from 'enzyme';
import ProjectForm from 'components/ProjectForm';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

describe('Project form', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ProjectForm />
      </MuiPickersUtilsProvider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('has a form with input fields: title, description, start daate, deadline, client, budgeted time', () => {
    expect(wrapper.find('input[name="title"]').length).toBe(1);
    expect(wrapper.find('textarea[name="description"]').length).toBe(1);
    expect(wrapper.find('input[name="startDate"]').length).toBe(1);
    expect(wrapper.find('input[name="deadline"]').length).toBe(1);
    expect(wrapper.find('input[name="client"]').length).toBe(1);
    expect(wrapper.find('input[name="budgetedTime"]').length).toBe(1);
  });

  it('Title field can be typed in', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        value: 'Test Project',
        name: 'title'
      }
    });
    wrapper.update();
    expect(wrapper.find('input[name="title"]').prop('value')).toBe(
      'Test Project'
    );
  });

  it('Description field can be typed in', () => {
    wrapper.find('textarea[name="description"]').simulate('change', {
      target: {
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris a diam maecenas sed enim. Massa eget egestas purus viverra accumsan in nisl nisi. Cursus euismod quis viverra nibh. Vel eros donec ac odio tempor. Neque egestas congue quisque egestas diam in arcu cursus. Integer malesuada nunc vel risus commodo viverra. Sed blandit libero volutpat sed cras ornare arcu dui. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Cursus in hac habitasse platea dictumst. Orci sagittis eu volutpat odio facilisis mauris. Vulputate dignissim suspendisse in est ante in nibh. Odio aenean sed adipiscing diam donec adipiscing tristique risus nec. Tortor at auctor urna nunc id cursus metus aliquam. Ac tortor vitae purus faucibus ornare. Feugiat vivamus at augue eget arcu dictum. Venenatis cras sed felis eget velit aliquet sagittis.',
        name: 'description'
      }
    });
    wrapper.update();
    expect(wrapper.find('textarea[name="description"]').prop('value')).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris a diam maecenas sed enim. Massa eget egestas purus viverra accumsan in nisl nisi. Cursus euismod quis viverra nibh. Vel eros donec ac odio tempor. Neque egestas congue quisque egestas diam in arcu cursus. Integer malesuada nunc vel risus commodo viverra. Sed blandit libero volutpat sed cras ornare arcu dui. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Cursus in hac habitasse platea dictumst. Orci sagittis eu volutpat odio facilisis mauris. Vulputate dignissim suspendisse in est ante in nibh. Odio aenean sed adipiscing diam donec adipiscing tristique risus nec. Tortor at auctor urna nunc id cursus metus aliquam. Ac tortor vitae purus faucibus ornare. Feugiat vivamus at augue eget arcu dictum. Venenatis cras sed felis eget velit aliquet sagittis.'
    );
  });

  it('Start date can be set', () => {
    wrapper.find('input[name="startDate"]').simulate('change', {
      target: {
        value: '11/10/1977',
        name: 'startDate'
      }
    });
    wrapper.update();
    expect(wrapper.find('input[name="startDate"]').prop('value')).toBe(
      '11/10/1977'
    );
  });

  it('Deadline can be set', () => {
    wrapper.find('input[name="deadline"]').simulate('change', {
      target: {
        value: '02/23/1985',
        name: 'deadline'
      }
    });
    wrapper.update();
    expect(wrapper.find('input[name="deadline"]').prop('value')).toBe(
      '02/23/1985'
    );
  });

  it('Client field can be typed in', () => {
    wrapper.find('input[name="client"]').simulate('change', {
      target: {
        value: 'Test Client',
        name: 'client'
      }
    });
    wrapper.update();
    expect(wrapper.find('input[name="client"]').prop('value')).toBe(
      'Test Client'
    );
  });

  it('Budgeted time field can be set', () => {
    wrapper.find('input[name="budgetedTime"]').simulate('change', {
      target: {
        value: 40,
        name: 'budgetedTime'
      }
    });
    wrapper.update();
    expect(wrapper.find('input[name="budgetedTime"]').prop('value')).toBe(40);
  });
});
