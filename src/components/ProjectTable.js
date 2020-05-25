import React, { useContext, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { StringContext } from 'strings';
import moment from 'moment';
import { useTable, useSortBy } from 'react-table';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export default function ProjectTable(props) {
  const { projects } = props;
  const [selectedProject, setSelectedProject] = useState({ _id: null });
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();
  const history = useHistory();

  const data = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        startDate: project.startDate
          ? moment(project.startDate).format(
              currentLocaleData.longDateFormat('L')
            )
          : strings.msc__tbd_short,
        deadline: project.deadline
          ? moment(project.deadline).format(
              currentLocaleData.longDateFormat('L')
            )
          : strings.msc__open,
        budgetedTime: project.budgetedTime
          ? project.budgetedTime.toLocaleString(navigator.language) +
            strings.frg__hours_short
          : '',
      })),
    [projects]
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Project',
        accessor: 'title',
      },
      {
        Header: strings.lbl__client,
        accessor: 'client',
      },
      {
        Header: strings.lbl__start_date,
        accessor: 'startDate',
      },
      {
        Header: strings.lbl__deadline,
        accessor: 'deadline',
      },
      {
        Header: strings.lbl__budgeted_time,
        accessor: 'budgetedTime',
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

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  return (
    <Paper style={{ margin: 18, flex: 1 }}>
      <Table {...getTableProps()} stickyHeader>
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
                  />
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
                selected={row.original._id === selectedProject._id}
                // onClick={() => handleSelectProject(row.original)}
                onClick={() => history.push('projects/' + row.original._id)}
                // onContextMenu={(e) => handleOpenContextMenu(e, row.original)}
                // onDoubleClick={() => handleOpenWork(row.original)}
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
