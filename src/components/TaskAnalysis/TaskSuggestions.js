import React, { useContext, useState, useEffect } from 'react';

import useTaskAnalysis from './hooks/useTaskAnalysis';

import { StringContext } from 'strings';

import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';

export default function TaskSuggestions(props) {
  const { workItem, projectId, notes, setFieldValue } = props;
  const { data: taskKeywords, loading, error } = useTaskAnalysis({
    notes,
    projectId,
  });
  const [addedTasks, setAddedTasks] = useState(workItem?.tasks || []);
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
  };

  // console.log('TaskSuggestions, workItem:', workItem);

  useEffect(() => {
    setFieldValue('tasks', addedTasks);
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
            label={addedTask.displayName}
            onDelete={() => handleRemoveTask(addedTask)}
          />
        ))}
      </Grid>
    </Grid>
  );
}
