import React from 'react';
import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackArrow from '@material-ui/icons/ArrowBack';

export default function Header(props) {
  const { title, backButton, headerActions } = props;
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar>
        {backButton && (
          <IconButton
            style={{ marginRight: 25, textDecoration: 'none' }}
            onClick={() => history.goBack()}
          >
            <BackArrow style={{ color: '#fff' }} />
          </IconButton>
        )}
        <Typography variant="h6">{title}</Typography>
        <div style={{ flexGrow: 1 }}></div>
        {headerActions}
      </Toolbar>
    </AppBar>
  );
}
