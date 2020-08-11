import React, { useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { StringContext } from 'strings';
import moment from 'moment';
import { useTable, useSortBy } from 'react-table';

import ProjectTableRow from 'components/ProjectTableRow';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles({
  head: { background: '#fff' }
})(TableCell);

export function ProjectTable(props) {
  const { projects } = props;
  const [hovered, setHovered] = useState(null);
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();

  const handleRowHover = id => {
    setHovered(id);
  };

  const data = useMemo(
    () =>
      projects.map(project => ({
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
        timeUsed: moment
          .duration(project.timeUsed, 'milliseconds')
          .format('h:mm')
      })),
    [projects, strings, currentLocaleData]
  );

  const columns = useMemo(
    () => [
      {
        Header: strings.lbl__project_title,
        accessor: 'title'
      },
      {
        Header: strings.lbl__client,
        accessor: 'client'
      },
      {
        Header: strings.lbl__start_date,
        accessor: 'startDate'
      },
      {
        Header: strings.lbl__deadline,
        accessor: 'deadline'
      },
      {
        Header: strings.lbl__budgeted_time,
        accessor: 'budgetedTime'
      },
      {
        Header: strings.lbl__time_used,
        accessor: 'timeUsed'
      }
    ],
    [strings]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data }, useSortBy);

  return (
    <>
      {/* <Paper style={{ margin: 18, flex: 1 }}> */}
      <Table {...getTableProps()} stickyHeader>
        <TableHead style={{ backgroundColor: '#fff' }}>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <StyledTableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div style={{ display: 'flex' }}>
                    <Typography noWrap>{column.render('Header')}</Typography>
                    <TableSortLabel
                      title={`Sort ${
                        column.isSortedDesc ? 'ascending' : 'descending'
                      }`}
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
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <ProjectTableRow
                key={`project-table-row_${i}`}
                row={row}
                hovered={hovered}
                handleRowHover={handleRowHover}
              />
            );
          })}
        </TableBody>
      </Table>
      {/* </Paper> */}
    </>
  );
}

ProjectTable.propTypes = {
  projects: PropTypes.array
};

export default ProjectTable;
