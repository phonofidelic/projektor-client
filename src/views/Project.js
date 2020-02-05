import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { useParams } from 'react-router-dom';
import { StringContext } from 'strings';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { getPageVariant } from 'constants/pageVariants';

import Header from 'components/Header';
import ProjectDetail from 'components/ProjectDetail';
import ProjectMenu from 'components/ProjectMenu';

export function Project(props) {
  const { projectId } = useParams();
  const {
    preload,
    project,
    getProject,
    createWork,
    updateWork,
    removeWork
  } = props;
  const strings = useContext(StringContext);

  useEffect(() => {
    !preload && getProject(projectId);
  }, [preload, getProject, projectId]);

  return !project ? null : (
    <motion.div variants={getPageVariant('right')}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {project.title}
        </title>
      </Helmet>
      <Header
        back
        title={project.title}
        headerActions={<ProjectMenu project={project} />}
      />
      <ProjectDetail
        project={project}
        createWork={createWork}
        updateWork={updateWork}
        removeWork={removeWork}
      />
    </motion.div>
  );
}

const mapStateToProps = state => {
  return {
    project: state.projects.selectedProject
  };
};

export default connect(mapStateToProps, actions)(Project);
