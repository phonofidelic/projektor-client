import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import { StringContext } from 'strings';
// import ProjectDetail from 'components/ProjectDetail';
import WorkSection from 'components/ProjectDetail/WorkSection';
import ProjectForm from 'components/ProjectForm';
import ProjectGridItem from 'components/ProjectGridItem';
import RegistrationButton from 'components/RegistrationButton';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
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

export const Step1 = (props) => {
  return (
    <div
      style={
        {
          // maxWidth: max740 ? '100%' : 600,
          // margin: '0 auto',
        }
      }
    >
      <ProjectForm
        project={props.demoProject}
        handleFormSubmit={props.handleStep}
      />
    </div>
  );
};

const GridStatusLabel = styled(Grid)`
  height: 40px;
`;
export const Step2 = (props) => {
  const strings = useContext(StringContext);
  const theme = useTheme();

  return (
    // <ProjectGrid projects={[demoProject]} />
    props.editMode ? (
      <ProjectForm
        project={props.demoProject}
        handleFormSubmit={props.handleDemoSave}
      />
    ) : (
      <Grid container spacing={1} style={{ padding: '0px 48px' }}>
        {props.demoProject.status === 'archived' && (
          <GridStatusLabel
            style={{
              color: theme.palette.warning.main,
            }}
            item
            sm={4}
          >
            {strings.ttl__archived}
          </GridStatusLabel>
        )}
        <Grid item sm={4} />
        {props.demoProject.status === 'active' && (
          <GridStatusLabel
            style={{ color: theme.palette.success.main }}
            item
            sm={4}
          >
            {strings.ttl__active}
          </GridStatusLabel>
        )}
        <Grid item sm={4} />
        {props.demoProject.status === 'deleted' && (
          <GridStatusLabel
            style={{ color: theme.palette.error.main }}
            item
            sm={4}
          >
            {strings.ttl__removed}
          </GridStatusLabel>
        )}

        {props.demoProject.status === 'archived' && (
          <ProjectGridItem
            project={props.demoProject}
            projectsDisplayMode="compact"
            // xs={12}
            sm={4}
            // md={6}
            setDemoProjectStatus={props.setDemoProjectStatus}
            handleDemoEdit={props.handleDemoEdit}
            handleDemoAction={props.handleStep}
          />
        )}
        <Grid item sm={4} />
        {props.demoProject.status === 'active' && (
          <ProjectGridItem
            project={props.demoProject}
            projectsDisplayMode="compact"
            // xs={12}
            sm={4}
            // md={6}
            setDemoProjectStatus={props.setDemoProjectStatus}
            handleDemoEdit={props.handleDemoEdit}
            handleDemoAction={props.handleStep}
          />
        )}
        <Grid item sm={4} />
        {props.demoProject.status === 'deleted' && (
          <ProjectGridItem
            project={props.demoProject}
            projectsDisplayMode="compact"
            // xs={12}
            sm={4}
            // md={6}
            setDemoProjectStatus={props.setDemoProjectStatus}
            handleDemoEdit={props.handleDemoEdit}
            handleDemoAction={props.handleStep}
          />
        )}
      </Grid>
    )
  );
};

export const Step3 = (props) => {
  const max800 = useMediaQuery('@media (max-width: 800px)');

  useEffect(() => {
    props.demoProject.work.length > 2 &&
      setTimeout(() => {
        props.handleStep();
      }, 1500);
  }, [props]);

  return (
    <div
      style={{
        width: max800 ? '100%' : 800,
        margin: '0 auto',
        padding: 0,
      }}
    >
      <WorkSection
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
