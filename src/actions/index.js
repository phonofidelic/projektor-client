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
  CREATE_WORK,
  CREATE_WORK_SUCCESS,
  CREATE_WORK_FAILURE,
  UPDATE_WORK,
  UPDATE_WORK_SUCCESS,
  UPATE_WORK_FAILURE,
  REMOVE_WORK,
  REMOVE_WORK_SUCCESS,
  REMOVE_WORK_FAILURE,
  POST_REGISTRATION,
  POST_REGISTRATION_SUCCESS,
  POST_REGISTRATION_FAILURE,
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  POST_LOGOUT,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAILURE,
  SET_NEW_TOKEN,
  SET_PROJECT_STATUS,
  SET_PROJECT_STATUS_SUCCESS,
  SET_PROJECT_STATUS_FAILURE,
  DELETE_ALL_REMOVED_PROJECTS,
  DELETE_ALL_REMOVED_PROJECTS_SUCCESS,
  DELETE_ALL_REMOVED_PROJECTS_FAILURE
} from 'actions/types';
import axios from 'axios';

import { history } from 'config';
import { appendToMemberExpression } from '@babel/types';

const api = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'http://localhost:4000',
    headers: { token }
  });
};

const handleError = (err, dispatch, errorType) => {
  if (err.response && err.response.status === 401) {
    console.log('*** 401 ***');
    dispatch({
      type: errorType
      // payload: err
    });
    history.push('/');
  } else {
    dispatch({
      type: errorType
      // payload: err
    });
  }
};

const handleResponse = (response, dispatch, actionType) => {
  /**
   * If a new token was provided, set it and then proceed with the action
   */
  if (response.data.token) {
    const token = response.data.token;
    localStorage.setItem('token', token);
    dispatch({
      type: SET_NEW_TOKEN,
      payload: token
    });

    dispatch({
      type: actionType,
      payload: response.data.data
    });
  } else {
    dispatch({
      type: actionType,
      payload: response.data.data
    });
  }
};

export const getProjects = status => {
  return async dispatch => {
    dispatch({
      type: GET_PROJECTS
    });

    let response;
    try {
      response = await api().get('/projects', { params: { status } });

      handleResponse(response, dispatch, GET_PROJECTS_SUCCESS);
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

    let response;
    try {
      response = await api().get(`/projects/${projectId}`);

      handleResponse(response, dispatch, GET_PROJECT_SUCCESS);
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
  return async dispatch => {
    dispatch({
      type: POST_CREATE_PROJECT
    });

    let response;
    try {
      response = await api().post('/projects/create', formData);
      console.log('createProject response:', response);
      handleResponse(response, dispatch, CREATE_PROJECT_SUCCESS);
      history.push(`/projects/${response.data.data._id}`);
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, CREATE_PROJECT_FAILURE);
    }
  };
};

export const setProjectStatus = (projectId, status, location) => {
  return async dispatch => {
    dispatch({
      type: SET_PROJECT_STATUS
    });

    let response;
    try {
      response = await api().put(`/projects/${projectId}/status`, {
        projectId,
        status
      });

      handleResponse(response, dispatch, SET_PROJECT_STATUS_SUCCESS);

      /**
       * Go back to previous view if status was set from project detail
       */
      if (location.pathname.includes(projectId)) history.goBack();
    } catch (err) {
      console.error(err);

      handleError(err, dispatch, SET_PROJECT_STATUS_FAILURE);
      dispatch({
        type: SET_PROJECT_STATUS_FAILURE,
        payload: status
      });
    }
  };
};

export const deleteProject = (projectId, location) => {
  return async dispatch => {
    dispatch({
      type: DELETE_PROJECT
    });

    let response;
    try {
      response = await api().delete(`/projects/removed/delete/${projectId}`);

      handleResponse(response, dispatch, DELETE_PROJECT_SUCCESS);

      /**
       * Go back to previous view if status was set from project detail
       */
      if (location.pathname.includes(projectId)) history.goBack();
    } catch (err) {
      console.error(err);

      handleError(err, dispatch, DELETE_PROJECT_FAILURE);
    }
  };
};

export const deleteAllTrash = () => {
  return async dispatch => {
    dispatch({
      type: DELETE_ALL_REMOVED_PROJECTS
    });

    let response;
    try {
      response = await api().delete('/projects/removed/delete');
      console.log('deleteAllTrash, response:', response);
      handleResponse(response, dispatch, DELETE_ALL_REMOVED_PROJECTS_SUCCESS);
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, DELETE_ALL_REMOVED_PROJECTS_FAILURE);
    }
  };
};

export const createWork = work => {
  return async dispatch => {
    dispatch({
      type: CREATE_WORK
    });

    let response;
    try {
      response = await api().post('/work/create', work);
      handleResponse(response, dispatch, CREATE_WORK_SUCCESS);
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, CREATE_WORK_FAILURE);
    }
  };
};

export const updateWork = workData => {
  console.log('updateWork, wordData:', workData);
  return async dispatch => {
    dispatch({
      type: UPDATE_WORK
    });

    let response;
    try {
      response = await api().post(`/work/update/${workData._id}`, { workData });
      console.log('updateWork, response:', response);
      handleResponse(response, dispatch, UPDATE_WORK_SUCCESS);
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, UPATE_WORK_FAILURE);
    }
  };
};

export const removeWork = workId => {
  return async dispatch => {
    dispatch({
      type: REMOVE_WORK
    });

    let response;
    try {
      response = api().delete('/work/delete', workId);
      handleResponse(response, dispatch, REMOVE_WORK_SUCCESS);
    } catch (err) {
      console.log(err);
      handleError(err, dispatch, REMOVE_WORK_FAILURE);
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
      response = await api().post('/auth/register', {
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
        type: POST_REGISTRATION_FAILURE
        // payload: err
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
      response = await api().post('/auth/login', {
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
      response = await api(token).post('/auth/logout');
      console.log('logoutUser, response:', response);

      dispatch({
        type: POST_LOGOUT_SUCCESS
      });

      localStorage.removeItem('token');
      history.push('/');
    } catch (err) {
      console.error(err);

      dispatch({
        type: POST_LOGOUT_FAILURE,
        payload: err
      });
    }
  };
};
