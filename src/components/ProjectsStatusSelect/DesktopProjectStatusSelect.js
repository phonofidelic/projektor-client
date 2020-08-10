import React from 'react';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function DesktopProjectStatusSelect(props) {
  const {
    anchorEl,
    menuOptions,
    handleCloseMenu,
    handleStatusViewSelect
  } = props;

  return (
    <Menu
      data-testid="project-status-select"
      id="project-status-select"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      {menuOptions.map(option => (
        <MenuItem
          key={`status-select_${option.value}`}
          dense
          onClick={() => handleStatusViewSelect(option.value)}
        >
          <ListItemIcon>
            <div
              style={{
                backgroundColor: option.color,
                borderRadius: '100%',
                width: 18,
                height: 18
              }}
            />
          </ListItemIcon>
          <ListItemText>{option.title}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
}
