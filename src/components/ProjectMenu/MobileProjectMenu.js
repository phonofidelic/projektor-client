import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { StringContext } from 'strings';
import { ACTIVE, DELETED } from 'constants/status';

import { useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function MobileProjectMenu(props) {
  const {
    project,
    anchorEl,
    menuActions,
    handleMenuSelection,
    handleDelete,
    handleCloseMenu,
  } = props;

  const strings = useContext(StringContext);
  const theme = useTheme();

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
      onOpen={() => console.log('### OPEN ###')}
    >
      <List>
        <ListItem key={`project-options_hint`} dense>
          <ListItemText
            primary={`${strings.hnt__project_options_for} "${project.title}"`}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
        {project.status === ACTIVE &&
          (project.isDemo ? (
            <ListItem
              button
              style={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
              }}
              key="edit"
              onClick={() => props.handleDemoEdit(project)}
            >
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText>{strings.btn__edit}</ListItemText>
            </ListItem>
          ) : (
            <ListItem
              button
              style={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
              }}
              key="edit"
              component={Link}
              to={`/projects/edit/${project._id}`}
            >
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText>{strings.btn__edit}</ListItemText>
            </ListItem>
          ))}
        {menuActions.map(
          (item, i) =>
            project.status !== item.status && (
              <ListItem
                button
                key={i}
                onClick={() => handleMenuSelection(project._id, item.status)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItem>
            )
        )}
        {project.status === DELETED && !project.isDemo && (
          <ListItem
            button
            key="perm_delete"
            onClick={() => handleDelete(project._id)}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>{strings.btn__delete}</ListItemText>
          </ListItem>
        )}
      </List>
    </SwipeableDrawer>
  );
}
