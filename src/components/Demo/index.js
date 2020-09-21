import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { Step0, Step1, Step2, Step3, Step4 } from './Steps';
import { StringContext } from 'strings';

import { useTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const Container = styled.div`
  z-index: ${({ theme }) => theme.zIndex.appBar + 1};
`;

const DemoContainer = styled.div`
  height: 80vh;
  /* overflow-y: auto; */
  margin: auto;
  background-color: ${({ color }) => color};
  box-shadow: inset 0 0 0 40px ${({ color }) => color};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0px 48px;
  transition: all 0.8s ease;
  -webkit-transition: all 0.8s ease;
  /* overflow-y: auto; */

  @media (max-width: 740px) {
    padding: 0;
  }
`;

const StepperContainer = styled.div`
  height: 20vh;
  background-color: ${({ color }) => color};
  transition: all 0.8s ease;
  -webkit-transition: all 0.8s ease;

  .MuiStepper-root {
    background-color: ${({ color }) => color};
    transition: all 0.8s ease;
    -webkit-transition: all 0.8s ease;
  }
  .MuiStepConnector-line {
    border-color: #000;
  }
`;

export default function Demo() {
  const [step, setStep] = useState(0);
  const strings = useContext(StringContext);
  const theme = useTheme();

  const [demoProject, setDemoProject] = useState({
    title: strings.msg__demo_project_title,
    description: strings.msg__demo_project_description,
    startDate: Date.now(),
    deadline: null,
    client: strings.msg__demo_project_client,
    budgetedTime: 5,
    timeUsed: 0,
    color: '#fd8175',
    status: 'active',
    work: [],
    isDemo: true,
  });

  const [editMode, setEditMode] = useState(false);

  const steps = [
    {
      label: strings.msg__demo_step_0_short,
      handleClick: () => setStep(0),
    },
    {
      label: strings.msg__demo_step_1_short,
      handleClick: () => setStep(1),
    },
    {
      label: strings.msg__demo_step_2_short,
      handleClick: () => setStep(2),
    },
    {
      label: strings.msg__demo_step_3_short,
      handleClick: () => setStep(3),
    },
  ];

  const getBackgroundColor = (step) => {
    switch (step) {
      case 0:
        return '#80f5ff';

      case 1:
        return '#fec092';

      case 2:
        return '#fff';

      case 3:
        return '#c8ba8e';

      case 4:
        return theme.palette.background.default;

      default:
        return '#80f5ff';
    }
  };

  const demoTheme = createMuiTheme({
    palette: {
      primary: {
        light: '#484848',
        main: '#212121',
        dark: '#000000',
      },
      secondary: {
        light: '#fff2bf',
        main: '#ffbf8e',
        dark: '#ca8f60',
      },
      background: {
        default: getBackgroundColor(step),
      },
    },
  });

  const handleDemoEdit = (project) => {
    // console.log('handleDemoEdit, project:', project);
    setEditMode(true);
  };

  const handleDemoSave = (projectData) => {
    console.log('handleDemoSave, demoProject.work:', demoProject.work);

    setDemoProject({
      ...projectData,
      work: demoProject.work,
      isDemo: true,
      status: demoProject.status,
      timeUsed: demoProject.timeUsed,
    });

    setEditMode(false);
  };

  const setDemoProjectStatus = (projectId, status) => {
    console.log('setDemoProjectStatus, projectId, status:', projectId, status);

    setDemoProject({
      ...demoProject,
      status,
    });
  };

  const handleCreateWork = (work) => {
    setDemoProject({
      ...demoProject,
      timeUsed: demoProject.timeUsed + work.duration,
      work: [
        ...demoProject.work,
        { _id: `${Math.trunc(Math.random() * 100000)}_${Date.now()}`, ...work },
      ],
    });
  };

  const handleUpdateWork = (work) => {
    const oldWorkItem = demoProject.work.filter(
      (demoWork) => demoWork._id === work._id
    )[0];

    const newTimeUsed =
      demoProject.work.reduce((prev, cur) => prev + cur.duration, 0) -
      oldWorkItem.duration +
      work.duration;

    setDemoProject({
      ...demoProject,
      timeUsed: newTimeUsed,
      work: demoProject.work.map((demoWork) =>
        demoWork._id === work._id ? work : demoWork
      ),
    });
  };

  const handleRemoveWork = (workId) => {
    setDemoProject({
      ...demoProject,
      timeUsed:
        demoProject.timeUsed -
        demoProject.work.filter((demoWork) => demoWork._id === workId)[0]
          .duration,
      work: demoProject.work.filter((demoWork) => demoWork._id !== workId),
    });
  };

  const render = (step) => {
    switch (step) {
      case 0:
        return <Step0 handleStep={() => setStep(1)} />;

      case 1:
        return (
          <Step1 demoProject={demoProject} handleStep={() => setStep(2)} />
        );

      case 2:
        return (
          <Step2
            demoProject={demoProject}
            editMode={editMode}
            handleDemoEdit={handleDemoEdit}
            handleDemoSave={handleDemoSave}
            setDemoProjectStatus={setDemoProjectStatus}
            handleStep={() => setStep(3)}
          />
        );

      case 3:
        return (
          <Step3
            demoProject={demoProject}
            handleCreateWork={handleCreateWork}
            handleUpdateWork={handleUpdateWork}
            handleRemoveWork={handleRemoveWork}
            handleStep={() => setStep(4)}
          />
        );

      default:
        return <Step4 />;
    }
  };

  return (
    <Container id="demo" theme={theme}>
      <DemoContainer color={getBackgroundColor(step)}>
        <MuiThemeProvider theme={demoTheme}>{render(step)}</MuiThemeProvider>
      </DemoContainer>
      <StepperContainer color={getBackgroundColor(step)}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel
                style={{ cursor: 'pointer' }}
                onClick={step.handleClick}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </StepperContainer>
    </Container>
  );
}
