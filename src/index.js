import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ConnectedRouter } from 'connected-react-router';

import { history } from 'config';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(reduxThunk));

const materialUITheme = createMuiTheme({});

ReactDOM.render(
  <Provider store={createStore(reducers, {}, enhancer)}>
    <MuiThemeProvider theme={materialUITheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
