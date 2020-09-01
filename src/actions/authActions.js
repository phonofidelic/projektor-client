import {
  POST_REGISTRATION,
  POST_REGISTRATION_SUCCESS,
  POST_REGISTRATION_FAILURE,
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  POST_LOGOUT,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAILURE,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  RESEND_VERIFICATION,
  RESEND_VERIFICATION_SUCCESS,
  RESEND_VERIFICATION_FAILURE
} from 'actions/types';
import { history } from 'config';
import { api, handleError, handleResponse } from 'actions/utils';

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

export const getUserInfo = () => {
  return async dispatch => {
    dispatch({
      type: GET_USER_INFO
    });

    let response;
    try {
      response = await api().get('auth/user');
      console.log('getUserInfo, response:', response);
      handleResponse(response, dispatch, GET_USER_INFO_SUCCESS);
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, GET_USER_INFO_FAILURE);
    }
  };
};

export const resendVerificationEmail = token => {
  console.log('### resendVerificationEmail, token:', token);
  return async dispatch => {
    dispatch({
      type: RESEND_VERIFICATION
    });

    let response;
    try {
      response = await api(token).post('auth/resend');
      console.log('resendVerificationEmail, response:', response);
      handleResponse(response, dispatch, RESEND_VERIFICATION_SUCCESS);
    } catch (err) {
      console.error(err);
      handleError(err, dispatch, RESEND_VERIFICATION_FAILURE);
    }
  };
};
