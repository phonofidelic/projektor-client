import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StringContext } from 'strings';
import moment from 'moment';

import ProjectMenu from 'components/ProjectMenu';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const Container = styled(Grid)`
  padding: 10px;
  // border: 1px solid red;
  text-decoration: none;
`;

const CardContainer = styled(Card)`
  position: relative;
  &:hover {
    background-color: #e0e0e0
    // background-color: #ffc107
    transition: background-color 0.6s;
  }
`;

const CardTheme = styled.div`
  height: 5px;
  background: ${({ projectThemeColor }) => projectThemeColor};
`;

const CardHeader = styled.div`
  display: flex;
  padding: 16px;
`;

const CardLink = styled(Link)`
  text-decoration: none;

  &:visited {
    color: #000;
  }

  &:focus {
    color: #000;
  }

  &:hover {
    color: #000;
  }

  &:active {
    color: #000;
  }
`;

const ProjectInfoContainer = styled.div`
  // display: flex;
  // justify-content: space-around;
`;

export default function ProjectGridItem(props) {
  const { project } = props;
  const projectThemeColor = '#ffc107'; // TODO: get from project settings
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const HandleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Container
      key={project._id}
      item
      xs={12}
      sm={6}
      md={4}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={HandleMouseLeave}
    >
      <CardContainer>
        {/* <CardTheme projectThemeColor={projectThemeColor} /> */}
        <CardHeader>
          <Typography
            style={{ flexGrow: 1, lineHeight: '2em' }}
            variant="h5"
            component="h2"
          >
            {project.title}
          </Typography>
          <ProjectMenu project={project} />
        </CardHeader>
        <CardLink
          to={`projects/${project._id}`}
          style={{ textDecoration: 'none' }}
        >
          <CardContent>
            <ProjectInfoContainer>
              <Typography variant="overline">
                {strings.lbl__start_date}
              </Typography>{' '}
              {project.startDate
                ? moment(project.startDate).format(
                    currentLocaleData.longDateFormat('L')
                  )
                : strings.msc__tbd_short}
              <br />
              <Typography variant="overline">
                {strings.lbl__deadline}
              </Typography>{' '}
              {project.deadline
                ? moment(project.deadline).format(
                    currentLocaleData.longDateFormat('L')
                  )
                : strings.msc__open}
            </ProjectInfoContainer>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{
                height: 100,
                overflowY: 'auto',
                whiteSpace: 'pre-wrap'
              }}
            >
              {project.description === 'No description provided'
                ? strings.msg__empty_project_description
                : project.description}
            </Typography>
          </CardContent>
        </CardLink>
        <div style={{ height: 5 }}>
          {project.budgetedTime && (
            <LinearProgress
              value={(project.timeUsed / (project.budgetedTime * 3.6e6)) * 100}
              variant="determinate"
              style={{ height: 5 }}
            />
          )}
        </div>
      </CardContainer>
    </Container>
  );
}
