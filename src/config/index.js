import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const apiBaseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://projektor-api.herokuapp.com'
    : 'http://localhost:4000';
