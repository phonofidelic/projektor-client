import axios from 'axios';
import { apiBaseUrl } from 'config';

export default (token) => {
  // const token = localStorage.getItem('token');

  // console.log('### api, token:', token);
  return axios.create({
    baseURL: apiBaseUrl,
    headers: { token, Authorization: `Bearer ${token}` },
  });
};
