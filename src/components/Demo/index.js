import React, { useState } from 'react';
import styled from 'styled-components';

import ProjectForm from 'components/ProjectForm';
import ProjectGrid from 'components/ProjectGrid';
import ProjectGridItem from 'components/ProjectGridItem';

import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const demoProject = {
  title: 'First project',
  description: 'Getting started with Projektor',
  startDate: Date.now(),
  deadline: null,
  client: 'Phonofidelic',
  budgetedTime: '',
  color: '#fd8175'
};

const steps = [
  {
    label: 'Get started'
  },
  {
    label: 'Create your first project'
  },
  {
    label: 'Sort you projects by status'
  }
];

const Container = styled.div`
  /* width: 100%; */
`;

const DemoContainer = styled.div`
  min-width: 400px;
  min-height: 400px;
  /* width: 400px; */
  height: 80vh;
  margin: auto;
  background-color: ${({ color }) => color};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* padding: 8px; */
  /* text-align: left; */
  transition: all 0.8s ease;
  -webkit-transition: all 0.8s ease;
`;

const StepperContainer = styled.div`
  height: 20vh;
`;

const Step0 = props => (
  <div>
    <div />
    <IconButton onClick={props.handleStep}>
      <AddIcon />
    </IconButton>
    <div />
  </div>
);

const Step1 = props => (
  <ProjectForm project={demoProject} handleFormSubmit={props.handleStep} />
);

const Step2 = props => (
  // <ProjectGrid projects={[demoProject]} />
  <div>
    <Grid container spacing={1}>
      <ProjectGridItem
        project={demoProject}
        projectsDisplayMode="compact"
        // sm={12}
        // md={12}
        handleDemoAction={props.handleStep}
      />
    </Grid>
    <div />
  </div>
);

export default function Demo() {
  const [step, setStep] = useState(0);

  const handleStep0 = () => {
    setStep(1);
  };

  const handleStep1 = data => {
    // console.log('Step 2, data:', data);
    setStep(2);
  };

  const handleStep2 = () => {
    setStep(3);
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
            <Step2 handleStep={handleStep2} />
          </Grow>
        );

      default:
        return <Step0 handleStep={handleStep0} />;
    }
  };

  return (
    <Container id="demo">
      <DemoContainer color={getBackgroundColor(step)}>
        {render(step)}
      </DemoContainer>
      <StepperContainer>
        {/* <Typography>Hello</Typography> */}
        <Stepper activeStep={step} alternativeLabel>
          {steps.map(step => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </StepperContainer>
    </Container>
  );
}
