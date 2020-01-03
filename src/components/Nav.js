import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { StringContext } from 'strings';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import BookIcon from '@material-ui/icons/Book';
import Typography from '@material-ui/core/Typography';

import dashboardColor from '@material-ui/core/colors/blue';
import activeColor from '@material-ui/core/colors/green';
import archivedColor from '@material-ui/core/colors/yellow';
import removedColor from '@material-ui/core/colors/red';
import settingsColor from '@material-ui/core/colors/purple';

const NAV_WIDTH = 178;
const SHADE = 500;

/**
 * Base component creates a margin for main contentso that
 * the Nav component does not overlay it.
 */
const Base = styled.div`
  width: ${NAV_WIDTH}px;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${NAV_WIDTH}px;
  background-color: #fff;
  border-right: solid #e0e0e0 1px;
  z-index: 1;
`;

const LogoContainer = styled.div`
  padding: 18px 10px;
`;

const Navlist = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavlistItem = styled(NavLink)`
  display: flex;
  padding: 12px;
  background-color: #fff;
  transition: background-color 0.3s;
  text-decoration: none;

  :link,
  :visited,
  :active {
    color: inherit;
    background-color: ${props => (props.selected ? props.color : '#fff')};
  }

  :hover {
    background-color: ${props => props.color};
    color: ${props => props.contrast};
  }
`;

const NavlistIcon = styled.div`
  margin-right: 12px;
`;

export function Nav(props) {
  const { pathname } = props;
  const strings = useContext(StringContext);

  const navItems = [
    {
      title: strings.ttl__dashboard,
      icon: <DashboardIcon />,
      link: '/dashboard',
      color: dashboardColor[SHADE],
      contrast: '#fff'
    },
    {
      title: strings.ttl__active,
      icon: <AppsIcon />,
      link: '/projects',
      color: activeColor[SHADE],
      contrast: '#fff'
    },
    {
      title: strings.ttl__archived,
      icon: <BookIcon />,
      link: '/archived',
      color: archivedColor[SHADE],
      contrast: '#222'
    },
    {
      title: strings.ttl__removed,
      icon: <DeleteIcon />,
      link: '/removed',
      color: removedColor[SHADE],
      contrast: '#fff'
    },
    {
      title: strings.ttl__settings,
      icon: <SettingsIcon />,
      link: '/settings',
      color: settingsColor[SHADE],
      contrast: '#fff'
    }
  ];

  return pathname === '/' ||
    pathname === '/registration' ||
    pathname === '/login' ? null : (
    <Base>
      <Container>
        <LogoContainer>
          <Typography variant="h4">[projektor]</Typography>
        </LogoContainer>
        <Navlist>
          {navItems.map((navItem, i) => (
            <NavlistItem
              activeStyle={{ color: navItem.contrast }}
              key={i}
              to={navItem.link}
              selected={pathname.match(navItem.link)}
              color={navItem.color}
              contrast={navItem.contrast}
              // onClick={() => handleNavChange(navItem)}
            >
              <NavlistIcon>{navItem.icon}</NavlistIcon>
              <Typography>{navItem.title}</Typography>
            </NavlistItem>
          ))}
        </Navlist>
      </Container>
    </Base>
  );
}

const mapStateToProps = state => {
  return {
    pathname: state.router.location.pathname
  };
};

export default connect(mapStateToProps, null)(Nav);
