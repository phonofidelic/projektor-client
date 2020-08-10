import React, { useContext } from 'react';

import { StringContext } from 'strings';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

export default function MobileProjectStatusSelect(props) {
  const { open, menuOptions, handleCloseMenu, handleStatusViewSelect } = props;

  const strings = useContext(StringContext);

  return (
    <SwipeableDrawer
      anchor="top"
      open={open}
      onClose={handleCloseMenu}
      onOpen={() => console.log('### OPEN ###')}
    >
      <ListItem key="status-select_hint" dense>
        <ListItemText>{strings.hnt__status_select}</ListItemText>
      </ListItem>
      {menuOptions.map(option => (
        <ListItem
          key={`status-select_${option.value}`}
          button
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
        </ListItem>
      ))}
    </SwipeableDrawer>
  );
}
