import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import BookIcon from '@material-ui/icons/Book';

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
    title: 'Archived',
    icon: <BookIcon />,
    link: '/archived'
  },
  {
    title: 'Trash',
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

export default function Nav(props) {
  const { open, closeNav } = props;

  return (
    <Drawer open={open} onClose={closeNav}>
      <List>
        {navItems.map((navItem, i) => (
          <ListItem key={i} component={NavLink} to={navItem.link}>
            <ListItemIcon>{navItem.icon}</ListItemIcon>
            <ListItemText>{navItem.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
