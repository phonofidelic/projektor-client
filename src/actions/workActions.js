import {
  CREATE_WORK,
  CREATE_WORK_SUCCESS,
  CREATE_WORK_FAILURE,
  UPDATE_WORK,
  UPDATE_WORK_SUCCESS,
  UPATE_WORK_FAILURE,
  REMOVE_WORK,
  REMOVE_WORK_SUCCESS,
  REMOVE_WORK_FAILURE
} from 'actions/types';
import { api, handleError, handleResponse } from 'actions/utils';

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
      response = await api().delete(`/work/delete/${workId}`);
      console.log('removeWork, response:', response);
      handleResponse(response, dispatch, REMOVE_WORK_SUCCESS);
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, REMOVE_WORK_FAILURE);
    }
  };
};
