import React, { useState, useContext } from 'react';
import { StringContext } from 'strings';

import WorkTable from 'components/ProjectDetail/WorkTable';
import WorkModal from 'components/ProjectDetail/WorkModal';
import ActiveWork from 'components/ProjectDetail/ActiveWork';

import Typography from '@material-ui/core/Typography';

export default function WorkSection(props) {
  const { project, createWork, updateWork, removeWork } = props;
  const strings = useContext(StringContext);
  const [noteOpen, setNoteOpen] = useState(false);
  const [workItem, setWorkItem] = useState(null);

  const hadleOpenWork = work => {
    if (work) setWorkItem(work);
    setNoteOpen(true);
  };

  const handleCloseWork = () => {
    setNoteOpen(false);
    setWorkItem(null);
  };

  return (
    <div>
      <WorkModal
        open={noteOpen}
        workItem={workItem}
        handleClose={handleCloseWork}
        updateWork={updateWork}
      />
      <div style={{ margin: 18, display: 'flex' }}>
        <Typography variant="h5" align="left">
          {strings.ttl__work}
        </Typography>
      </div>
      {project.work.length > 0 && (
        <WorkTable
          project={project}
          hadleOpenWork={hadleOpenWork}
          removeWork={removeWork}
        />
      )}
      <ActiveWork project={project} createWork={createWork} />
    </div>
  );
}
