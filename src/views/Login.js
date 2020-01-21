import React, { useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { StringContext } from 'strings';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import logoSrc from 'assets/logo.svg';
import Header from 'components/Header';
import LoginForm from 'components/LoginForm';

import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`;

const FormContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleContainer = styled.div`
  margin-top: 80px;
`;

const Logo = styled.img`
  margin: 30px auto;
  max-width: 400px;

  @media (max-width: 840px) {
    margin: 20px;
  }
`;

export function Login(props) {
  const strings = useContext(StringContext);

  const handleLoginSubmit = formData => {
    props.loginUser(formData);
  };
  return (
    <Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {strings.ttl__sign_in}
        </title>
      </Helmet>
      <Header centerTitle back="/" />
      <TitleContainer>
        <Logo src={logoSrc} alt={strings.ttl__app_title} />
        {/* <Typography variant="h4">{strings.ttl__sign_in}</Typography> */}
      </TitleContainer>
      <FormContainer>
        <LoginForm handleLoginSubmit={handleLoginSubmit} />
      </FormContainer>
    </Container>
  );
}

export default connect(null, actions)(Login);
