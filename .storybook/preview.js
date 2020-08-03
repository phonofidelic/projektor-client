import React from 'react';
import { addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from 'reducers';
import { MemoryRouter } from 'react-router-dom';
import 'moment-duration-format';

const store = createStore(reducers, {});

addDecorator(withA11y);
addDecorator((story) => (
  <Provider store={store}>
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  </Provider>
));
