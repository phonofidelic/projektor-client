import React, { useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

import { StringContext } from 'strings';
import api from 'api';
import { useAuth } from 'services/AuthProvider';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  padding: 24px;
`;

const Header = styled.div``;

export default function TaskForm(props) {
  const { workId, projectId, handleClose, onTaskAdded } = props;

  const strings = useContext(StringContext);
  const { getAccessTokenSilently } = useAuth();

  const postNewTask = async (taskData) => {
    let response;

    try {
      const token = await getAccessTokenSilently();
      response = await api(token).post(`/tasks`, taskData);
    } catch (err) {
      console.error('Could not post new Task:', err);
    }

    const addedTask = response.data.createdTask;

    console.log('New Task:', addedTask);
    onTaskAdded(addedTask);
  };

  return (
    <Container>
      <Header>
        <Typography variant="h6">New Task</Typography>
        <Typography>Create a customTask</Typography>
      </Header>
      <Formik
        initialValues={{
          taskName: '',
          keywords: '',
          description: '',
          workId,
          projectId,
        }}
        validate={(values) => {
          const errors = {};

          if (!values.taskName) {
            errors.taskName = 'Please give your Task a name';
          }

          if (!values.keywords) {
            errors.keywords = 'Enter keywords seperated by spaces';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log('Posting Task:', values);
          postNewTask(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  id="task-name"
                  name="taskName"
                  label="Task Name"
                  helperText={
                    Boolean(errors.taskName && touched.taskName) &&
                    errors.taskName
                  }
                  error={Boolean(errors.taskName && touched.taskName)}
                  value={values.taskName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  id="task-keywords"
                  name="keywords"
                  label="Task Keywords"
                  helperText={
                    Boolean(errors.keywords && touched.keywords) &&
                    errors.keywords
                  }
                  error={Boolean(errors.keywords && touched.keywords)}
                  value={values.keywords}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  multiline
                  rows={5}
                  id="task-description"
                  name="description"
                  label="Task Description"
                  value={values.description}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                {strings.btn__cancel}
              </Button>
              <Button
                type="submit"
                color="primary"
                // disabled={Object.keys(errors).length > 0}
              >
                {strings.btn__save}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
