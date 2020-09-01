import React, { useContext } from 'react';
import { useAuth } from 'services/AuthProvider';

import { StringContext } from 'strings';

import Button from '@material-ui/core/Button';

export default function LogoutButton() {
  const { logout } = useAuth();
  const strings = useContext(StringContext);

  return (
    <Button
      variant="outlined"
      onClick={() =>
        logout({
          returnTo: window.location.origin
          // client_id: process.env.REACT_APP_AUTH0_CLIENT_ID
        })
      }
    >
      {strings.btn__sign_out}
    </Button>
  );
}
