import React from 'react';
import { Link } from 'react-router-dom';

function Registration(props) {
  return (
    <div>
      <div>Register</div>
      <div>
        <Link to="/" replace>
          Back
        </Link>
      </div>
    </div>
  );
}

export default Registration;
