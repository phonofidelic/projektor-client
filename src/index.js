import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Root from 'Root';
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

if (process.env.NODE_ENV === 'production') {
  console.log = () => {
    return;
  };
}

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
