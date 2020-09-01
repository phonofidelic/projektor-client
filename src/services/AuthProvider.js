import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import {
  Auth0Provider,
  useAuth0,
  withAuthenticationRequired
} from '@auth0/auth0-react';

export default ({ children }) => {
  const history = useHistory();

  const onRedirectCallback = appState => {
    console.log('### apState:', appState);
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_AUTH0_API_IDENTIFIER}
      onRedirectCallback={onRedirectCallback}
      // cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export const useAuth = useAuth0;

export const requireAuth = withAuthenticationRequired;

export const PrivateRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <div>Redirecting...</div>
    })}
    {...args}
  />
);
