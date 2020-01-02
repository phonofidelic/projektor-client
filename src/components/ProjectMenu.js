import React, { useState, useContext } from 'react';
import * as actions from 'actions';
import { connect } from 'react-redux';
import { StringContext } from 'strings';
import { Link } from 'react-router-dom';
// import STATUS from 'constants';

import { ACTIVE, ARCHIVED, DELETED } from 'constants/status';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BookIcon from '@material-ui/icons/Book';
import Delete from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CachedIcon from '@material-ui/icons/Cached';
import EditIcon from '@material-ui/icons/Edit';

function ProjectMenu(props) {
  const { project, color, location, setProjectStatus, deleteProject } = props;
  const strings = useContext(StringContext);

  const [anchorEl, setAnchor] = useState(null);
  const handleMenuClick = e => {
    setAnchor(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchor(null);
  };

  const handleMenuSelection = (projectId, status) => {
    setProjectStatus(projectId, status, location);
    handleCloseMenu();
  };

  const handleDelete = projectId => {
    if (window.confirm(strings.msg__delete_perm_confirm)) {
      deleteProject(projectId, location);
    }
    handleCloseMenu();
  };

  const menuActions = [
    {
      pathname: '/projects',
      status: ACTIVE,
      title: strings.btn__activate,
      icon: <CachedIcon />
    },
    {
      pathname: '/archived',
      status: ARCHIVED,
      title: strings.btn__archive,
      icon: <BookIcon />
    },
    {
      pathname: '/removed',
      status: DELETED,
      title: strings.btn__remove,
      icon: <Delete />
    }
  ];

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
        {project.status === ACTIVE && (
          <MenuItem
            key="edit"
            component={Link}
            to={`/projects/edit/${project._id}`}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            {strings.btn__edit}
          </MenuItem>
        )}
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
            {strings.btn__delete}
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
