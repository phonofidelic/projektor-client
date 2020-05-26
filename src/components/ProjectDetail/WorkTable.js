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

  const data = useMemo(() => project.work, [project.work]);

  const columns = useMemo(
    () => [
      {
        Header: strings.lbl__work_tbl_start_date,
        accessor: (row) =>
          moment(row.date).format(currentLocaleData.longDateFormat('L')),
      },
      {
        Header: strings.lbl__work_tbl_start_time,
        accessor: (row) =>
          moment(row.start).format(currentLocaleData.longDateFormat('LT')),
      },
      {
        Header: strings.lbl__work_tbl_end_time,
        accessor: (row) =>
          moment(row.end).format(currentLocaleData.longDateFormat('LT')),
      },
      {
        Header: strings.lbl__work_tbl_duration,
        accessor: (row) =>
          moment
            .duration(row.duration, 'ms')
            .format('hh:mm:ss', { trim: false }),
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
      <Table size="small" {...getTableProps()} stickyHeader>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div style={{ display: 'flex' }}>
                    {column.render('Header')}
                    <TableSortLabel
                      active={column.isSorted}
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  </div>
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
                    <Typography noWrap>{cell.render('Cell')}</Typography>
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
