import React, { useState } from 'react';
import styled from 'styled-components';

import ProjectForm from 'components/ProjectForm';
import ProjectGrid from 'components/ProjectGrid';

import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { defaultState } from 'reducers/projects';

const Container = styled.div`
  min-width: 400px;
  min-height: 400px;
  width: 400px;
  height: 400px;
  margin: auto;
  background-color: ${({ color }) => color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px;
  transition: all 0.8s ease;
  -webkit-transition: all 0.8s ease;
`;

const demoProject = {
  title: 'My first project',
  description: 'Getting started with Projektor',
  startDate: Date.now(),
  deadline: null,
  client: 'Phonofidelic',
  budgetedTime: ''
};

const Step0 = props => (
  <div>
    <IconButton onClick={props.handleStep}>
      <AddIcon />
    </IconButton>
  </div>
);

const Step1 = props => (
  <ProjectForm project={demoProject} handleFormSubmit={props.handleStep} />
);

const Step2 = props => <ProjectGrid projects={[demoProject]} />;

export default function Demo() {
  const [step, setStep] = useState(0);

  const handleStep0 = () => {
    setStep(1);
  };

  const handleStep1 = data => {
    console.log('Step 2, data:', data);
    setStep(2);
  };

  const getBackgroundColor = step => {
    switch (step) {
      case 0:
        return '#80f5ff';

      case 1:
        return '#fec092';

      case 2:
        return '#fd8175';

      default:
        return '#80f5ff';
    }
  };

  const render = step => {
    console.log('step:', step);
    switch (step) {
      case 0:
        return (
          <Grow>
            <Step0 handleStep={handleStep0} />
          </Grow>
        );

      case 1:
        return (
          <Grow in={step === 1} mountOnEnter unmountOnExit>
            <Step1 handleStep={handleStep1} />
          </Grow>
        );

      case 2:
        return (
          <Grow in={step === 2} mountOnEnter unmountOnExit>
            <Step2 />
          </Grow>
        );

      default:
        return <Step0 handleStep={handleStep0} />;
    }
  };

  return <Container color={getBackgroundColor(step)}>{render(step)}</Container>;
}
