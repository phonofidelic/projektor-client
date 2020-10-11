import React, { useMemo } from 'react';
import useTaskData from './hooks/useTaskData';
import moment from 'moment';

import { useTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';

export default function TaskTable(props) {
  const { project } = props;
  const [taskData, loading, error] = useTaskData(project._id);
  const theme = useTheme();

  console.log('TaskTable, taskData:', taskData);

  // const taskDataWithProjectTime = taskData.map((task) => ({
  //   ...task,
  //   projectTime: task.work.reduce((acc, cur) => {
  //     return acc + cur.duration;
  //   }, 0),
  // }));

  // const durations = taskDataWithProjectTime.map(
  //   (task) => (task.projectTime / project.timeUsed) * 100
  // );

  // console.log('### durations:', durations);
  // console.log('TaskTable, taskDataWithProjectTime:', taskDataWithProjectTime);

  if (error) return <div>{error.message}</div>;

  if (loading) return <div>Loading...</div>;

  if (taskData.length < 1) return <div>Loading...</div>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography noWrap>Task Name</Typography>
          </TableCell>
          <TableCell>
            <Typography noWrap align="right">
              Work Entries
            </Typography>
          </TableCell>
          <TableCell>
            <Typography noWrap align="right">
              Time
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {taskData.map((task) => (
          <TableRow key={task._id} hover>
            <TableCell>
              {/* <Typography noWrap>{task.displayName}</Typography> */}
              <Chip
                style={{
                  margin: 4,
                  backgroundColor: theme.palette.background.default,
                }}
                variant="outlined"
                label={task.displayName}
                // onDelete={() => handleRemoveTask(addedTask)}
              />
            </TableCell>
            <TableCell align="right">{task.work.length}</TableCell>
            <TableCell align="right">
              <Typography>
                {moment
                  .duration(task.projectTime, 'ms')
                  .format('h:mm', { trim: false })}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(task.projectTime / project.timeUsed) * 100}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
