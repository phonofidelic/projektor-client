import React, { useContext, useState, useMemo } from 'react';
import { StringContext } from 'strings';
import moment from 'moment';
import { useTable, useSortBy, useExpanded, usePagination } from 'react-table';
import TablePaginationActions from 'components/TablePaginationActions';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const MAX_ROWS = 10;

const StyledTableCell = withStyles({
  head: { background: '#fff' },
})(TableCell);

const useStyles = makeStyles({
  selected: {
    background: 'linear-gradient(180deg, #eee 100%, #fff 20%)',
  },
});

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
  const { work, handleOpenWork, removeWork } = props;
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();
  const [selectedWork, setSelectedWork] = useState({ _id: null });
  const [contextOpen, setContextMenuOpen] = useState(false);
  const [contextPos, setContextPos] = useState({});
  const classes = useStyles();

  const data = useMemo(() => work.map((workItem) => workItem), [work]);

  const columns = useMemo(
    () => [
      {
        Header: strings.lbl__work_tbl_start_date,
        accessor: (row) =>
          moment(row.start).format(currentLocaleData.longDateFormat('L')),
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
    [currentLocaleData, strings]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    /** Pagination props */
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, autoResetSortBy: false },
    useSortBy,
    useExpanded,
    usePagination
  );

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

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  return (
    <>
      {/* <Paper style={{ margin: 18, flex: 1 }}> */}
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
                <StyledTableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div style={{ display: 'flex' }}>
                    {column.render('Header')}
                    <TableSortLabel
                      active={column.isSorted}
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  </div>
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
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
                classes={{ selected: classes.selected }}
              >
                {row.cells.map((cell) => (
                  <TableCell style={{ maxWidth: 100 }} {...cell.getCellProps()}>
                    <Typography noWrap>{cell.render('Cell')}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
        {rows.length > MAX_ROWS && (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[MAX_ROWS, MAX_ROWS + 15, MAX_ROWS + 40]}
                colSpan={5}
                count={rows.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={(e) => {
                  setPageSize(Number(e.target.value));
                }}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
      {/* </Paper> */}
    </>
  );
}
