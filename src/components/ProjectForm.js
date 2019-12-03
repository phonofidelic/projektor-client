import React from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import FormikDatePicker from 'components/FormikDatePicker';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const Container = styled.div`
  margin: 80px;
`;

const InputContainer = styled(Grid)`
  margin: 10px;
`;

export default function ProjectForm(props) {
  return (
    <Container>
      <Formik
        initialValues={{ startDate: null, deadline: null }}
        validate={values => {
          const errors = {};
          if (!values.title || values.title === '') {
            errors.title = 'Required';
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
          isSubmitting
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <InputContainer>
                  <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Project Title"
                    variant="outlined"
                    // value={values.title}
                    helperText={errors.title && touched.title && 'Required'}
                    error={errors.title && touched.title}
                    onChange={handleChange}
                  />
                </InputContainer>
              </Grid>
              <Grid item xs={12}>
                <InputContainer>
                  <TextField
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    // value={values.description}
                    onChange={handleChange}
                  />
                </InputContainer>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputContainer>
                  <Field
                    id="start-date"
                    name="startDate"
                    label="Start Date"
                    component={FormikDatePicker}
                  />
                </InputContainer>
                <InputContainer>
                  <Field
                    id="deadline"
                    name="deadline"
                    label="Deadline"
                    component={FormikDatePicker}
                  />
                </InputContainer>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputContainer>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="client"
                    name="client"
                    label="Client"
                    // value={values.client}
                    onChange={handleChange}
                  />
                </InputContainer>
                <InputContainer>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="budgeted-time"
                    name="budgetedTime"
                    label="Budgeted Time"
                    type="number"
                    // value={values.budgetedHours}
                    onChange={handleChange}
                  />
                </InputContainer>
              </Grid>

              <Grid item xs={12}>
                <InputContainer>
                  <Button
                    type="submit"
                    disabled={Object.keys(errors).length > 0}
                  >
                    Create Project
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
