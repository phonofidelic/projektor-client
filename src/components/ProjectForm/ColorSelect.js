import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

const ColorMenu = styled.div`
  padding: 4px;
  display: flex;
  max-width: 144px;
  flex-wrap: wrap;

  /* &.MuiList-root {
    padding: 4px;
  } */
`;

export default function ColorSelect(props) {
  const { selectedColor, project, setFieldValue } = props;

  const colorSelectLabel = useRef(null);
  const [colorSelectLabelWidth, setColorSelectLabelWidth] = useState(0);

  const handleChange = (e) => {
    setFieldValue('color', e.target.value, false);
  };
  useEffect(() => {
    project && setColorSelectLabelWidth(colorSelectLabel.current.offsetWidth);
  }, [project]);

  return (
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
          backgroundColor: selectedColor,
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
        defaultValue={selectedColor}
        value={selectedColor}
        onChange={handleChange}
      >
        {colors.map((color, i) => (
          <ColorBox
            key={i}
            component={() => <MenuItem disableGutters />}
            value={color.value}
            color={color.value}
            hover={color.hover}
          />
        ))}
      </Field>
    </FormControl>
  );
}
