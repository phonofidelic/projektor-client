import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { StringContext } from 'strings';
import { ACTIVE, COMPLETE, ARCHIVED, DELETED } from 'constants/status';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import activeColor from '@material-ui/core/colors/green';
import archivedColor from '@material-ui/core/colors/orange';
import removedColor from '@material-ui/core/colors/red';

const SHADE = 400;

const Container = styled.div`
  text-align: left;
  display: flex;
  height: 40px;
  margin: 4px;
  margin-right: 20px;
`;

const SelectButton = styled(Button)`
  color: #fff;
  background-color: ${({ bgcolor }) => bgcolor};
`;

export default function(props) {
  const { projectStatusView, setProjectStatusView } = props;
  const strings = useContext(StringContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectButtonHovered, setSelectButtonHovered] = useState(false);

  const handleSelectButtonEnter = () => {
    setSelectButtonHovered(true);
  };

  const handleSelectButtonLeave = () => {
    setSelectButtonHovered(false);
  };

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

  const getStatusButtonBGColor = shade => {
    switch (projectStatusView) {
      case ACTIVE:
        return activeColor[shade];

      case ARCHIVED:
        return archivedColor[shade];

      case DELETED:
        return removedColor[shade];

      default:
        return strings.ttl__active;
    }
  };

  return (
    <Container>
      <Button
        // variant="outlined"
        style={{
          backgroundColor: selectButtonHovered
            ? getStatusButtonBGColor(SHADE + 200)
            : getStatusButtonBGColor(SHADE),
          color: '#fff'
        }}
        bgcolor={getStatusButtonBGColor(SHADE)}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleOpenMenu}
        onMouseEnter={handleSelectButtonEnter}
        onMouseLeave={handleSelectButtonLeave}
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
    </Container>
  );
}
