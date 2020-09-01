import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as actions from 'actions';
import { StringContext } from 'strings';
import { Helmet } from 'react-helmet';
// import requireAuth from 'hocs/requireAuth';
import { requireAuth } from 'services/AuthProvider';
import { motion } from 'framer-motion';
import { getPageVariant } from 'constants/pageVariants';
import { useAuth0 } from '@auth0/auth0-react';

import Header from 'components/Header';
import ProjectForm from 'components/ProjectForm';

export function EditProject(props) {
  const { projectId } = useParams();
  const { preload, project, getProject, editProject } = props;
  const strings = useContext(StringContext);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const loadProject = async () => {
      const token = await getAccessTokenSilently();
      getProject(projectId, token);
    };
    !preload && loadProject();
  }, [preload, getProject, projectId]);

  const handleFormSubmit = async data => {
    const token = await getAccessTokenSilently();
    editProject(projectId, data, token);
  };

  return project ? (
    <motion.div variants={getPageVariant('left')}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {project.title}
        </title>
      </Helmet>
      <Header back title={project.title} />
      <ProjectForm project={project} handleFormSubmit={handleFormSubmit} />
    </motion.div>
  ) : (
    <div>loading...</div>
  );
}

const mapStateToProps = state => {
  return {
    project: state.projects.selectedProject
  };
};

// export default connect(mapStateToProps, actions)(requireAuth(EditProject));
export default connect(mapStateToProps, actions)(EditProject);
