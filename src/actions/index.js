import {
  getProjects,
  getProject,
  createProject,
  editProject,
  setProjectStatus,
  deleteProject,
  deleteAllTrash
} from 'actions/projectActions';
import { createWork, updateWork, removeWork } from 'actions/workActions';
import {
  registerNewUser,
  loginUser,
  logoutUser,
  getUserInfo
} from 'actions/authActions';

export {
  getProjects,
  getProject,
  createProject,
  editProject,
  setProjectStatus,
  deleteProject,
  deleteAllTrash,
  createWork,
  updateWork,
  removeWork,
  registerNewUser,
  loginUser,
  logoutUser,
  getUserInfo
};
