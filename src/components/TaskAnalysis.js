import React, { useState } from 'react';
// import { connect } from 'react-redux';
import { api } from 'actions/utils';
import useTaskKeywords from 'hooks/useTaskKeywords';

import WorkModal from 'components/ProjectDetail/WorkModal';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import CircularProgress from '@material-ui/core/CircularProgress';

// const TASK_KEYWORDS = 'task_keywords',
//   TASK_KEYWORDS_SUCCESS = 'task_keywords_success',
//   TASK_KEYWORDS_FAILURE = 'task_keywords_failure',
//   DELETE_TASK_KEYWORD = 'delete_taske_keyword';

// /**
//  * Task analysis reducer
//  */
// const defaultState = {
//   taskTypesAnalyzed: false,
//   taskTypes: [],
//   loading: false,
// };
// export const taskAnalysisReducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case TASK_KEYWORDS:
//       return {
//         ...state,
//         loading: true,
//       };

//     case TASK_KEYWORDS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         taskTypesAnalyzed: true,
//         taskTypes: action.payload,
//       };

//     case TASK_KEYWORDS_FAILURE:
//       return {
//         ...state,
//         loading: false,
//       };

//     case DELETE_TASK_KEYWORD:
//       return {
//         ...state,
//         taskTypes: state.taskTypes.filter(
//           (taskType) => taskType.term !== action.payload
//         ),
//       };

//     default:
//       return state;
//   }
// };

// const actions = {
//   getTaskKeywords: (projectId) => {
//     return async (dispatch) => {
//       dispatch({
//         type: TASK_KEYWORDS,
//       });

//       let response;
//       try {
//         response = await api().get(`/projects/keytasks/${projectId}`);
//         console.log();
//         handleResponse(response, dispatch, TASK_KEYWORDS_SUCCESS);
//       } catch (err) {
//         console.error(err);
//         handleError(err, dispatch, TASK_KEYWORDS_FAILURE);
//       }
//     };
//   },
//   deleteTaskType: (taskTerm) => {
//     return (dispatch) => {
//       dispatch({
//         type: DELETE_TASK_KEYWORD,
//         payload: taskTerm,
//       });
//     };
//   },
// };

export const TaskAnalysis = (props) => {
  const {
    project,
    // loadingTaskAnalysis,
    // taskTypesAnalyzed,
    // taskTypes,
    // getTaskKeywords,
    // deleteTaskType,
    handleSearch,
  } = props;

  // const [loadingTaskAnalysis, setLoadingTaskAnalysis] = useState(false);
  const [taskTypesAnalyzed, setTaskTypesAnalyzed] = useState(false);
  // const [taskTypes, setTaskTypes] = useState([]);
  const [open, setOpen] = useState(false);

  const [
    taskTypes,
    loadingTaskAnalysis,
    error,
    setTaskTypes,
    getTaskKeywords,
  ] = useTaskKeywords(project._id);

  // const getTaskKeywords = async (projectId) => {
  //   let response;

  //   try {
  //     response = await api().get(`/projects/keytasks/${projectId}`);
  //   } catch (err) {
  //     console.error(err);
  //     setLoadingTaskAnalysis(false);
  //   }

  //   const taskTypes = response.data.data.map((taskType) => ({
  //     ...taskType,
  //     id: taskType.term.replace(' ', '_'),
  //   }));
  //   console.log('taskTypes:', taskTypes);

  //   setTaskTypes(taskTypes);
  //   setLoadingTaskAnalysis(false);
  //   setTaskTypesAnalyzed(true);
  // };

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
            <Button color="secondary" onClick={clearAllTaskTypes}>
              Clear All
            </Button>
            <Button onClick={closeTaskAnalysis}>Cancel</Button>
          </div>
        </div>
      </WorkModal>
      <div
        style={{
          display: 'flex',
          overflowY: 'auto',
          maxWidth: 500,
          pasddingTop: 5,
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

// const mapStateToProps = (state) => ({
//   taskTypes: state.taskAnalysis.taskTypes,
//   loadingTaskAnalysis: state.taskAnalysis.loading,
//   taskTypesAnalyzed: state.taskAnalysis.taskTypesAnalyzed,
// });

// export default connect(mapStateToProps, actions)(TaskAnalysis);
export default TaskAnalysis;
