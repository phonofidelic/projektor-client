import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
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
    primary: {
      main: '#212121',
      background: '#fff'
    }
    /**
     * WARNING: This setting may cause accessibility issues
     */
    // contrastThreshold: 2
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
            <ConnectedRouter history={history}>{children}</ConnectedRouter>
          </StringProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </Provider>
  );
}
