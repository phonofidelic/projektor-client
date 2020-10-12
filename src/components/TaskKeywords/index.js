import React, { useState } from 'react';

import useTaskKeywords from './hooks/useTaskKeywords';

import ErrorDialog from 'components/ErrorDialog';
import WorkModal from 'components/ProjectDetail/WorkModal';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import CircularProgress from '@material-ui/core/CircularProgress';

export const TaskKeywords = (props) => {
  const { project, handleSearch } = props;

  const [open, setOpen] = useState(false);

  const [
    taskTypes,
    loadingTaskAnalysis,
    taskAnalysisError,
    setTaskTypes,
    getTaskKeywords,
  ] = useTaskKeywords(project._id);

  console.log('### taskAnalysisError:', taskAnalysisError);

  const deleteTaskType = (term) => {
    setTaskTypes(taskTypes.filter((taskType) => taskType.term !== term));
  };

  const handleDelete = (task) => {
    console.log('delete task:', task);
    deleteTaskType(task.term);
  };

  const clearAllTaskTypes = () => {
    setTaskTypes([]);
    setOpen(false);
  };

  const openTaskAnalysis = () => {
    setOpen(true);
  };

  const closeTaskAnalysis = () => {
    setOpen(false);
  };

  const searchByTaskTerm = (term) => {
    handleSearch(term);
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <ErrorDialog
        showDialog={Boolean(taskAnalysisError)}
        title="Something went wrong..."
        body={taskAnalysisError.message}
      />
      <WorkModal
        open={open}
        // workItem={workItem}
        handleClose={closeTaskAnalysis}
      >
        <div
          style={{
            padding: 16,
          }}
        >
          <div>
            <Typography
              variant="h5"
              align="left"
              style={{
                height: 48,
                lineHeight: '48px',
              }}
            >
              Task Types
            </Typography>
            <Typography color="textSecondary">
              Tasks can be assigned a type to help organize your work. Here are
              some suggested Types we found based on your Task notes.
            </Typography>
          </div>
          <div
            style={{
              marginTop: 16,
              // textAlign: 'center',
              maxHeight: '30vh',
              overflowY: 'auto',
            }}
          >
            {taskTypes.map((task, i) => (
              <Chip
                key={`task_type_${i}`}
                style={{
                  // marginRight: 5
                  margin: 5,
                }}
                variant="outlined"
                // avatar={<DoneIcon />}
                label={
                  task.edit ? <TextField defaultValue={task.term} /> : task.term
                }
                onDelete={() => handleDelete(task)}
                // deleteIcon={<DoneIcon />}
                onClick={() => searchByTaskTerm(task.term)}
              />
            ))}
          </div>
          <div
            style={{
              marginTop: 16,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Box color="error.main">
              <Button color="inherit" onClick={clearAllTaskTypes}>
                Clear All
              </Button>
            </Box>
            <Button onClick={closeTaskAnalysis}>Cancel</Button>
          </div>
        </div>
      </WorkModal>
      <div
        style={{
          display: 'flex',
          overflowY: 'auto',
          maxWidth: 500,
          margin: 'auto',
        }}
      >
        {taskTypes.slice(0, 3).map((task, i) => (
          <Chip
            key={`task_type_${i}`}
            style={{
              // marginRight: 5
              margin: 5,
            }}
            variant="outlined"
            label={task.term}
            onDelete={() => handleDelete(task)}
            // deleteIcon={<DoneIcon />}
            onClick={() => handleSearch(task.term)}
          />
        ))}
      </div>
      <Button
        size="small"
        // variant="outlined"
        onClick={() => openTaskAnalysis()}
      >
        View all
      </Button>
      <IconButton
        // size="small"
        // variant="outlined"
        onClick={() => getTaskKeywords(project._id)}
      >
        {loadingTaskAnalysis ? (
          <CircularProgress size={15} />
        ) : (
          <BubbleChartIcon />
        )}
      </IconButton>
    </div>
  );
};

export default TaskKeywords;
