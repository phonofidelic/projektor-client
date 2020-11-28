import {
  START_WORK,
  START_WORK_SUCCESS,
  START_WORK_FAILURE,
  CANCEL_WORK,
  CANCEL_WORK_SUCCESS,
  CANCEL_WORK_FAILURE,
  CREATE_WORK,
  CREATE_WORK_SUCCESS,
  CREATE_WORK_FAILURE,
  UPDATE_WORK,
  UPDATE_WORK_SUCCESS,
  UPDATE_WORK_FAILURE,
  REMOVE_WORK,
  REMOVE_WORK_SUCCESS,
  REMOVE_WORK_FAILURE,
  GET_WORK_BY_INTERVAL,
  GET_WORK_BY_INTERVAL_SUCCESS,
  GET_WORK_BY_INTERVAL_FAILURE,
  GET_ALL_WORK,
  GET_ALL_WORK_SUCCESS,
  GET_ALL_WORK_FAILURE,
} from 'actions/types';
import { api, handleError, handleResponse } from 'actions/utils';

export const startWork = (projectId, token) => {
  console.log('startWork, projectId:', projectId);

  return async (dispatch) => {
    dispatch({
      type: START_WORK,
    });

    let response;
    try {
      response = await api(token).post('/work/start', { projectId });
      handleResponse(response, dispatch, START_WORK_SUCCESS);
    } catch (err) {
      console.error('Could not start Work:', err);
      handleError(err, dispatch, START_WORK_FAILURE);
    }
  };
};

export const cancelWork = (workId, token) => {
  console.log('cancelWork');

  return async (dispatch) => {
    dispatch({
      type: CANCEL_WORK,
    });

    let response;
    try {
      response = await api(token).delete(`/work/delete/${workId}`);
      console.log('cancelWork, response:', response);
      handleResponse(response, dispatch, CANCEL_WORK_SUCCESS);
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, CANCEL_WORK_FAILURE);
    }
  };
};

export const createWork = (work, token) => {
  console.log('createWork, work:', work);

  return async (dispatch) => {
    dispatch({
      type: CREATE_WORK,
    });

    let response;
    try {
      response = await api(token).post('/work/create', work);
      handleResponse(response, dispatch, CREATE_WORK_SUCCESS);
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, CREATE_WORK_FAILURE);
    }
  };
};

export const updateWork = (workData, token) => {
  console.log('updateWork, wordData:', workData);
  return async (dispatch) => {
    dispatch({
      type: UPDATE_WORK,
    });

    let response;
    try {
      response = await api(token).put(`/work/update/${workData._id}`, {
        workData,
      });
      console.log('updateWork, response:', response);
      handleResponse(response, dispatch, UPDATE_WORK_SUCCESS);
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, UPDATE_WORK_FAILURE);
    }
  };
};

export const removeWork = (workId, token) => {
  return async (dispatch) => {
    dispatch({
      type: REMOVE_WORK,
    });

    let response;
    try {
      response = await api(token).delete(`/work/delete/${workId}`);
      console.log('removeWork, response:', response);
      handleResponse(response, dispatch, REMOVE_WORK_SUCCESS);
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, REMOVE_WORK_FAILURE);
    }
  };
};

export const getAllWork = (token) => {
  return async (dispatch) => {
    dispatch({
      type: GET_ALL_WORK,
    });

    let response;
    try {
      response = await api(token).get('/work');
      console.log('getAllWork, response:', response);
      handleResponse(response, dispatch, GET_ALL_WORK_SUCCESS);
    } catch (err) {
      console.log(err);
      handleError(err, dispatch, GET_ALL_WORK_FAILURE);
    }
  };
};

export const getAllWorkByInterval = (start, end) => {
  console.log('getAllWorkByInterval, start:', start);
  return async (dispatch) => {
    dispatch({
      type: GET_WORK_BY_INTERVAL,
    });

    let response;
    try {
      // response = await api().get('/work/interval', { params: { start, end } });
      response = await api().get(`/work/interval/${start}/${end}`);
      console.log('getAllWorkByInterval, response:', response);
      handleResponse(response, dispatch, GET_WORK_BY_INTERVAL_SUCCESS);
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, GET_WORK_BY_INTERVAL_FAILURE);
    }
  };
};
