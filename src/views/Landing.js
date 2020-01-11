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

const Background = styled.div`
  background: linear-gradient(
      45deg,
      rgba(255, 0, 0, 0.5) 50%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 50%
    ),
    linear-gradient(
      -40deg,
      rgba(0, 255, 0, 0.5) 50%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 50%
    ),
    linear-gradient(
      25deg,
      rgba(0, 0, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 50%
    );
  background-blend-mode: lighten;
  // filter: blur(2px);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
`;

const Logo = styled.img`
  margin: 30px auto;
  max-width: 800px;

  @media (max-width: 840px) {
    margin: 20px;
  }
`;

const FormContainer = styled.div`
  margin: 80px auto;

  // @media (max-width: 768px) {
  //   margin: 0;
  // }
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
      {/* <Background /> */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>{strings.ttl__app_title}</title>
      </Helmet>
      <Header background="none" headerActions={<HeaderActions />} />
      <HeroContainer>
        <Logo src={logoSrc} alt={strings.ttl__app_title} />
        <Typography>{strings.msg__tagline}</Typography>
      </HeroContainer>
      <FormContainer id="get-started">
        <div style={{ margin: 20 }}>
          <Typography>{strings.msg__get_started}</Typography>
        </div>
        <RegistrationForm handleRegistrationSubmit={handleRegistrationSubmit} />
      </FormContainer>
    </Container>
  );
}

export default connect(null, actions)(Landing);
