import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import useTaskAnalysis from './hooks/useTaskAnalysis';
import TaskForm from 'components/TaskForm';
import FormModal from 'components/FormModal';

import { StringContext } from 'strings';

import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
// import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Popover from '@material-ui/core/Popover';
// import Skeleton from '@material-ui/lab/Skeleton';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DoneIcon from '@material-ui/icons/Done';

const TaskContainerGridItem = styled(Grid)`
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  min-height: 5em;
  max-height: 10em;
  overflow-y: auto;
`;

export default function TaskSuggestions(props) {
  const { workItem, projectId, notes, setFieldValue } = props;

  const { data: taskKeywords, error } = useTaskAnalysis({
    notes,
    projectId,
  });

  const [addedTasks, setAddedTasks] = useState(workItem?.tasks || []);
  const [taskAlloc, setTaskAlloc] = useState(
    workItem?.taskAlloc?.map((alloc) => ({ ...alloc, locked: false })) || []
  );
  const [customTaskAnchor, setCustomTaskAnchor] = useState(false);

  const strings = useContext(StringContext);
  const theme = useTheme();

  const includesTerm = (tasks, term) =>
    tasks.findIndex((task) => task.value === term) >= 0 ? true : false;

  const handleAddTask = (task) => {
    console.log('### handleAddTask, task:', task);
    const tempId = uuidv4();
    const newTask = {
      ...task,
      _id: tempId,
    };

    setTaskAlloc((taskAlloc) => {
      setAddedTasks((addedTasks) => {
        return [...addedTasks, newTask];
      });
      return [...taskAlloc, { task: tempId }].map((item) => ({
        ...item,
        allocation: workItem.duration / (taskAlloc.length + 1),
      }));
    });

    setFieldValue('tasks', addedTasks);
    setFieldValue('taskAlloc', taskAlloc);
  };

  const handleRemoveTask = (taskToRemove) => {
    setAddedTasks(
      addedTasks.filter((task) => task.value !== taskToRemove.value)
    );

    console.log('### handleRemoveTask, taskToRemove:', taskToRemove);
    console.log('### handleRemoveTask, taskAlloc:', taskAlloc);
    setTaskAlloc((taskAlloc) =>
      taskAlloc
        .filter((item) => item.task !== taskToRemove._id)
        /** Re-calculate allocation */
        .map((item) => ({
          ...item,
          allocation: workItem.duration / (taskAlloc.length - 1),
        }))
    );

    setFieldValue('tasks', addedTasks);
    setFieldValue('taskAlloc', taskAlloc);
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

  const openCustomTask = (evt) => {
    setCustomTaskAnchor(evt.currentTarget);
  };

  const closeCustomTask = () => {
    setCustomTaskAnchor(null);
  };

  // console.log('TaskSuggestions, taskAlloc:', taskAlloc);

  useEffect(() => {
    setFieldValue('tasks', addedTasks);
    setFieldValue('taskAlloc', taskAlloc);
  }, [addedTasks, taskAlloc, setFieldValue]);

  if (error)
    return (
      <Box color="error.main">
        <Typography>{error.message}</Typography>
      </Box>
    );

  // if (loading)
  //   return (
  //     <Box>
  //       {/* <Typography>Loading...</Typography> */}
  //       <Skeleton variant="rect" height="10em" />
  //     </Box>
  //   );

  // if (!taskKeywords) return null;

  return (
    <Grid
      container
      style={{
        // height: 42,
        marginTop: 16,
      }}
    >
      <TaskContainerGridItem item xs={12} sm={5} theme={theme}>
        <div
          style={{
            marginLeft: 8,
          }}
        >
          <Typography variant="overline">
            {strings.lbl__suggested_tasks}:
          </Typography>
        </div>

        <Tooltip arrow title={'Add a new cusom Task'}>
          <Chip
            style={{
              margin: 4,
              backgroundColor: theme.palette.secondary.main,
              borderColor: theme.palette.secondary.main,
            }}
            // color={task._id ? 'primary' : 'default'}
            variant="outlined"
            icon={
              <AddCircleIcon style={{ color: theme.palette.primary.main }} />
            }
            // disabled={includesTerm(addedTasks, task.value)}
            label={strings.btn__custom_task}
            onClick={openCustomTask}
          />
        </Tooltip>
        <FormModal
          maxWidth={500}
          open={Boolean(customTaskAnchor)}
          // anchorEl={customTaskAnchor}
          handleClose={closeCustomTask}
        >
          <TaskForm
            workId={workItem?._id}
            projectId={projectId}
            handleClose={closeCustomTask}
          />
        </FormModal>

        {taskKeywords &&
          taskKeywords.map((task, i) => (
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
      </TaskContainerGridItem>

      <Grid item xs={12} sm={2} style={{ height: 8 }}></Grid>

      <TaskContainerGridItem item xs={12} sm={5} theme={theme}>
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
                // taskAlloc?.find(
                //   (taskAlocItem) => taskAlocItem.task === addedTask._id
                // )?.allocation,
                taskAlloc[i]?.allocation,
                'ms'
              )
              .format('hh:mm', { trim: false })}`}
            onDelete={() => handleRemoveTask(addedTask)}
          />
        ))}
      </TaskContainerGridItem>
      {taskAlloc.length > 1 && (
        <Grid item sx={12}>
          Task allocation
          {taskAlloc.map((task, i) => (
            <div style={{ display: 'flex' }} key={`task-alloc_${i}`}>
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
              {/* {addedTasks[i].value} */}
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
