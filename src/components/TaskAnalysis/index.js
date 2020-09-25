import React from 'react';
import useTaskAnalysis from './hooks/useTaskAnalysis';

import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

export default function TaskAnalysis(props) {
  const { notes } = props;
  const { data: taskKeywords, error } = useTaskAnalysis(notes);

  if (error)
    return (
      <Box color="error.main">
        <Typography>{error.message}</Typography>
      </Box>
    );

  return (
    <div style={{ height: 42 }}>
      {taskKeywords.map((task, i) => (
        <Tooltip
          key={`task_keyword_${i}`}
          arrow
          title={'Click to create this task'}
        >
          <Grow in={true} mountOnEnter unmountOnExit>
            <Chip
              style={{
                // marginRight: 5
                margin: 5,
              }}
              variant="outlined"
              // avatar={<DoneIcon />}
              label={
                task.edit ? <TextField defaultValue={task.term} /> : task.term
              }
              // onDelete={() => handleDelete(task)}
              // deleteIcon={<DoneIcon />}
              // onClick={() => searchByTaskTerm(task.term)}
            />
          </Grow>
        </Tooltip>
      ))}
    </div>
  );
}
