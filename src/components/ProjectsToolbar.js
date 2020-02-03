import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { StringContext } from 'strings';
import { ACTIVE, COMPLETE, ARCHIVED, DELETED } from 'constants/status';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import activeColor from '@material-ui/core/colors/green';
import archivedColor from '@material-ui/core/colors/yellow';
import removedColor from '@material-ui/core/colors/red';

const SHADE = 400;

const Container = styled.div`
  text-align: left;
  padding: 10px;
  margin: 10px;
  display: flex;
`;

export default function(props) {
  const { projectStatusView, setProjectStatusView } = props;
  const strings = useContext(StringContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleStatusViewSelect = status => {
    setProjectStatusView(status);
    setAnchorEl(null);
  };

  const getProjectStatusViewString = () => {
    switch (projectStatusView) {
      case ACTIVE:
        return strings.ttl__active;

      case ARCHIVED:
        return strings.ttl__archived;

      case DELETED:
        return strings.ttl__removed;

      default:
        return strings.ttl__active;
    }
  };

  const getStatusButtonBGColor = () => {
    switch (projectStatusView) {
      case ACTIVE:
        return activeColor[SHADE];

      case ARCHIVED:
        return archivedColor[800];

      case DELETED:
        return removedColor[SHADE];

      default:
        return strings.ttl__active;
    }
  };

  return (
    <Container>
      <div>
        <Button
          // variant="outlined"
          style={{ backgroundColor: getStatusButtonBGColor(), color: '#fff' }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleOpenMenu}
        >
          {getProjectStatusViewString()}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem
            // style={{ backgroundColor: activeColor[SHADE], color: '#fff' }}
            onClick={() => handleStatusViewSelect(ACTIVE)}
          >
            {strings.ttl__active}
          </MenuItem>
          <MenuItem onClick={() => handleStatusViewSelect(ARCHIVED)}>
            {strings.ttl__archived}
          </MenuItem>
          <MenuItem onClick={() => handleStatusViewSelect(DELETED)}>
            {strings.ttl__removed}
          </MenuItem>
        </Menu>
      </div>
    </Container>
  );
}
