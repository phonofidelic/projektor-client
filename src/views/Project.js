import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { Link, useParams } from 'react-router-dom';

export function Project(props) {
  const { projectId } = useParams();
  console.log('Project, projectId:', projectId);
  return (
    <div>
      <div>Project</div>
      <div>
        <Link to="/projects" replace>
          Back
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    project: state.selectedProject
  };
};

export default connect(mapStateToProps, actions)(Project);
