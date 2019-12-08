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

export default function LoginForm(props) {
  return (
    <Container>
      <Formik
        initialValues={{ email: null, password: null }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Please enter a valid email';
          } else if (!values.password) {
            errors.password = 'Password is required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          props.handleLoginSubmit(values);
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
                    Sign in
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
