import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import { StringContext } from 'strings';

import ColorSelect from './ColorSelect';
import FormikDatePicker from 'components/FormikDatePicker';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Grey from '@material-ui/core/colors/grey';

const Container = styled.div`
  max-width: 500px;
  margin: 80px auto;

  @media (max-width: 600px) {
    margin: 8px auto;
  }
`;

const InputContainer = styled(Grid)`
  margin: 10px;
`;

export default function ProjectForm(props) {
  const { project } = props;
  const strings = useContext(StringContext);
  const max740 = useMediaQuery('(max-width: 740px)');

  return (
    <Container>
      <Formik
        initialValues={{
          color: project
            ? project.color
              ? project.color
              : Grey[50]
            : Grey[50],
          title: project ? project.title : '',
          description: project ? project.description : '',
          startDate: project ? project.startDate : null,
          deadline: project ? project.deadline : null,
          client: project ? project.client : '',
          budgetedTime: project ? project.budgetedTime : '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title || values.title === '') {
            errors.title = strings.msg__required;
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          props.handleFormSubmit(values);
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
          <Form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={10}>
                <InputContainer>
                  <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label={strings.inp_lbl__project_title}
                    variant="outlined"
                    helperText={
                      errors.title && touched.title && strings.msg__required
                    }
                    error={errors.title && touched.title}
                    value={values.title}
                    onChange={handleChange}
                  />
                </InputContainer>
              </Grid>
              <Grid
                item
                xs={2}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <InputContainer style={{ marginLeft: 0 }}>
                  <ColorSelect
                    selectedColor={values.color}
                    project={project}
                    setFieldValue={setFieldValue}
                  />
                </InputContainer>
              </Grid>
              <Grid item xs={12}>
                <InputContainer>
                  <TextField
                    multiline
                    rows={5}
                    rowsMax={10}
                    variant="outlined"
                    fullWidth
                    id="description"
                    name="description"
                    label={strings.inp_lbl__project_description}
                    value={values.description}
                    onChange={handleChange}
                  />
                </InputContainer>
              </Grid>
              <Grid container item xs={12} sm={6}>
                <Grid item xs={6} sm={12}>
                  <InputContainer>
                    <Field
                      id="start-date"
                      name="startDate"
                      label={strings.inp_lbl__project_start_date}
                      component={FormikDatePicker}
                    />
                  </InputContainer>
                </Grid>
                <Grid item xs={6} sm={12}>
                  <InputContainer>
                    <Field
                      id="deadline"
                      name="deadline"
                      label={strings.inp_lbl__project_deadline}
                      component={FormikDatePicker}
                    />
                  </InputContainer>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={6}>
                <Grid item xs={6} sm={12}>
                  <InputContainer>
                    <TextField
                      // variant="outlined"
                      fullWidth
                      id="client"
                      name="client"
                      label={strings.inp_lbl__project_client}
                      value={values.client}
                      onChange={handleChange}
                    />
                  </InputContainer>
                </Grid>
                <Grid item xs={6} sm={12}>
                  <InputContainer>
                    <TextField
                      fullWidth
                      // variant="outlined"
                      id="budgeted-time"
                      name="budgetedTime"
                      label={strings.inp_lbl__project_budgeted_time}
                      type="number"
                      inputProps={{ step: '0.1' }}
                      value={values.budgetedTime}
                      onChange={handleChange}
                    />
                  </InputContainer>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <InputContainer
                  style={{ textAlign: 'center', marginTop: max740 ? 32 : 80 }}
                >
                  <Button
                    color="primary"
                    // style={{ marginTop: '20px' }}
                    variant="contained"
                    // variant="outlined"
                    type="submit"
                    disabled={Object.keys(errors).length > 0}
                  >
                    {project
                      ? strings.btn__save_changes
                      : strings.btn__create_project}
                  </Button>
                </InputContainer>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}