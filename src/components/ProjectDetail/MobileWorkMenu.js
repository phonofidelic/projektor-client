import React, { useContext } from 'react';

import { StringContext } from 'strings';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function MobileWorkMenu(props) {
  const {
    open,
    workItem,
    handleCloseWorkMenu,
    handleOpenWork,
    removeWork
  } = props;

  const strings = useContext(StringContext);

  const selectEdit = () => {
    handleOpenWork(workItem);
    handleCloseWorkMenu();
  };

  const selectDelete = () => {
    if (window.confirm(strings.msg__confirm_delete_work)) {
      removeWork(workItem._id);
      handleCloseWorkMenu();
    } else {
      handleCloseWorkMenu();
    }
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={handleCloseWorkMenu}
      onOpen={() => console.log('### OPEN ###')}
    >
      <List>
        <ListItem key="edit-work" onClick={selectEdit}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>{strings.btn__edit}</ListItemText>
        </ListItem>
        <ListItem key="delete-work" onClick={selectDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>{strings.btn__delete}</ListItemText>
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
}
