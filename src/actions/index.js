/** PROJECT ACTIONS */
import {
  getProjects,
  getProject,
  createProject,
  editProject,
  setProjectStatus,
  deleteProject,
  deleteAllTrash
} from 'actions/projectActions';

/** WORK ACTIONS */
import {
  createWork,
  updateWork,
  removeWork,
  getAllWorkByInterval
} from 'actions/workActions';

/** AUTH ACTIONS */
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
  getAllWorkByInterval,
  registerNewUser,
  loginUser,
  logoutUser,
  getUserInfo
};
