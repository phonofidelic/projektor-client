import React, { useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { StringContext } from 'strings';
import { Helmet } from 'react-helmet';

import Header from 'components/Header';
import LoginForm from 'components/LoginForm';

export function Login(props) {
  const strings = useContext(StringContext);

  const handleLoginSubmit = formData => {
    props.loginUser(formData);
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {strings.ttl__sign_in}
        </title>
      </Helmet>
      <Header title={strings.ttl__sign_in} centerTitle back="/" />
      <LoginForm handleLoginSubmit={handleLoginSubmit} />
    </div>
  );
}

export default connect(null, actions)(Login);
