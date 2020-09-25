import React from 'react';
import useTaskAnalysis from './hooks/useTaskAnalysis';

import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

export default function TaskAnalysis(props) {
  const { notes } = props;
  const [taskKeywords, loading, error] = useTaskAnalysis(notes);

  return (
    <div>
      {taskKeywords.map((task, i) => (
        <Chip
          key={`task_type_${i}`}
          style={{
            // marginRight: 5
            margin: 5,
          }}
          variant="outlined"
          // avatar={<DoneIcon />}
          label={task.edit ? <TextField defaultValue={task.term} /> : task.term}
          // onDelete={() => handleDelete(task)}
          // deleteIcon={<DoneIcon />}
          // onClick={() => searchByTaskTerm(task.term)}
        />
      ))}
    </div>
  );
}
