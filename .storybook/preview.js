import React from 'react';
import { addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from 'reducers';
import { MemoryRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { materialUITheme } from 'Root';
import 'moment-duration-format';
import { addParameters } from '@storybook/client-api';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const store = createStore(reducers, {});

addDecorator(withA11y);
addDecorator(story => (
  <Provider store={store}>
    <MuiThemeProvider theme={materialUITheme}>
      <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    </MuiThemeProvider>
  </Provider>
));

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
});
