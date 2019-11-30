import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
  return (
    <div>
      <div>Login</div>
      <div>
        <Link to="/" replace>
          Back
        </Link>
      </div>
    </div>
  );
}

export default Login;
