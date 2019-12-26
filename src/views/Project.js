import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { useParams } from 'react-router-dom';
import Header from 'components/Header';
import ProjectDetail from 'components/ProjectDetail';
import ProjectMenu from 'components/ProjectMenu';

export function Project(props) {
  const { projectId } = useParams();

  const { project, getProject, createWork, updateWork } = props;

  useEffect(() => {
    getProject(projectId);
  }, [getProject, projectId]);

  return (
    <div>
      <Header
        back="/projects"
        title={project && project.title}
        headerActions={
          project && <ProjectMenu project={project} color="#fff" />
        }
      />
      <ProjectDetail
        project={project}
        createWork={createWork}
        updateWork={updateWork}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    project: state.projects.selectedProject
  };
};

export default connect(mapStateToProps, actions)(Project);
