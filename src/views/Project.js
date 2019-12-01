import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { Link, useParams } from 'react-router-dom';
import ProjectDetail from 'components/ProjectDetail';

export function Project(props) {
  const { projectId } = useParams();
  console.log('Project, props.project:', props.project);

  useEffect(() => {
    console.log('useEfect');
    props.selectProject(projectId);
  });

  return props.project ? (
    <div>
      <ProjectDetail project={props.project} />
      <div>
        <Link to="/projects" replace>
          Back
        </Link>
      </div>
    </div>
  ) : (
    <div>loading...</div>
  );
}

const mapStateToProps = state => {
  console.log('state:', state);
  return {
    project: state.projects.selectedProject
  };
};

export default connect(mapStateToProps, actions)(Project);
