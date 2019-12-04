import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { useParams } from 'react-router-dom';
import ProjectDetail from 'components/ProjectDetail';

export function Project(props) {
  const { projectId } = useParams();

  useEffect(() => {
    props.getProject(projectId);
  }, []);

  return props.project ? (
    <div>
      <ProjectDetail project={props.project} createWork={props.createWork} />
    </div>
  ) : (
    <div>loading...</div>
  );
}

const mapStateToProps = state => {
  return {
    project: state.projects.selectedProject
  };
};

export default connect(mapStateToProps, actions)(Project);
