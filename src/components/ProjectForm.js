import React, { useState, useEffect, useContext, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import FormikDatePicker from 'components/FormikDatePicker';
import { StringContext } from 'strings';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Grey from '@material-ui/core/colors/grey';
import Red from '@material-ui/core/colors/red';
import Purple from '@material-ui/core/colors/purple';
import Blue from '@material-ui/core/colors/blue';
import Green from '@material-ui/core/colors/green';
import Yellow from '@material-ui/core/colors/yellow';
import Orange from '@material-ui/core/colors/orange';

const colors = [
  { value: Grey[50], hover: Grey[200] },
  { value: Grey[400], hover: Grey[600] },
  { value: Grey[800], hover: Grey[900] },
  { value: Red[400], hover: Red[600] },
  { value: Purple[400], hover: Purple[600] },
  { value: Blue[400], hover: Blue[600] },
  { value: Green[400], hover: Green[600] },
  { value: Yellow[400], hover: Yellow[600] },
  { value: Orange[400], hover: Orange[600] },
];

const Container = styled.div`
  max-width: 800px;
  margin: 80px auto;
`;

const InputContainer = styled(Grid)`
  margin: 10px;
`;

const ColorMenu = styled.div`
  padding: 4px;
  display: flex;
  max-width: 144px;
  flex-wrap: wrap;

  &.MuiList-root {
    paddig: 4px;
  }
`;

const ColorBox = styled.div`
  width: 40px;
  height: 40px;
  margin: 4px;
  background-color: ${({ color }) => color};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.6s;

  &:hover {
    background-color: ${({ hover }) => hover};
    transition: background-color 0.6s;
  }
`;

export default function ProjectForm(props) {
  const { project } = props;
  const strings = useContext(StringContext);
  const colorSelectLabel = useRef(null);
  const [colorSelectLabelWidth, setColorSelectLabelWidth] = useState(0);

  useEffect(() => {
    project && setColorSelectLabelWidth(colorSelectLabel.current.offsetWidth);
  }, [project]);

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
              <Grid item xs={11}>
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
              <Grid item xs={1}>
                <InputContainer style={{ marginLeft: 0 }}>
                  <FormControl variant="outlined">
                    <InputLabel
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        padding: 2,
                      }}
                      ref={colorSelectLabel}
                      htmlFor="project-color"
                    >
                      Color
                    </InputLabel>
                    <Field
                      component={Select}
                      style={{
                        backgroundColor: values.color,
                      }}
                      labelWidth={colorSelectLabelWidth}
                      MenuProps={{
                        MenuListProps: {
                          disablePadding: true,
                          component: ColorMenu,
                        },
                      }}
                      id="project-color"
                      name="color"
                      label="Project color"
                      defaultValue={values.color}
                      value={values.color}
                      onChange={(e) =>
                        setFieldValue('color', e.target.value, false)
                      }
                    >
                      {colors.map((color, i) => (
                        <ColorBox
                          key={i}
                          component={MenuItem}
                          value={color.value}
                          color={color.value}
                          hover={color.hover}
                        />
                      ))}
                    </Field>
                  </FormControl>
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
                    style={{ marginTop: '20px' }}
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
