import {
  getProjects,
  getProject,
  createProject,
  setProjectStatus,
  deleteProject,
  deleteAllTrash
} from 'actions/projectActions';
import { createWork, updateWork, removeWork } from 'actions/workActions';
import { registerNewUser, loginUser, logoutUser } from 'actions/authActions';

export {
  getProjects,
  getProject,
  createProject,
  setProjectStatus,
  deleteProject,
  deleteAllTrash,
  createWork,
  updateWork,
  removeWork,
  registerNewUser,
  loginUser,
  logoutUser
};
