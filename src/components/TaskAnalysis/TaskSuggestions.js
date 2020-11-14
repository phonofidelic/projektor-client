import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import useTaskAnalysis from './hooks/useTaskAnalysis';

import { StringContext } from 'strings';

import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';

const StyledSlider = styled(Slider)`
  .MuiSlider-thumb {
    background-color: 'green';
  }
`;

export default function TaskSuggestions(props) {
  const { workItem, projectId, notes, setFieldValue } = props;
  const { data: taskKeywords, loading, error } = useTaskAnalysis({
    notes,
    projectId,
  });
  const [addedTasks, setAddedTasks] = useState(workItem?.tasks || []);
  const [taskAlloc, setTaskAlloc] = useState(
    workItem?.taskAlloc?.map((alloc) => ({ ...alloc, locked: false })) || []
  );
  const strings = useContext(StringContext);
  const theme = useTheme();

  const includesTerm = (tasks, term) =>
    tasks.findIndex((task) => task.value === term) >= 0 ? true : false;

  const handleAddTask = (task) => {
    const newTask = {
      ...task,
    };

    setAddedTasks([...addedTasks, newTask]);
  };

  const handleRemoveTask = (taskToRemove) => {
    setAddedTasks(
      addedTasks.filter((task) => task.value !== taskToRemove.value)
    );

    console.log('### handleRemoveTask, taskToRemove:', taskToRemove);
    console.log('### handleRemoveTask, taskAlloc:', taskAlloc);
    setTaskAlloc(taskAlloc.filter((item) => item.task !== taskToRemove._id));
  };

  const handleAllocationChange = (value, allocatedTask) => {
    console.log(
      '### handleAllocationChange, calculation:',
      (workItem.duration - value) / (taskAlloc.length - 1)
    );

    setTaskAlloc(
      taskAlloc.map((item, i) => {
        if (item.task === allocatedTask) {
          return {
            ...item,
            allocation: value,
            locked: true,
          };
        }

        return {
          ...item,
          allocation: (workItem.duration - value) / (taskAlloc.length - 1),
        };
      })
    );

    // setTaskAlloc(
    //   taskAlloc.map((task, i) => ({
    //     ...task,
    //     allocation: value,
    //   }))
    // );
    setFieldValue('taskAlloc', taskAlloc);
  };

  const getDurationFormat = (value) => {
    const duration = moment
      .duration(value, 'ms')
      .format('hh:mm', { trim: false });

    return duration;
  };

  // console.log('TaskSuggestions, taskAlloc:', taskAlloc);

  useEffect(() => {
    setFieldValue('tasks', addedTasks);
    // setFieldValue('taskAlloc', taskAlloc);
  }, [addedTasks, setFieldValue]);

  if (error)
    return (
      <Box color="error.main">
        <Typography>{error.message}</Typography>
      </Box>
    );

  if (loading)
    return (
      <Box>
        <Typography>Loading...</Typography>
      </Box>
    );

  if (!taskKeywords) return null;

  return (
    <Grid
      container
      style={{
        // height: 42,
        marginTop: 16,
      }}
    >
      <Grid
        item
        xs={12}
        sm={5}
        style={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <div
          style={{
            marginLeft: 8,
          }}
        >
          <Typography variant="overline">
            {strings.lbl__suggested_tasks}:
          </Typography>
        </div>
        {taskKeywords.map((task, i) => (
          <Grow
            key={`suggested_task_${i}`}
            in={true}
            mountOnEnter
            unmountOnExit
          >
            <Tooltip
              arrow
              title={
                task._id ? strings.hnt__add_task : strings.hnt__create_task
              }
            >
              <Chip
                style={{
                  margin: 4,
                }}
                color={task._id ? 'primary' : 'default'}
                variant="outlined"
                icon={
                  includesTerm(addedTasks, task.value) ? <DoneIcon /> : null
                }
                disabled={includesTerm(addedTasks, task.value)}
                label={task.value}
                onClick={() => handleAddTask(task)}
              />
            </Tooltip>
          </Grow>
        ))}
      </Grid>

      <Grid item xs={12} sm={2} style={{ height: 8 }}></Grid>

      <Grid
        item
        xs={12}
        sm={5}
        style={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <div
          style={{
            marginLeft: 8,
          }}
        >
          <Typography variant="overline">
            {strings.lbl__added_tasks}:
          </Typography>
        </div>
        {addedTasks.map((addedTask, i) => (
          <Chip
            style={{
              margin: 4,
            }}
            key={`added-task_${i}`}
            label={`${addedTask.displayName} - ${moment
              .duration(
                taskAlloc?.find(
                  (taskAlocItem) => taskAlocItem.task === addedTask._id
                )?.allocation,
                'ms'
              )
              .format('hh:mm', { trim: false })}`}
            onDelete={() => handleRemoveTask(addedTask)}
          />
        ))}
      </Grid>
      {taskAlloc && (
        <Grid item sx={12}>
          Task allocation
          {taskAlloc.map((task, i) => (
            <div key={`task-alloc_${i}`}>
              <Slider
                value={task.allocation}
                defaultValue={task.allocation}
                max={workItem?.duration}
                valueLabelDisplay="auto"
                valueLabelFormat={getDurationFormat}
                step={300000}
                onChange={(e, value) =>
                  handleAllocationChange(value, task.task)
                }
              />
            </div>
          ))}
          {/* <StyledSlider
            value={taskAlloc.map((task, i) => task.allocation * (i + 1))}
            // value={taskAlloc.map((task, i) => task.allocation)}
            // defaultValue={taskAlloc.map((task, i) => task.allocation * (i + 1))}
            max={workItem?.duration}
            valueLabelDisplay="auto"
            valueLabelFormat={(value, i) => {
              const displayValue = value - (taskAlloc[i]?.allocation || 0);
              return getDurationFormat(value);
            }}
            step={60000}
            onChange={(e, value) => handleAllocationChange(value)}
          /> */}
        </Grid>
      )}
    </Grid>
  );
}
