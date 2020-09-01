import {
  POST_CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  SET_PROJECT_STATUS_VIEW,
  GET_PROJECT,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAILURE,
  UPDATE_PROJECT,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  SET_PROJECT_STATUS,
  SET_PROJECT_STATUS_SUCCESS,
  SET_PROJECT_STATUS_FAILURE,
  DELETE_ALL_REMOVED_PROJECTS,
  DELETE_ALL_REMOVED_PROJECTS_SUCCESS,
  DELETE_ALL_REMOVED_PROJECTS_FAILURE,
  SEARCH_PROJECTS,
  SEARCH_PROJECTS_SUCCESS,
  SEARCH_PROJECTS_FAILURE
} from 'actions/types';
import { history } from 'config';
import { api, handleError, handleResponse } from 'actions/utils';

export const getProjects = token => {
  // console.log('### getProjects, token:', token);
  return async dispatch => {
    dispatch({
      type: GET_PROJECTS
    });

    let response;
    try {
      response = await api(token).get('/projects');

      handleResponse(response, dispatch, GET_PROJECTS_SUCCESS);
    } catch (err) {
      console.error('getProjects error:', err.response);

      handleError(err, dispatch, GET_PROJECTS_FAILURE);
    }
  };
};

export const setProjectStatusView = status => {
  return dispatch => {
    dispatch({
      type: SET_PROJECT_STATUS_VIEW,
      payload: status
    });
    // history.push(status === DELETED ? 'removed' : status);
  };
};

export const getProject = (projectId, token) => {
  console.log('getProject, projectId:', projectId);
  return async dispatch => {
    dispatch({
      type: GET_PROJECT
    });

    let response;
    try {
      response = await api(token).get(`/projects/${projectId}`);
      console.log('getProject, response:', response);

      handleResponse(response, dispatch, GET_PROJECT_SUCCESS);
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, GET_PROJECT_FAILURE);
    }
  };
};

// export const selectProject = id => {
//   console.log('selectProject, id:', id);
//   return dispatch => {
//     dispatch({
//       type: SELECT_PROJECT,
//       payload: id
//     });
//   };
// };

export const createProject = (formData, token) => {
  return async dispatch => {
    dispatch({
      type: POST_CREATE_PROJECT
    });

    let response;
    try {
      response = await api(token).post('/projects/create', formData);
      console.log('createProject response:', response);
      handleResponse(response, dispatch, CREATE_PROJECT_SUCCESS);
      history.push(`/projects/${response.data.data._id}`);
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, CREATE_PROJECT_FAILURE);
    }
  };
};

export const editProject = (projectId, projectInfo, token) => {
  return async dispatch => {
    dispatch({
      type: UPDATE_PROJECT
    });

    let response;
    try {
      response = await api(token).put(`/projects/${projectId}`, {
        projectInfo
      });
      console.log('editProject, response:', response);
      handleResponse(response, dispatch, UPDATE_PROJECT_SUCCESS);
      history.goBack();
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, UPDATE_PROJECT_FAILURE);
    }
  };
};

export const setProjectStatus = (projectId, status, token) => {
  return async dispatch => {
    dispatch({
      type: SET_PROJECT_STATUS
    });

    let response;
    try {
      response = await api(token).put(`/projects/${projectId}/status`, {
        projectId,
        status
      });

      console.log('SET_PROJECT_STATUS, response:', response);

      handleResponse(response, dispatch, SET_PROJECT_STATUS_SUCCESS);
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

export const deleteProject = (projectId, location, token) => {
  return async dispatch => {
    dispatch({
      type: DELETE_PROJECT
    });

    let response;
    try {
      response = await api(token).delete(
        `/projects/removed/delete/${projectId}`
      );

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

export const searchProjects = query => {
  return async dispatch => {
    dispatch({
      type: SEARCH_PROJECTS
    });

    try {
      const response = await api().get(`/projects/search?q=${query}`);
      // console.log('searchJobs, response:', response.data);
      handleResponse(response, dispatch, SEARCH_PROJECTS_SUCCESS);
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, SEARCH_PROJECTS_FAILURE);
    }
  };
};
