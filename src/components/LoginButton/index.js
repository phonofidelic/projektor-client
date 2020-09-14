import React, { useContext } from 'react';
import { useAuth } from 'services/AuthProvider';
import { StringContext } from 'strings';

import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function LoginButton() {
  const { loginWithRedirect } = useAuth();
  const strings = useContext(StringContext);
  const theme = useTheme();

  return (
    <Button
      style={{
        backgroundColor: '#fff',
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main
        // margin: '0 8px'
      }}
      // variant="outlined"
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
