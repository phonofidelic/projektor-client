import React from 'react';
import { shallow } from 'enzyme';
import Header from 'components/Header';
import Nav from 'components/Nav';
import IconButton from '@material-ui/core/IconButton';

describe('Header', () => {
  let wrapper;

  it('can display a title', () => {
    wrapper = shallow(<Header title="Test" />);
    expect(wrapper.text()).toBe('Test');
  });

  it('can have a back button', () => {
    wrapper = shallow(<Header back="/test" />);
    expect(wrapper.find(IconButton).prop('to')).toBe('/test');
  });

  it('can have a nav drawer', () => {
    wrapper = shallow(<Header nav />);
    expect(wrapper.find(Nav).length).toBe(1);
  });

  it('can have action buttons', () => {
    const mockHeaderActions = () => shallow(<button key="test">Test</button>);
    wrapper = shallow(<Header headerActions={mockHeaderActions()} />);
    expect(wrapper.find('button').text()).toBe('Test');
  });
});