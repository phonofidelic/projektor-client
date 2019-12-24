import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import FormikDatePicker from 'components/FormikDatePicker';
import { StringContext } from 'strings';

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
  const strings = useContext(StringContext);

  return (
    <Container>
      <Formik
        initialValues={{
          title: '',
          startDate: null,
          deadline: null,
          client: '',
          budgetedTime: ''
        }}
        validate={values => {
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
              <Grid item xs={12}>
                <InputContainer>
                  <TextField
                    multiline
                    rows={3}
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
              <Grid item xs={12} sm={6}>
                <InputContainer>
                  <Field
                    id="start-date"
                    name="startDate"
                    label={strings.inp_lbl__project_start_date}
                    component={FormikDatePicker}
                  />
                </InputContainer>
                <InputContainer>
                  <Field
                    id="deadline"
                    name="deadline"
                    label={strings.inp_lbl__project_deadline}
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
                    label={strings.inp_lbl__project_client}
                    value={values.client}
                    onChange={handleChange}
                  />
                </InputContainer>
                <InputContainer>
                  <TextField
                    fullWidth
                    variant="outlined"
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

              <Grid item xs={12}>
                <InputContainer>
                  <Button
                    type="submit"
                    disabled={Object.keys(errors).length > 0}
                  >
                    {strings.btn__create_project}
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
