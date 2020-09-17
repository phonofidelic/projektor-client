import React, { useEffect, useContext } from 'react';

import { StringContext } from 'strings';
import ProjectDetail from 'components/ProjectDetail';
import ProjectForm from 'components/ProjectForm';
import ProjectGridItem from 'components/ProjectGridItem';
import RegistrationButton from 'components/RegistrationButton';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

export function Step0(props) {
  const strings = useContext(StringContext);

  return (
    <div>
      <IconButton onClick={props.handleStep}>
        <AddIcon />
      </IconButton>
      <div style={{ margin: 16 }}>
        <Typography>{strings.hnt__demo_create_project}</Typography>
      </div>
    </div>
  );
}

export const Step1 = (props) => (
  <div
    style={{
      maxWidth: 600,
      margin: '0 auto',
    }}
  >
    <ProjectForm
      project={props.demoProject}
      handleFormSubmit={props.handleStep}
    />
  </div>
);

export const Step2 = (props) => (
  // <ProjectGrid projects={[demoProject]} />
  <div
    style={{
      maxWidth: 800,
      margin: '0 auto',
    }}
  >
    <Grid container spacing={1}>
      <ProjectGridItem
        project={props.demoProject}
        projectsDisplayMode="compact"
        // xs={12}
        sm={12}
        md={12}
        handleDemoAction={props.handleStep}
      />
    </Grid>
    <div />
  </div>
);

export const Step3 = (props) => {
  useEffect(() => {
    props.demoProject.work.length > 2 &&
      setTimeout(() => {
        props.handleStep();
      }, 1500);
  }, [props]);

  return (
    <div
      style={{
        // width: 800,
        // width: '100%',
        margin: '0 auto',
      }}
    >
      <ProjectDetail
        project={props.demoProject}
        createWork={props.handleCreateWork}
        updateWork={props.handleUpdateWork}
        removeWork={props.handleRemoveWork}
      />
    </div>
  );
};

export const Step4 = (props) => {
  const strings = useContext(StringContext);

  return (
    <div>
      <div style={{ margin: 16 }}>
        <Typography>{strings.msg__demo_continue}</Typography>
      </div>
      <div>
        <RegistrationButton />
      </div>
    </div>
  );
};
