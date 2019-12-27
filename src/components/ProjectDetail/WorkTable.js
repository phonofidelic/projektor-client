import React, { useContext, useState } from 'react';
import { StringContext } from 'strings';
import moment from 'moment';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function ContextMenu(props) {
  const {
    open,
    contextPos,
    workItem,
    handleCloseContextMenu,
    hadleOpenNote,
    removeWork
  } = props;
  const strings = useContext(StringContext);

  const selectEdit = () => {
    hadleOpenNote(workItem);
    handleCloseContextMenu();
  };

  const handleSelectDelete = () => {
    if (window.confirm(strings.msg__confirm_delete_work)) {
      removeWork(workItem._id);
      handleCloseContextMenu();
    } else {
      handleCloseContextMenu();
    }
  };

  return (
    <Menu
      open={open}
      style={{ padding: '0px', position: 'fixed', transformOrigin: 0 }}
      anchorEl={document.body}
      anchorOrigin={{
        vertical: contextPos.y + window.scrollY || 0,
        horizontal: contextPos.x || 0
      }}
      getContentAnchorEl={null}
      onClose={handleCloseContextMenu}
    >
      <MenuItem key="add-note" button component={ListItem} onClick={selectEdit}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText>{strings.btn__edit}</ListItemText>
      </MenuItem>
      <MenuItem
        key="delete-work"
        button
        component={ListItem}
        onClick={handleSelectDelete}
      >
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText>{strings.btn__delete}</ListItemText>
      </MenuItem>
    </Menu>
  );
}

export default function WorkTable(props) {
  const { project, hadleOpenNote, removeWork } = props;
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();
  const [selectedWork, setSelectedWork] = useState({ _id: null });
  const [contextOpen, setContextMenuOpen] = useState(false);
  const [contextPos, setContextPos] = useState({});

  const handleSelectWork = work => {
    setSelectedWork(work);
  };

  const handleOpenContextMenu = (e, workItem) => {
    e.preventDefault();
    setSelectedWork(workItem);
    setContextPos({ x: e.clientX, y: e.clientY });
    setContextMenuOpen(true);
  };

  const handleCloseContextMenu = () => {
    setContextPos({});
    setContextMenuOpen(false);
  };

  return (
    <Paper style={{ margin: 18 }}>
      <ContextMenu
        open={contextOpen}
        contextPos={contextPos}
        workItem={selectedWork}
        hadleOpenNote={hadleOpenNote}
        handleCloseContextMenu={handleCloseContextMenu}
        removeWork={removeWork}
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{strings.lbl__work_tbl_start_date}</TableCell>
            <TableCell>{strings.lbl__work_tbl_start_time}</TableCell>
            <TableCell>{strings.lbl__work_tbl_end_time}</TableCell>
            <TableCell>{strings.lbl__work_tble_duration}</TableCell>
            <TableCell>{strings.lbl__work_tble_notes}</TableCell>
            {/* <TableCell style={{ width: 71 }}></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {project.work.map(workItem => (
            // <Tooltip
            //   key={workItem._id}
            //   title="Right-click for options"
            //   enterDelay={800}
            // >
            <TableRow
              key={workItem._id}
              hover
              selected={workItem._id === selectedWork._id}
              onClick={() => handleSelectWork(workItem)}
              onContextMenu={e => handleOpenContextMenu(e, workItem)}
            >
              <TableCell>
                <Typography>
                  {moment(workItem.date).format(
                    currentLocaleData.longDateFormat('L')
                  )}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {moment(workItem.start).format(
                    currentLocaleData.longDateFormat('LT')
                  )}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {workItem.end
                    ? moment(workItem.end).format(
                        currentLocaleData.longDateFormat('LT')
                      )
                    : '--'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {moment
                    .duration(workItem.duration, 'ms')
                    .format('hh:mm:ss', { trim: false })}
                </Typography>
              </TableCell>
              <TableCell>
                {workItem.notes ? (
                  <Typography
                    noWrap
                    style={{ maxWidth: 150, cursor: 'pointer' }}
                    onClick={() => hadleOpenNote(workItem)}
                  >
                    {workItem.notes}
                  </Typography>
                ) : (
                  <Typography
                    variant="caption"
                    style={{ margin: 10, cursor: 'pointer' }}
                    onClick={() => hadleOpenNote(workItem)}
                  >
                    {strings.msg__default_empty_notes}
                  </Typography>
                )}
              </TableCell>
              {/* <TableCell style={{ padding: 0 }}>
                {workItem._id === selectedWork._id && (
                  <div style={{ display: 'flex' }}>
                    <Tooltip
                      title={strings.hnt__add_note}
                      placement="top-start"
                      enterDelay={400}
                    >
                      <IconButton
                        size="small"
                        onClick={() => hadleOpenNote(workItem)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={strings.hnt__add_note}
                      placement="top-start"
                      enterDelay={400}
                    >
                      <IconButton
                        size="small"
                        onClick={() => hadleOpenNote(workItem)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
              </TableCell> */}
            </TableRow>
            // </Tooltip>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
