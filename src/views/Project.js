import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { useParams } from 'react-router-dom';
import ProjectDetail from 'components/ProjectDetail';

export function Project(props) {
  const { projectId } = useParams();

  useEffect(() => {
    props.selectProject(projectId);
  }, []);

  return props.project ? (
    <div>
      <ProjectDetail project={props.project} />
    </div>
  ) : (
    <div>loading...</div>
  );
}

const mapStateToProps = state => {
  console.log('====================================');
  console.log(state);
  console.log('====================================');
  return {
    project: state.projects.selectedProject
  };
};

export default connect(mapStateToProps, actions)(Project);
