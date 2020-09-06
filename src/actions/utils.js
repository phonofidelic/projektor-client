import { SET_NEW_TOKEN, VERIFICATION_FAILURE } from 'actions/types';
import axios from 'axios';
import { apiBaseUrl } from 'config';

export const api = token => {
  // const token = localStorage.getItem('token');

  console.log('### api, token:', token);
  return axios.create({
    baseURL: apiBaseUrl,
    headers: { token, Authorization: `Bearer ${token}` }
  });
};

export const handleError = (err, dispatch, errorType) => {
  if (err.response && err.response.status === 401) {
    console.log('*** 401 ***');
    dispatch({
      type: errorType
      // payload: err
    });
    // history.push('/');
  } else if (err.response && err.response.status === 403) {
    dispatch({
      type: VERIFICATION_FAILURE
    });
  } else {
    dispatch({
      type: errorType
      // payload: err
    });
  }
};

export const handleResponse = (response, dispatch, actionType) => {
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
