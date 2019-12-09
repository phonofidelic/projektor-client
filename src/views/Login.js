import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

import Header from 'components/Header';
import LoginForm from 'components/LoginForm';

export function Login(props) {
  const handleLoginSubmit = formData => {
    props.loginUser(formData);
  };
  return (
    <div>
      <Header title="Sign in" centerTitle back="/" />
      <LoginForm handleLoginSubmit={handleLoginSubmit} />
    </div>
  );
}

export default connect(null, actions)(Login);
