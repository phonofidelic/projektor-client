import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import ProjectTableRow from 'components/ProjectTableRow';
import { mockProject } from 'utils/mockData';
import { strings } from 'strings';
import moment from 'moment';

const currentLocaleData = moment.localeData();

export default {
  component: ProjectTableRow,
  title: 'ProjectTableRow',
  decorators: [storyFn => <div>{storyFn()}</div>],
  excludeStories: /.*Data$/
};

function MockTable() {
  const mockTableData = useMemo(
    () => [
      {
        ...mockProject,
        startDate: mockProject.startDate
          ? moment(mockProject.startDate).format(
              currentLocaleData.longDateFormat('L')
            )
          : strings.msc__tbd_short,
        deadline: mockProject.deadline
          ? moment(mockProject.deadline).format(
              currentLocaleData.longDateFormat('L')
            )
          : strings.msc__open,
        budgetedTime: mockProject.budgetedTime
          ? mockProject.budgetedTime.toLocaleString(navigator.language) +
            strings.frg__hours_short
          : '',
        timeUsed: moment
          .duration(mockProject.timeUsed, 'milliseconds')
          .format('h:mm')
      }
    ],
    []
  );

  const mockColumns = useMemo(
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

  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    data: mockTableData,
    columns: mockColumns
  });

  return (
    <>
      <table {...getTableProps()}>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return <ProjectTableRow row={row} />;
          })}
        </tbody>
      </table>
    </>
  );
}

export const Default = () => <MockTable />;
