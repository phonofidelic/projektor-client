import React, { useContext } from 'react';
import { useAuth } from 'services/AuthProvider';

import { StringContext } from 'strings';

import Button from '@material-ui/core/Button';

export default function LoginButton() {
  const { loginWithRedirect, loginWithPopup } = useAuth();
  const strings = useContext(StringContext);

  return (
    <Button
      style={{ backgroundColor: '#fff' }}
      variant="outlined"
      onClick={() =>
        loginWithRedirect({
          // redirectUri: `${process.env.REACT_APP_DOMAIN}/projects`
          redirectUri: `${window.location.origin}/projects`
        })
      }
    >
      {strings.btn__sign_in}
    </Button>
  );
}
