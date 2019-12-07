import {
  SELECT_PROJECT,
  POST_CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  GET_PROJECT,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAILURE,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  START_WORK,
  CREATE_WORK,
  CREATE_WORK_SUCCESS,
  CREATE_WORK_FAILURE,
  STOP_WORK,
  POST_REGISTRATION,
  POST_REGISTRATION_SUCCESS,
  POST_REGISTRATION_FAILURE
} from 'actions/types';
import { uuid } from 'uuidv4';
import mockProjects from 'utils/mockProjects';
import axios from 'axios';

export const getProjects = () => {
  return async dispatch => {
    dispatch({
      type: GET_PROJECTS
    });

    let response;
    try {
      response = await axios.get('http://localhost:4000/projects');
      console.log('getProjects, response:', response);

      dispatch({
        type: GET_PROJECTS_SUCCESS,
        payload: response.data
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: GET_PROJECTS_FAILURE,
        payload: err
      });
    }
  };
};

export const getProject = projectId => {
  return async dispatch => {
    dispatch({
      type: GET_PROJECT
    });

    let response;
    try {
      response = await axios.get(`http://localhost:4000/projects/${projectId}`);

      dispatch({
        type: GET_PROJECT_SUCCESS,
        payload: response.data
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: GET_PROJECT_FAILURE,
        payload: err
      });
    }
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

export const createProject = (formData, history) => {
  console.log('createProject, formData:', formData);

  return async dispatch => {
    dispatch({
      type: POST_CREATE_PROJECT
    });

    let response;
    try {
      response = await axios.post(
        'http://localhost:4000/projects/create',
        formData
      );
      console.log('createProject, response:', response);

      dispatch({
        type: CREATE_PROJECT_SUCCESS,
        payload: response.formData
      });

      history.push(`/projects/${response.formData._id}`);
    } catch (err) {
      console.error(err);
      dispatch({
        type: CREATE_PROJECT_FAILURE,
        payload: err
      });
    }
  };
};

export const deleteProject = (projectId, history) => {
  console.log('deleteProject, projectId:', projectId);
  return async dispatch => {
    dispatch({
      type: DELETE_PROJECT
    });

    let response;
    try {
      response = await axios.put(
        `http://localhost:4000/projects/${projectId}/status/delete`,
        projectId
      );

      console.log('deleteProject, response:', response);

      dispatch({
        type: DELETE_PROJECT_SUCCESS,
        payload: response.data._id
      });
      history && history.push('/projects');
    } catch (err) {
      console.error(err);

      dispatch({
        type: DELETE_PROJECT_FAILURE,
        payload: err
      });
    }
  };
};

export const startWork = projectId => {
  return async dispatch => {};
};

export const createWork = work => {
  console.log('createWork, work:', work);
  return async dispatch => {
    dispatch({
      type: CREATE_WORK
    });

    let response;
    try {
      response = await axios.post('http://localhost:4000/work/create', work);
      console.log('createWork, response:', response);
      dispatch({
        type: CREATE_WORK_SUCCESS,
        payload: response.data
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: CREATE_WORK_FAILURE,
        payload: err
      });
    }
  };
};

export const registerNewUser = formData => {
  console.log('registerNewUser, formData:', formData);
  const { email, password } = formData;
  return async dispatch => {
    dispatch({
      type: POST_REGISTRATION
    });

    let response;
    try {
      response = await axios.post('http://localhost:4000/auth/register', {
        email,
        password
      });
      dispatch({
        type: POST_REGISTRATION_SUCCESS,
        payload: response.data
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: POST_REGISTRATION_FAILURE,
        password: err
      });
    }
  };
};
