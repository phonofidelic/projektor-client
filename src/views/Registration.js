import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { useHistory } from 'react-router-dom';

import Header from 'components/Header';
import RegistrationForm from 'components/RegistrationForm';

function Registration(props) {
  const history = useHistory();

  const handleRegistrationSubmit = formData => {
    props.registerNewUser(formData, history);
  };

  return (
    <div>
      <Header title="Create a new account" centerTitle back="/" />
      <RegistrationForm handleRegistrationSubmit={handleRegistrationSubmit} />
    </div>
  );
}

export default connect(null, actions)(Registration);
