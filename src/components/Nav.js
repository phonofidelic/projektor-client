import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StringContext } from 'strings';
import { history } from 'config';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import BookIcon from '@material-ui/icons/Book';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: { backgroundColor: '#fff' },
  selected: { textDecoration: 'underline', backgroundColor: '#fff' }
});

const NAV_WIDTH = 178;

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
  z-index: 3000;
`;

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

export function Nav(props) {
  const { pathname } = props;
  const strings = useContext(StringContext);
  const classes = useStyles();

  // const [open, setOpen] = useState(true);

  // const closeNav = () => {
  //   setOpen(false);
  // };

  console.log('====================================');
  console.log('Nav, history:', history.location.pathname);
  console.log('====================================');

  const navItems = [
    {
      title: strings.ttl__dashboard,
      icon: <DashboardIcon />,
      link: '/dashboard'
    },
    {
      title: strings.ttl__active,
      icon: <AppsIcon />,
      link: '/projects'
    },
    {
      title: strings.ttl__archived,
      icon: <BookIcon />,
      link: '/archived'
    },
    {
      title: strings.ttl__removed,
      icon: <DeleteIcon />,
      link: '/removed'
    },
    {
      title: strings.ttl__settings,
      icon: <SettingsIcon />,
      link: '/settings'
    }
  ];

  return pathname === '/' ||
    pathname === '/registration' ||
    pathname === '/login' ? null : (
    <Base>
      <Container>
        <div style={{ margin: 10 }}>
          <Typography variant="h4">[projektor]</Typography>
        </div>
        <List>
          {navItems.map((navItem, i) => (
            <ListItem
              classes={{ root: classes.root, selected: classes.selected }}
              key={i}
              button
              component={NavLink}
              to={navItem.link}
              selected={navItem.link === pathname}
            >
              <ListItemIcon>{navItem.icon}</ListItemIcon>
              <ListItemText>{navItem.title}</ListItemText>
            </ListItem>
          ))}
        </List>
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
