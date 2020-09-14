import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import AuthProvider from 'services/AuthProvider';
import DateFnsUtils from '@date-io/date-fns';
import { ConnectedRouter } from 'connected-react-router';
import { StringProvider } from 'strings';
import { history } from 'config';
import moment from 'moment';
import enLocale from 'date-fns/locale/en-US';
import svLocale from 'date-fns/locale/sv';
import 'moment/locale/sv';

moment.locale(navigator.language);

const localeMap = {
  en: enLocale,
  sv: svLocale
};

export const materialUITheme = createMuiTheme({
  palette: {
    // primary: {
    //   main: '#212121',
    //   background: '#fff'
    // },
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000'
    },
    // primary: {
    //   light: '#4f5b62',
    //   main: '#263238',
    //   dark: '#000a12'
    // },
    secondary: {
      light: '#fff2bf',
      main: '#ffbf8e',
      dark: '#ca8f60'
    },
    background: {
      default: '#fff'
    }
  },
  dimensions: {
    projectDetailHeader: {
      height: 88
    }
  }
});

export default function Root({ children }) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancer = composeEnhancers(applyMiddleware(reduxThunk));

  const store = createStore(reducers, {}, enhancer);

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={materialUITheme}>
        <MuiPickersUtilsProvider
          utils={DateFnsUtils}
          locale={localeMap[navigator.language]}
        >
          <StringProvider>
            <ConnectedRouter history={history}>
              <AuthProvider>{children}</AuthProvider>
            </ConnectedRouter>
          </StringProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </Provider>
  );
}
