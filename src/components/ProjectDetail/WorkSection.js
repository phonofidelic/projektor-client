import React, { useState } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import WorkTable from 'components/ProjectDetail/WorkTable';
import Timer from 'components/Timer';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

export default function WorkSection(props) {
  const { project, createWork } = props;
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [workStarted, setWorkStarted] = useState(false);
  const [workActive, setWorkActive] = useState(false);

  const handleStartWork = () => {
    setStartTime(Date.now());
    setWorkStarted(true);
    setWorkActive(true);
    setTime(time);
  };

  const handlePauseWork = () => {
    setWorkActive(false);
    setTime(time);
  };

  const handleResumeWork = () => {
    setWorkActive(true);
  };

  const handleSubmitWork = () => {
    console.log('====================================');
    console.log('start:', startTime);
    console.log('end:', moment(time + startTime).format('hh:mm:ss'));
    console.log('duration:', time);
    console.log('====================================');

    createWork({
      projectId: project._id,
      date: startTime,
      start: startTime,
      end: time + startTime,
      duration: time
    });

    setWorkActive(false);
    setWorkStarted(false);
    setTime(0);
  };

  return (
    <div>
      <div style={{ margin: 18, display: 'flex' }}>
        <Typography variant="h5" align="left">
          Work
        </Typography>
        <div style={{ flexGrow: 1, lineHeight: '48px' }}>
          {workStarted && (
            <div>
              {workActive ? (
                <Timer format="hh:mm:ss" currentTime={time} setTime={setTime} />
              ) : (
                moment.duration(time, 'ms').format('hh:mm:ss', { trim: false })
              )}
            </div>
          )}
        </div>
        <div>
          {!workStarted ? (
            <Button onClick={handleStartWork}>Start new task</Button>
          ) : !workActive ? (
            <IconButton onClick={handleResumeWork}>
              <PlayArrowIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handlePauseWork}>
              <PauseIcon />
            </IconButton>
          )}
          {workStarted && (
            <Button disabled={workActive} onClick={handleSubmitWork}>
              Submit
            </Button>
          )}
        </div>
      </div>
      {project.work.length > 0 && <WorkTable project={project} />}
    </div>
  );
}
