import React, { useContext, useState, useMemo } from 'react';
import { StringContext } from 'strings';
import moment from 'moment';
import { useTable, useSortBy } from 'react-table';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

moment.locale(navigator.language);

function ContextMenu(props) {
  const {
    open,
    contextPos,
    workItem,
    handleCloseContextMenu,
    handleOpenWork,
    removeWork,
  } = props;

  const strings = useContext(StringContext);

  const selectEdit = () => {
    handleOpenWork(workItem);
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
        horizontal: contextPos.x || 0,
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
  const { project, handleOpenWork, removeWork } = props;
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();
  const [selectedWork, setSelectedWork] = useState({ _id: null });
  const [contextOpen, setContextMenuOpen] = useState(false);
  const [contextPos, setContextPos] = useState({});

  const data = useMemo(
    () =>
      project.work.map((workItem) => ({
        ...workItem,
        date: moment(workItem.start).format(
          currentLocaleData.longDateFormat('L')
        ),
        start: moment(workItem.start).format(
          currentLocaleData.longDateFormat('LT')
        ),
        stop: workItem.end
          ? moment(workItem.end).format(currentLocaleData.longDateFormat('LT'))
          : '--',
        duration: moment
          .duration(workItem.duration, 'ms')
          .format('hh:mm:ss', { trim: false }),
      })),
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: strings.lbl__work_tbl_start_date,
        accessor: 'date',
      },
      {
        Header: strings.lbl__work_tbl_start_time,
        accessor: 'start',
      },
      {
        Header: strings.lbl__work_tbl_end_time,
        accessor: 'stop',
      },
      {
        Header: strings.lbl__work_tbl_duration,
        accessor: 'duration',
      },
      {
        Header: strings.lbl__work_tbl_notes,
        accessor: 'notes',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  const handleSelectWork = (work) => {
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
    <Paper style={{ margin: 18, flex: 1 }}>
      <ContextMenu
        open={contextOpen}
        contextPos={contextPos}
        workItem={selectedWork}
        handleOpenWork={handleOpenWork}
        handleCloseContextMenu={handleCloseContextMenu}
        removeWork={removeWork}
      />
      <Table size="small" {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <TableSortLabel
                    active={column.isSorted}
                    direction={column.isSortedDesc ? 'desc' : 'asc'}
                  >
                    {/* {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ExpandMoreIcon style={{ lineHeight: '16px' }} />
                      ) : (
                        <ExpandLessIcon style={{ lineHeight: '16px' }} />
                      )
                    ) : (
                      ''
                    )} */}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow
                {...row.getRowProps()}
                style={{ cursor: 'pointer' }}
                key={row.original._id}
                hover
                selected={row.original._id === selectedWork._id}
                onClick={() => handleSelectWork(row.original)}
                onContextMenu={(e) => handleOpenContextMenu(e, row.original)}
                onDoubleClick={() => handleOpenWork(row.original)}
              >
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}
