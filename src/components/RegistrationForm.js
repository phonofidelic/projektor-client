import React from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const Container = styled.div`
  margin: 80px auto;
  max-width: 500px;
`;

const InputContainer = styled(Grid)`
  margin: 10px;
`;

export default function RegistrationForm(props) {
  return (
    <Container>
      <Formik
        initialValues={{ email: '', password: '', passwordMatch: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Please enter a valid email';
          } else if (!values.password) {
            errors.password = 'Password is required';
          } else if (!values.passwordMatch) {
            errors.passwordMatch = 'Please confirm password';
          } else if (values.password !== values.passwordMatch) {
            errors.passwordMatch = 'Passwords do not match';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          props.handleRegistrationSubmit(values);
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
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    helperText={errors.email && touched.email && errors.email}
                    error={errors.email && touched.email}
                    value={values.email}
                    onChange={handleChange}
                  />
                </InputContainer>
              </Grid>
              <Grid item xs={12}>
                <InputContainer>
                  <TextField
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    helperText={
                      errors.password && touched.password && errors.password
                    }
                    error={errors.password && touched.password}
                    value={values.password}
                    onChange={handleChange}
                  />
                </InputContainer>
              </Grid>
              <Grid item xs={12}>
                <InputContainer>
                  <TextField
                    fullWidth
                    type="password"
                    id="password-match"
                    name="passwordMatch"
                    label="Confirm password"
                    variant="outlined"
                    helperText={
                      errors.passwordMatch &&
                      touched.passwordMatch &&
                      errors.passwordMatch
                    }
                    error={errors.passwordMatch && touched.passwordMatch}
                    value={values.passwordMatch}
                    onChange={handleChange}
                  />
                </InputContainer>
              </Grid>
              <Grid item xs={12}>
                <InputContainer>
                  <Button
                    type="submit"
                    // disabled={Object.keys(errors).length > 0}
                  >
                    Create account
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
