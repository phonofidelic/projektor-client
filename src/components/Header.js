import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackArrow from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';

const navItems = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/dashboard'
  },
  {
    title: 'Projects',
    icon: <AppsIcon />,
    link: '/projects'
  },
  {
    title: 'Removed',
    icon: <DeleteIcon />,
    link: '/removed'
  },
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    link: '/setings'
  }
];

const NavLink = styled(Link)`
  text-decoration: none;
  link-style: none;
  :link,
  :visited,
  :active,
  :hover {
    color: inherit;
  }
`;

export default function Header(props) {
  const { nav, title, centerTitle, back, headerActions } = props;

  const [open, setOpen] = useState(false);

  return (
    <AppBar position="sticky">
      <Toolbar>
        {nav && (
          <IconButton
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
      {nav && (
        <Drawer open={open} onClose={() => setOpen(false)}>
          <List>
            {navItems.map((navItem, i) => (
              <ListItem key={i} component={NavLink} to={navItem.link}>
                <ListItemIcon>{navItem.icon}</ListItemIcon>
                <ListItemText>{navItem.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </AppBar>
  );
}
