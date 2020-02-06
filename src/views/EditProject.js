import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as actions from 'actions';
import { StringContext } from 'strings';
import { Helmet } from 'react-helmet';
import requireAuth from 'hocs/requireAuth';
import { motion } from 'framer-motion';
import { getPageVariant } from 'constants/pageVariants';

import Header from 'components/Header';
import ProjectForm from 'components/ProjectForm';

export function EditProject(props) {
  const { projectId } = useParams();
  const { preload, project, getProject, editProject } = props;
  const strings = useContext(StringContext);

  useEffect(() => {
    !preload && getProject(projectId);
  }, [preload, getProject, projectId]);

  const handleFormSubmit = data => {
    editProject(projectId, data);
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

export default connect(mapStateToProps, actions)(requireAuth(EditProject));
