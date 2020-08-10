import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useMobileDetect from 'use-mobile-detect-hook';
import { StringContext } from 'strings';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

function MobileButton(props) {
  return (
    <div
      style={{
        position: 'fixed',
        // width: '100%',
        bottom: 0,
        right: 0,
        zIndex: 1,
        padding: 16,
        width: 56
      }}
    >
      <Fab
        // color="secondary"
        style={{
          backgroundColor: '#fff'
          // color: '#fff'
        }}
        component={Link}
        to="/projects/create"
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

function DesktopButton(props) {
  const strings = useContext(StringContext);

  return (
    <Tooltip
      arrow
      title={strings.hnt__create_project}
      placement="top-start"
      enterDelay={400}
    >
      <IconButton
        style={{
          textDecoration: 'none'
        }}
        component={Link}
        to="/projects/create"
      >
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}

export default function CreateProjectButton() {
  const { isMobile } = useMobileDetect();

  if (isMobile()) return <MobileButton />;
  return <DesktopButton />;
}
