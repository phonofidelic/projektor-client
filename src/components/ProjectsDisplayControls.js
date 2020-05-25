import React, { useContext } from 'react';
import { StringContext } from 'strings';
import styled from 'styled-components';
import { COMPACT, EXPANDED, TABLE } from 'constants/projectsDisplayModes';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CompactIcon from '@material-ui/icons/Crop75';
import ExpandedIcon from '@material-ui/icons/CropPortrait';
import TableIcon from '@material-ui/icons/List';
import Grey from '@material-ui/core/colors/grey';

const Container = styled.div`
  display: flex;
  height: 40px;
  margin: 4px;
  margin-right: 20px;
`;

export default function ProjectsDisplayControls(props) {
  const { projectsDisplayMode, selectDisplayMode } = props;
  const strings = useContext(StringContext);

  const displayModes = [
    {
      type: COMPACT,
      title: strings.hnt__compact_view,
      icon: <CompactIcon />,
    },
    {
      type: EXPANDED,
      title: strings.hnt__expanded_view,
      icon: <ExpandedIcon />,
    },
    {
      type: TABLE,
      title: strings.hnt__table_view,
      icon: <TableIcon />,
    },
  ];

  return (
    <Container>
      <ButtonGroup color="primary" aria-label="Project display mode selection">
        {displayModes.map((displayMode, i) => (
          <Tooltip key={i} arrow title={displayMode.title} enterDelay={400}>
            <Button
              style={{
                color:
                  projectsDisplayMode === displayMode.type ? '#666' : '#212121',
                backgroundColor:
                  projectsDisplayMode === displayMode.type ? Grey[300] : null,
                cursor:
                  projectsDisplayMode === displayMode.type
                    ? 'default'
                    : 'pointer',
              }}
              // disabled={projectsDisplayMode === displayMode.type}
              onClick={() => selectDisplayMode(displayMode.type)}
            >
              {displayMode.icon}
            </Button>
          </Tooltip>
        ))}
      </ButtonGroup>
    </Container>
  );
}
