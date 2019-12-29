import {
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
import { history } from 'config';
import { api } from 'actions/utils';

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
