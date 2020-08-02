import { useMemo } from 'react';
import { mockProject } from 'utils/mockData';
import moment from 'moment';
import { strings } from 'strings';

const currentLocaleData = moment.localeData();

export const mockTableData = useMemo([
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
]);

export const mockColumns = useMemo(
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

export const mockRow = {
  original: mockProject,
  getRowProps: () => null
};
