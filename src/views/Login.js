import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { useHistory } from 'react-router-dom';

import Header from 'components/Header';
import LoginForm from 'components/LoginForm';

function Login(props) {
  const history = useHistory();

  const handleLoginSubmit = formData => {
    props.loginUser(formData, history);
  };
  return (
    <div>
      <Header title="Sign in" centerTitle back="/" />
      <LoginForm handleLoginSubmit={handleLoginSubmit} />
    </div>
  );
}

export default connect(null, actions)(Login);
