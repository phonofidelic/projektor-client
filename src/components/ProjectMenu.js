import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { useHistory } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Delete from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function ProjectMenu(props) {
  const { project, color } = props;

  const history = useHistory();

  const [anchorEl, setAnchor] = useState(null);
  const handleMenuClick = e => {
    setAnchor(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchor(null);
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
        <MenuItem onClick={() => props.deleteProject(project._id, history)}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}

export default connect(null, actions)(ProjectMenu);
