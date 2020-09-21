import React, { useContext } from 'react';
import { useAuth } from 'services/AuthProvider';

import { StringContext } from 'strings';

import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function RegistrationButton() {
  const { loginWithRedirect } = useAuth();
  const strings = useContext(StringContext);
  const theme = useTheme();

  return (
    <Button
      style={{
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        // margin: '0 8px'
      }}
      // variant="outlined"
      onClick={() =>
        loginWithRedirect({
          screen_hint: 'signup',
          redirectUri: `${process.env.REACT_APP_DOMAIN}/projects`,
        })
      }
    >
      {strings.btn__create_account}
    </Button>
  );
}
