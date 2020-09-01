import React, { useContext } from 'react';
import { useAuth } from 'services/AuthProvider';

import { StringContext } from 'strings';

import Button from '@material-ui/core/Button';

export default function RegistrationButton() {
  const { loginWithRedirect, loginWithPopup } = useAuth();
  const strings = useContext(StringContext);

  return (
    <Button
      style={{ backgroundColor: '#fff' }}
      variant="outlined"
      onClick={() =>
        loginWithRedirect({
          screen_hint: 'signup',
          redirectUri: `${process.env.REACT_APP_DOMAIN}/projects`
        })
      }
    >
      {strings.btn__create_account}
    </Button>
  );
}
