import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { StringContext } from 'strings';

import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import EventIcon from '@material-ui/icons/Event';

const Container = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavlistItem = styled(NavLink)`
  display: flex;
  padding: 12px;
  transition: background 0.3s;
  text-decoration: none;
  color: #212121;

  :link,
  :visited,
  :active {
    background: linear-gradient(
      to right,
      #fff 97%,
      ${props => (props.selected ? props.color : '#fff')} 10%
    );
  }

  :hover {
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.palette.action.hover} 97%,
      ${props =>
          props.selected ? props.color : props.theme.palette.action.hover}
        10%
    );
  }
`;

const NavlistIcon = styled.div`
  margin-right: 12px;
`;

const ActiveMarker = styled.div`
  position: absolute;
  width: 10px;
  background-color: ${({ color }) => color};
  z-index: 2000;
`;

export default function NavList(props) {
  const { handleNavSelection } = props;
  const { pathname } = useLocation();
  const theme = useTheme();
  const strings = useContext(StringContext);

  const navItems = [
    {
      title: strings.ttl__calendar,
      icon: <EventIcon />,
      link: '/calendar',
      color: '#A6EAF0'
    },
    {
      title: strings.ttl__projects,
      icon: <AppsIcon />,
      link: '/projects',
      color: '#FFC081'
    },
    // {
    //   title: strings.ttl__dashboard,
    //   icon: <DashboardIcon />,
    //   link: '/dashboard',
    //   color: calendarColor[SHADE],
    // },
    {
      title: strings.ttl__settings,
      icon: <SettingsIcon />,
      link: '/settings',
      color: '#FF8070'
    }
  ];

  return (
    <Container>
      {navItems.map((navItem, i) => (
        <li key={`nav-list-item_${i}`}>
          <NavlistItem
            theme={theme}
            activeStyle={{ color: navItem.contrast }}
            to={navItem.link}
            selected={pathname.includes(navItem.link)}
            color={navItem.color}
            onClick={handleNavSelection}
          >
            <NavlistIcon>{navItem.icon}</NavlistIcon>
            <Typography>{navItem.title}</Typography>
            {pathname.includes(navItem.link) && (
              <ActiveMarker color={navItem.color} />
            )}
          </NavlistItem>
        </li>
      ))}
    </Container>
  );
}
