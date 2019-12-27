import React, { useState, useContext } from 'react';
import moment from 'moment';
import { StringContext } from 'strings';

import WorkTable from 'components/ProjectDetail/WorkTable';
import Timer from 'components/Timer';
import NoteDialog from 'components/ProjectDetail/NoteDialog';

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import AddIcon from '@material-ui/icons/Add';
import NotesIcon from '@material-ui/icons/Notes';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PublishIcon from '@material-ui/icons/Publish';

export default function WorkSection(props) {
  const { project, createWork, updateWork, removeWork } = props;
  const strings = useContext(StringContext);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [workStarted, setWorkStarted] = useState(false);
  const [workActive, setWorkActive] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [workItem, setWorkItem] = useState(null);

  const hadleOpenNote = work => {
    if (work) setWorkItem(work);
    setNoteOpen(true);
  };

  const handleCloseNote = () => {
    setNoteOpen(false);
    setWorkItem(null);
  };

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

  const handleCancelWork = () => {};

  const handleSubmitWork = () => {
    console.log('====================================');
    console.log('start:', startTime);
    console.log('end:', moment(time + startTime).format('hh:mm:ss'));
    console.log('duration:', time);
    console.log('notes:', activeNote);
    console.log('====================================');

    createWork({
      projectId: project._id,
      date: startTime,
      start: startTime,
      end: startTime + time,
      duration: time,
      notes: activeNote
    });

    setWorkActive(false);
    setWorkStarted(false);
    setTime(0);
  };

  const handleSetActiveNote = note => {
    setActiveNote(note);
  };

  return (
    <div>
      <NoteDialog
        open={noteOpen}
        workItem={workItem}
        handleClose={handleCloseNote}
        handleSetActiveNote={handleSetActiveNote}
        updateWork={updateWork}
      />
      <div style={{ margin: 18, display: 'flex' }}>
        <Typography variant="h5" align="left">
          {strings.ttl__work}
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
          {workStarted && (
            <Tooltip
              title={strings.hnt__add_note}
              placement="top-start"
              enterDelay={400}
            >
              <IconButton onClick={() => hadleOpenNote()}>
                <PostAddIcon />
              </IconButton>
            </Tooltip>
          )}
          {!workStarted ? (
            <div>
              {/**
               * Start new task
               */}
              <Tooltip
                title={strings.btn__start_new_task}
                placement="top-start"
                enterDelay={400}
              >
                <IconButton onClick={handleStartWork}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </div>
          ) : !workActive ? (
            /**
             * Resume task
             */
            <Tooltip
              title={strings.btn__resume_task}
              placement="top-start"
              enterDelay={400}
            >
              <IconButton onClick={handleResumeWork}>
                <PlayArrowIcon />
              </IconButton>
            </Tooltip>
          ) : (
            /**
             * Pause task
             */

            <Tooltip
              title={strings.btn__pause_task}
              placement="top-start"
              enterDelay={400}
            >
              <IconButton onClick={handlePauseWork}>
                <PauseIcon />
              </IconButton>
            </Tooltip>
          )}
          {workStarted && (
            /**
             * Submit new task
             */
            <Tooltip
              title={
                workActive
                  ? strings.hnt__pause_to_post
                  : strings.btn__submit_task
              }
              placement="top-start"
              enterDelay={400}
            >
              <span>
                <IconButton disabled={workActive} onClick={handleSubmitWork}>
                  <PublishIcon />
                </IconButton>
              </span>
            </Tooltip>
          )}
        </div>
      </div>
      {project.work.length > 0 && (
        <WorkTable
          project={project}
          hadleOpenNote={hadleOpenNote}
          removeWork={removeWork}
        />
      )}
    </div>
  );
}
