import React, { useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { Link } from 'react-router-dom';
import { StringContext } from 'strings';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import logoSrc from 'assets/logo.svg';
import Header from 'components/Header';
import RegistrationForm from 'components/RegistrationForm';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Container = styled.div``;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const Logo = styled.img`
  margin: 30px auto;
  max-width: 800px;

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

const HeroFormContainer = styled.div`
  margin: 80px auto;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

function HeaderActions(props) {
  const strings = useContext(StringContext);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* <Button
        style={{ textDecoratino: 'none' }}
        component={Link}
        to="/registration"
      >
        {strings.btn__create_account}
      </Button> */}
      <Button
        variant="outlined"
        style={{ textDecoratino: 'none' }}
        component={Link}
        to="/login"
      >
        {strings.btn__sign_in}
      </Button>
    </div>
  );
}

export function Landing(props) {
  const strings = useContext(StringContext);

  const handleRegistrationSubmit = formData => {
    props.registerNewUser(formData);
  };

  return (
    <Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{strings.ttl__app_title}</title>
      </Helmet>
      <Header headerActions={<HeaderActions />} />
      <HeroContainer>
        <Logo src={logoSrc} alt={strings.ttl__app_title} />
        <Typography>Simple project planing and time management</Typography>
        <HeroFormContainer>
          <div style={{ margin: 20 }}>
            <Typography>Get started:</Typography>
          </div>
          <RegistrationForm
            handleRegistrationSubmit={handleRegistrationSubmit}
          />
        </HeroFormContainer>
      </HeroContainer>
    </Container>
  );
}

export default connect(null, actions)(Landing);
