import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackArrow from '@material-ui/icons/ArrowBack';

export default function Header(props) {
  const { title, centerTitle, back, headerActions } = props;

  return (
    <AppBar position="sticky">
      <Toolbar>
        {back && (
          <IconButton
            style={{ textDecoration: 'none' }}
            component={Link}
            to={back}
          >
            <BackArrow style={{ color: '#fff' }} />
          </IconButton>
        )}
        <div style={{ flexGrow: centerTitle ? 1 : 0 }}>
          <Typography variant="h6">{title}</Typography>
        </div>
        {!centerTitle && <div style={{ flexGrow: 1 }}></div>}
        <div>{headerActions}</div>
      </Toolbar>
    </AppBar>
  );
}
