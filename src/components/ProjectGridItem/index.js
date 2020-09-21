import React from 'react';
import PropTypes from 'prop-types';
import useHover from 'hooks/useHover';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { EXPANDED } from 'constants/projectsDisplayModes';
import useMobileDetect from 'use-mobile-detect-hook';

import ProjectCardContent from './ProjectCardContent';
import ProjectMenu, {
  ProjectMenu as DemoProjectMenu,
} from 'components/ProjectMenu';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    width: 100,
    display: 'content',
  },
  avatar: {
    backgroundColor: ({ projectColor }) => projectColor,
    color: ({ projectColor }) =>
      theme.palette.getContrastText(projectColor || '#fff'),
  },
}));

const ProgressContainer = styled.div`
  display: flex;
  height: 5px;
  width: 100%;
  border-radius: 0 0 4px 4px;
  margin-top: auto;
  // overflow: hidden;
`;

const Progress = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  width: ${({ project }) =>
    (project.timeUsed / (project.budgetedTime * 3.6e6)) * 100}%;
  height: 5px;
`;

export function ProjectGridItem(props) {
  const { project, projectsDisplayMode, handleDemoAction } = props;
  const [hoverRef, hovered] = useHover();
  const history = useHistory();
  const { isMobile } = useMobileDetect();

  const classes = useStyles({ projectColor: project.color });

  const handleClick = () => {
    handleDemoAction
      ? handleDemoAction()
      : history.push(`projects/${project._id}`);
  };
  return (
    <Grid
      style={{ textAlign: 'left' }}
      item
      xs={props.xs || 12}
      sm={props.sm || 6}
      md={props.md || 4}
      ref={hoverRef}
    >
      <Card
        variant="outlined"
        style={{
          position: 'relative',
          transition: 'all 0.3 ease-in-out',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            // right: 50
          }}
        >
          <div
            style={{
              visibility: hovered || isMobile() ? 'visible' : 'hidden',
              margin: 12,
              display: 'flex',
              zIndex: 1,
            }}
          >
            {project.isDemo ? (
              <DemoProjectMenu
                project={project}
                setDemoProjectStatus={props.setDemoProjectStatus}
                handleDemoEdit={props.handleDemoEdit}
              />
            ) : (
              <ProjectMenu project={project} />
            )}
          </div>
        </div>

        <CardActionArea onClick={handleClick}>
          <CardHeader
            classes={{ content: classes.cardHeader }}
            avatar={
              <Avatar className={classes.avatar}>
                {project.title
                  .split(' ')
                  .slice(0, 2)
                  .map((s) => s.charAt(0))
                  .join('')}
              </Avatar>
            }
            title={project.title}
            titleTypographyProps={{
              noWrap: true,
            }}
            subheader={project.client}
            action={<div style={{ width: 50 }} />}
          />
          <ProgressContainer>
            <Progress project={project} />
          </ProgressContainer>
        </CardActionArea>
        {projectsDisplayMode === EXPANDED && (
          <ProjectCardContent project={project} />
        )}
      </Card>
    </Grid>
  );
}

ProjectGridItem.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    client: PropTypes.string,
    color: PropTypes.string,
    status: PropTypes.string,
    startDate: PropTypes.string,
    deadline: PropTypes.string,
    created: PropTypes.string,
    userId: PropTypes.string,
    budgetedTime: PropTypes.number,
    timeUsed: PropTypes.number,
  }),
  projectsDisplayMode: PropTypes.string,
};

export default ProjectGridItem;
