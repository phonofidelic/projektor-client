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
  POST_REGISTRATION_FAILURE,
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  POST_LOGOUT,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAILURE
} from 'actions/types';
import { uuid } from 'uuidv4';
import mockProjects from 'utils/mockProjects';
import axios from 'axios';

import { history } from 'config';

const api = token => axios.create({ headers: { token } });

const handleError = (err, dispatch, actionType) => {
  if (err.response && err.status === 401) {
    console.log('*** 401 ***');
    dispatch({
      type: actionType,
      payload: err
    });
    history.push('/');
  } else {
    dispatch({
      type: actionType,
      payload: err
    });
  }
};

export const getProjects = () => {
  return async dispatch => {
    dispatch({
      type: GET_PROJECTS
    });

    const token = localStorage.getItem('token');

    let response;
    try {
      response = await api(token).get('http://localhost:4000/projects');
      console.log('getProjects, response:', response);

      dispatch({
        type: GET_PROJECTS_SUCCESS,
        payload: response.data
      });
    } catch (err) {
      console.error('getProjects error:', err.response);

      handleError(err, dispatch, GET_PROJECTS_FAILURE);
    }
  };
};

export const getProject = projectId => {
  return async dispatch => {
    dispatch({
      type: GET_PROJECT
    });

    const token = localStorage.getItem('token');

    let response;
    try {
      response = await api(token).get(
        `http://localhost:4000/projects/${projectId}`
      );

      dispatch({
        type: GET_PROJECT_SUCCESS,
        payload: response.data
      });
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, GET_PROJECT_FAILURE);
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

export const createProject = formData => {
  console.log('createProject, formData:', formData);

  return async dispatch => {
    dispatch({
      type: POST_CREATE_PROJECT
    });

    const token = localStorage.getItem('token');

    let response;
    try {
      response = await api(token).post(
        'http://localhost:4000/projects/create',
        formData
      );
      console.log('createProject, response:', response);

      dispatch({
        type: CREATE_PROJECT_SUCCESS,
        payload: response.data
      });

      history.push(`/projects/${response.data._id}`);
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, CREATE_PROJECT_FAILURE);
    }
  };
};

export const deleteProject = projectId => {
  console.log('deleteProject, projectId:', projectId);
  return async dispatch => {
    dispatch({
      type: DELETE_PROJECT
    });

    const token = localStorage.getItem('token');

    let response;
    try {
      response = await api(token).put(
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

      handleError(err, dispatch, DELETE_PROJECT_FAILURE);
    }
  };
};

export const createWork = work => {
  console.log('createWork, work:', work);
  return async dispatch => {
    dispatch({
      type: CREATE_WORK
    });

    const token = localStorage.getItem('token');

    let response;
    try {
      response = await api(token).post(
        'http://localhost:4000/work/create',
        work
      );
      console.log('createWork, response:', response);
      dispatch({
        type: CREATE_WORK_SUCCESS,
        payload: response.data
      });
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, CREATE_WORK_FAILURE);
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
      localStorage.setItem('token', response.data.token);
      history.push('/projects');
    } catch (err) {
      console.error(err);
      dispatch({
        type: POST_REGISTRATION_FAILURE,
        password: err
      });
    }
  };
};

export const loginUser = formData => {
  console.log('loginUser, formData:', formData);
  const { email, password } = formData;

  return async dispatch => {
    dispatch({
      type: POST_LOGIN
    });

    let response;
    try {
      response = await axios.post('http://localhost:4000/auth/login', {
        email,
        password
      });
      console.log('loginUser, response:', response);
      dispatch({
        type: POST_LOGIN_SUCCESS,
        payload: response.data
      });
      localStorage.setItem('token', response.data.token);
      history.push('/projects');
    } catch (err) {
      console.error(err);
      dispatch({
        type: POST_LOGIN_FAILURE,
        payload: err
      });
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    dispatch({
      type: POST_LOGOUT
    });

    const token = localStorage.getItem('token');

    let response;
    try {
      response = await api(token).post('http://localhost:4000/auth/logout');
      console.log('logoutUser, response:', response);

      dispatch({
        type: POST_LOGOUT_SUCCESS
      });

      localStorage.removeItem('token');
      history.push('/');
    } catch (err) {
      console.error(err);

      dispatch({
        type: POST_LOGIN_FAILURE,
        payload: err
      });
    }
  };
};
