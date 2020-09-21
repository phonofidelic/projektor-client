import React from 'react';
import { addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from 'reducers';
import { MemoryRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { localeMap } from 'Root';
import { materialUITheme } from 'config';
import 'moment-duration-format';
import { addParameters } from '@storybook/client-api';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const store = createStore(reducers, {});

addDecorator(withA11y);
addDecorator((story) => (
  <Provider store={store}>
    <MuiThemeProvider theme={materialUITheme}>
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={localeMap[navigator.language]}
      >
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </Provider>
));

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
