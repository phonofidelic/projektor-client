import React from 'react';
import styled from 'styled-components';

import logoSrc from 'assets/logo.svg';

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5000;
`;

const Logo = styled.img`
  margin: 30px auto;
  max-width: 800px;
  position: absolute;
  @media (max-width: 840px) {
    margin: 20px;
  }
`;

const CircleContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin: auto;
  position: relative;
  animation: load2 2s infinite ease 1.5s;

  @-webkit-keyframes load2 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load2 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Red = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: rgba(255, 0, 0, .5);
  background-blend-mode: lighten;
  ${'' /* margin: auto; */}
  position: absolute;
  transform: translate(20px);
  animation: redcirc 2s infinite alternate ease 1.5s;

  @-webkit-keyframes redcirc {
    0% {
      transform: translate(20px);
    }
    100% {
      transform: translate(0px);
    }
  }
  @keyframes redcirc {
    0% {
      transform: translate(20px);
    }
    100% {
      transform: translate(0px);
    }
`;

const Green = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: rgba(0, 255, 0, .5);
  background-blend-mode: lighten;
  ${'' /* margin: auto; */}
  position: absolute;
  transform: translate(-20px);
  animation: greencirc 2s infinite alternate ease 1.5s;

  @-webkit-keyframes greencirc {
    0% {
      transform: translate(-20px);
    }
    100% {
      transform: translate(0px);
    }
  }
  @keyframes greencirc {
    0% {
      transform: translate(-20px);
    }
    100% {
      transform: translate(0px);
    }
`;

const Blue = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: rgba(0, 0, 255, .5);
  background-blend-mode: lighten;
  ${'' /* margin: auto; */}
  position: absolute;
  transform: translate(0, -20px);
  animation: bluecirc 2s infinite alternate ease 1.5s;

  @-webkit-keyframes bluecirc {
    0% {
      transform: translate(0, -20px);
    }
    100% {
      transform: translate(0px);
    }
  }
  @keyframes bluecirc {
    0% {
      transform: translate(0, -20px);
    }
    100% {
      transform: translate(0px);
    }
`;

export default function Loader(props) {
  return (
    <Container>
      <CircleContainer>
        <Red />
        <Green />
        <Blue />
      </CircleContainer>
    </Container>
  );
}
