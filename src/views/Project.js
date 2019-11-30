import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Project(props) {
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
