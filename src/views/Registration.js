import React, { useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { StringContext } from 'strings';
import { Helmet } from 'react-helmet';

import Header from 'components/Header';
import RegistrationForm from 'components/RegistrationForm';

export function Registration(props) {
  const strings = useContext(StringContext);
  const handleRegistrationSubmit = formData => {
    props.registerNewUser(formData);
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {strings.ttl__create_account}
        </title>
      </Helmet>
      <Header title={strings.ttl__create_account} centerTitle back="/" />
      <RegistrationForm handleRegistrationSubmit={handleRegistrationSubmit} />
    </div>
  );
}

export default connect(null, actions)(Registration);
