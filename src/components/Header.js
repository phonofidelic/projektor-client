import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Nav from 'components/Nav';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackArrow from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';

export default function Header(props) {
  const { nav, title, centerTitle, back, headerActions } = props;

  const [open, setOpen] = useState(false);

  const closeNav = () => {
    setOpen(false);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {nav && (
          <IconButton
            id="nav-btn-expand"
            style={{ marginRight: 10 }}
            onClick={() => setOpen(!open)}
          >
            <MenuIcon style={{ color: '#fff' }} />
          </IconButton>
        )}
        {back && (
          <IconButton
            style={{ textDecoration: 'none', marginRight: 10 }}
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
      {nav && <Nav open={open} closeNav={closeNav} />}
    </AppBar>
  );
}
