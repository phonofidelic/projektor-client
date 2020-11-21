import React from 'react';

import { TaskSuggestions } from 'components/TaskAnalysis';

export default function TaskDetails(props) {
  const { workItem, project, values, setFieldValue } = props;

  return (
    <div style={{ padding: 24 }}>
      <TaskSuggestions
        workItem={workItem}
        projectId={project._id}
        notes={values.notes}
        taskAlloc={values.taskAlloc}
        setFieldValue={setFieldValue}
      />
    </div>
  );
}
