import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

import { useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Grey from '@material-ui/core/colors/grey';

const colors = [
  {
    value: (theme) => theme.palette.augmentColor({ main: '#EF5D60' }).main,
    hover: (theme) => theme.palette.augmentColor({ main: '#EF5D60' }).light,
  },
  {
    value: (theme) => theme.palette.augmentColor({ main: '#F8A948' }).main,
    hover: (theme) => theme.palette.augmentColor({ main: '#F8A948' }).light,
  },
  {
    value: (theme) => theme.palette.augmentColor({ main: '#F9DB6D' }).main,
    hover: (theme) => theme.palette.augmentColor({ main: '#F9DB6D' }).light,
  },
  {
    value: (theme) => theme.palette.augmentColor({ main: '#87CE60' }).main,
    hover: (theme) => theme.palette.augmentColor({ main: '#87CE60' }).light,
  },
  {
    value: (theme) => theme.palette.augmentColor({ main: '#7BDFF2' }).main,
    hover: (theme) => theme.palette.augmentColor({ main: '#7BDFF2' }).light,
  },
  {
    value: (theme) => theme.palette.augmentColor({ main: '#9E86D0' }).main,
    hover: (theme) => theme.palette.augmentColor({ main: '#9E86D0' }).light,
  },
  /** Row 2 */
  {
    value: (theme) => theme.palette.augmentColor({ main: '#EF5D60' }).dark,
    hover: (theme) => theme.palette.augmentColor({ main: '#EF5D60' }).main,
  },
  {
    value: (theme) => theme.palette.augmentColor({ main: '#F8A948' }).dark,
    hover: (theme) => theme.palette.augmentColor({ main: '#F8A948' }).main,
  },
  {
    value: (theme) => theme.palette.augmentColor({ main: '#F9DB6D' }).dark,
    hover: (theme) => theme.palette.augmentColor({ main: '#F9DB6D' }).main,
  },
  {
    value: (theme) => theme.palette.augmentColor({ main: '#87CE60' }).dark,
    hover: (theme) => theme.palette.augmentColor({ main: '#87CE60' }).main,
  },
  {
    value: (theme) => theme.palette.augmentColor({ main: '#7BDFF2' }).dark,
    hover: (theme) => theme.palette.augmentColor({ main: '#7BDFF2' }).main,
  },
  {
    value: (theme) => theme.palette.augmentColor({ main: '#9E86D0' }).dark,
    hover: (theme) => theme.palette.augmentColor({ main: '#9E86D0' }).main,
  },

  {
    value: (theme) => theme.palette.augmentColor({ main: Grey[900] }).main,
    hover: (theme) => theme.palette.augmentColor({ main: Grey[900] }).dark,
  },
  {
    value: (theme) => theme.palette.augmentColor({ main: Grey[600] }).main,
    hover: (theme) => theme.palette.augmentColor({ main: Grey[600] }).dark,
  },
  {
    value: (theme) => theme.palette.augmentColor({ main: Grey[50] }).main,
    hover: (theme) => theme.palette.augmentColor({ main: Grey[50] }).dark,
  },
];

const ColorMenu = styled.div`
  padding: 4px;
  display: flex;
  max-width: 144px;
  flex-wrap: wrap;

  /* &.MuiList-root {
    padding: 4px;
  } */
`;

const ColorBox = styled.div`
  width: 40px;
  height: 40px;
  margin: 4px;
  background-color: ${({ color }) => color};
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.6s;

  &:hover {
    background-color: ${({ hover }) => hover};
    transition: background-color 0.6s;
  }
`;

export default function ColorSelect(props) {
  const { selectedColor, project, setFieldValue } = props;

  const colorSelectLabel = useRef(null);
  const [colorSelectLabelWidth, setColorSelectLabelWidth] = useState(0);

  const theme = useTheme();

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
          backgroundColor: theme.palette.background.default,
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
        SelectDisplayProps={{
          style: {
            width: 20,
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
            value={color.value(theme)}
            color={color.value(theme)}
            hover={color.hover(theme)}
          />
        ))}
      </Field>
    </FormControl>
  );
}
