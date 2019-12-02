import {
  SELECT_PROJECT,
  POST_CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE
} from 'actions/types';
import { uuid } from 'uuidv4';
import mockProjects from 'utils/mockProjects';

export const getProjects = () => {
  return dispatch => {
    dispatch({
      type: GET_PROJECTS
    });

    setTimeout(() => {
      dispatch({
        type: GET_PROJECTS_SUCCESS,
        payload: mockProjects
      });
    }, 1000);
  };
};

export const selectProject = id => {
  console.log('selectProject, id:', id);
  return dispatch => {
    dispatch({
      type: SELECT_PROJECT,
      payload: id
    });
  };
};

export const createProject = (data, history) => {
  console.log('createProject, data:', data);

  // Create mock Project
  const mockProject = {
    id: uuid(),
    created: Date.now(),
    title: data.title,
    description: data.description,
    client: data.client,
    budgetedTime: data.budgetedTime,
    timeUsed: 0,
    startDate: data.StartDate || null,
    deadline: data.deadline || null,
    work: []
  };

  return dispatch => {
    dispatch({
      type: POST_CREATE_PROJECT
    });

    setTimeout(() => {
      history.push(`${mockProject.id}`);
      dispatch({
        type: CREATE_PROJECT_SUCCESS,
        payload: mockProject
      });
    }, 1000);
  };
};
