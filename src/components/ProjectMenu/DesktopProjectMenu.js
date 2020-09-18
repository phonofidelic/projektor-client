import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { StringContext } from 'strings';
import { ACTIVE, DELETED } from 'constants/status';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function DesktopProjectMenu(props) {
  const {
    project,
    anchorEl,
    menuActions,
    handleMenuSelection,
    handleDelete,
    handleCloseMenu,
  } = props;

  const strings = useContext(StringContext);

  return (
    <Menu
      id={`project-options-menu_${project._id}`}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      {project.status === ACTIVE &&
        (project.isDemo ? (
          <MenuItem key="edit" onClick={() => props.handleDemoEdit(project)}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            {strings.btn__edit}
          </MenuItem>
        ) : (
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
        ))}
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
      {project.status === DELETED && !project.isDemo && (
        <MenuItem key="perm_delete" onClick={() => handleDelete(project._id)}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          {strings.btn__delete}
        </MenuItem>
      )}
    </Menu>
  );
}
