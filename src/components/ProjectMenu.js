import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
// import STATUS from 'constants';

import { ACTIVE, COMPLETE, ARCHIVED, DELETED } from 'constants/status';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BookIcon from '@material-ui/icons/Book';
import Delete from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CachedIcon from '@material-ui/icons/Cached';

const menuActions = [
  {
    pathname: '/projects',
    status: ACTIVE,
    title: 'Activate',
    icon: <CachedIcon />
  },
  {
    pathname: '/archived',
    status: ARCHIVED,
    title: 'Archive',
    icon: <BookIcon />
  },
  {
    pathname: '/removed',
    status: DELETED,
    title: 'Move to trash',
    icon: <Delete />
  }
];

function ProjectMenu(props) {
  const { project, color, location } = props;

  const [anchorEl, setAnchor] = useState(null);
  const handleMenuClick = e => {
    setAnchor(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchor(null);
  };

  const handleMenuSelection = (projectId, status) => {
    props.setProjectStatus(projectId, status, location);
    handleCloseMenu();
  };

  const handleDelete = projectId => {
    props.deleteProject(projectId, location);
    handleCloseMenu();
  };

  return (
    <div>
      <IconButton onClick={handleMenuClick}>
        <MoreVertIcon style={{ color }} />
      </IconButton>
      <Menu
        id={`project-options-menu_${project._id}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {menuActions.map(
          (item, i) =>
            project.status !== item.status && (
              <MenuItem
                key={i}
                onClick={() => handleMenuSelection(project._id, item.status)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {item.title}
              </MenuItem>
            )
        )}
        {project.status === DELETED && (
          <MenuItem key="perm_delete" onClick={() => handleDelete(project._id)}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            Delete
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    location: state.router.location
  };
};

export default connect(mapStateToProps, actions)(ProjectMenu);
