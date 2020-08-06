import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StringContext } from 'strings';
import { ACTIVE, ARCHIVED, DELETED } from 'constants/status';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import activeColor from '@material-ui/core/colors/green';
import archivedColor from '@material-ui/core/colors/orange';
import removedColor from '@material-ui/core/colors/red';

const SHADE = 400;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  height: 40px;
  margin: 4px;
  margin-right: 20px;
  /* smax-width: 100px; */
`;

export function ProjectsStatusSelect(props) {
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

  const getStatusColor = shade => {
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
      <Tooltip arrow title={strings.hnt__status_select}>
        <Chip
          component={Button}
          label={getProjectStatusViewString()}
          variant="outlined"
          avatar={
            <div
              style={{
                backgroundColor: getStatusColor(SHADE),
                borderRadius: '100%',
                width: 18,
                height: 18
              }}
            />
          }
          aria-controls="project-status-select"
          aria-haspopup="true"
          onClick={handleOpenMenu}
        />
      </Tooltip>
      <Menu
        id="project-status-select"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          dense
          component={Button}
          onClick={() => handleStatusViewSelect(ACTIVE)}
        >
          <ListItemIcon>
            <div
              style={{
                backgroundColor: activeColor[SHADE],
                borderRadius: '100%',
                width: 18,
                height: 18
              }}
            />
          </ListItemIcon>
          <ListItemText>{strings.ttl__active}</ListItemText>
        </MenuItem>
        <MenuItem
          dense
          component={Button}
          onClick={() => handleStatusViewSelect(ARCHIVED)}
        >
          <ListItemIcon>
            <div
              style={{
                backgroundColor: archivedColor[SHADE],
                borderRadius: '100%',
                width: 18,
                height: 18
              }}
            />
          </ListItemIcon>
          <ListItemText>{strings.ttl__archived}</ListItemText>
        </MenuItem>
        <MenuItem
          dense
          component={Button}
          onClick={() => handleStatusViewSelect(DELETED)}
        >
          <ListItemIcon>
            <div
              style={{
                backgroundColor: removedColor[SHADE],
                borderRadius: '100%',
                width: 18,
                height: 18
              }}
            />
          </ListItemIcon>
          <ListItemText>{strings.ttl__removed}</ListItemText>
        </MenuItem>
      </Menu>
    </Container>
  );
}

ProjectsStatusSelect.propTypes = {
  projectStatusView: PropTypes.string.isRequired,
  setProjectStatusView: PropTypes.func.isRequired
};

export default ProjectsStatusSelect;
