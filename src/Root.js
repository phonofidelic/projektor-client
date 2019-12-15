import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ConnectedRouter } from 'connected-react-router';

import { history } from 'config';

export default function Root({ children }) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancer = composeEnhancers(applyMiddleware(reduxThunk));

  const materialUITheme = createMuiTheme({});

  const store = createStore(reducers, {}, enhancer);

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={materialUITheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ConnectedRouter history={history}>{children}</ConnectedRouter>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </Provider>
  );
}
