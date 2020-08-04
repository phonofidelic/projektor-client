import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { StringContext } from 'strings';

import { useTheme } from '@material-ui/core/styles';
import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import EventIcon from '@material-ui/icons/Event';
import Typography from '@material-ui/core/Typography';

import calendarColor from '@material-ui/core/colors/blue';
import activeColor from '@material-ui/core/colors/green';
import settingsColor from '@material-ui/core/colors/purple';

const NAV_WIDTH = 178;
const SHADE = 400;

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
  z-index: 3;
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

export function Nav(props) {
  const { pathname } = props;
  const strings = useContext(StringContext);
  const theme = useTheme();

  const navItems = [
    {
      title: strings.ttl__calendar,
      icon: <EventIcon />,
      link: '/calendar',
      color: calendarColor[SHADE]
      // contrast: '#fff'
    },
    {
      title: strings.ttl__projects,
      icon: <AppsIcon />,
      // link: '/projects/active',
      link: '/projects',
      color: activeColor[SHADE]
      // contrast: '#fff'
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
      color: settingsColor[SHADE]
      // contrast: '#fff'
    }
  ];

  return /registration|login/.test(pathname) || pathname === '/' ? null : (
    <Base>
      <Container>
        <LogoContainer>
          <Typography variant="h4">[projektor]</Typography>
        </LogoContainer>
        <Navlist>
          {navItems.map((navItem, i) => (
            <NavlistItem
              theme={theme}
              activeStyle={{ color: navItem.contrast }}
              key={i}
              to={navItem.link}
              selected={pathname.includes(navItem.link)}
              color={navItem.color}
              contrast={navItem.contrast}
            >
              <NavlistIcon>{navItem.icon}</NavlistIcon>
              <Typography>{navItem.title}</Typography>
              {pathname.includes(navItem.link) && (
                <ActiveMarker color={navItem.color} />
              )}
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
