import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useMobileDetect from 'use-mobile-detect-hook';

import { StringContext } from 'strings';
import { ACTIVE, ARCHIVED, DELETED } from 'constants/status';
import MobileProjectStatusSelect from './MobileProjectStatusSelect';
import DesktopProjectStatusSelect from './DesktopProjectStatusSelect';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import activeColor from '@material-ui/core/colors/green';
import archivedColor from '@material-ui/core/colors/orange';
import removedColor from '@material-ui/core/colors/red';

const SHADE = 400;

const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  height: 40px;
  margin: 4px; */
  margin: auto;
`;

export function ProjectsStatusSelect(props) {
  const { searchIsOpen, projectStatusView, setProjectStatusView } = props;
  const strings = useContext(StringContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isMobile } = useMobileDetect();

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

  const menuOptions = [
    {
      title: strings.ttl__active,
      value: ACTIVE,
      color: activeColor[SHADE]
    },
    {
      title: strings.ttl__archived,
      value: ARCHIVED,
      color: archivedColor[SHADE]
    },
    {
      title: strings.ttl__removed,
      value: DELETED,
      color: removedColor[SHADE]
    }
  ];

  return (
    <Container searchIsOpen={searchIsOpen} isMobile={isMobile()}>
      <Tooltip arrow title={strings.hnt__status_select}>
        {searchIsOpen && isMobile() ? (
          <div
            style={{
              width: 32,
              height: 32,
              // padding: 7,
              borderRadius: '100%',
              // backgroundColor: activeColor[SHADE],
              border: '1px solid #C4C4C4',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={handleOpenMenu}
          >
            <div
              style={{
                width: 18,
                height: 18,
                margin: 'auto',
                borderRadius: '100%',
                backgroundColor: getStatusColor(SHADE)
                // bodrer: '1px solid #C4C4C4'
              }}
            />
          </div>
        ) : (
          <Chip
            data-testid="project-status-select-button"
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
        )}
      </Tooltip>
      {isMobile() ? (
        <MobileProjectStatusSelect
          searchIsOpen={searchIsOpen}
          open={Boolean(anchorEl)}
          menuOptions={menuOptions}
          handleCloseMenu={handleCloseMenu}
          handleStatusViewSelect={handleStatusViewSelect}
        />
      ) : (
        <DesktopProjectStatusSelect
          anchorEl={anchorEl}
          menuOptions={menuOptions}
          handleCloseMenu={handleCloseMenu}
          handleStatusViewSelect={handleStatusViewSelect}
        />
      )}
    </Container>
  );
}

ProjectsStatusSelect.propTypes = {
  projectStatusView: PropTypes.string,
  setProjectStatusView: PropTypes.func.isRequired
};

export default ProjectsStatusSelect;
