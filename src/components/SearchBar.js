import React, { useState } from 'react';
import styled from 'styled-components';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const Container = styled.div`
  display: flex;
  width: 100%;
`;
export default function SearchBar(props) {
  const { handleSearch } = props;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    handleSearch('');
  };

  return (
    <Container>
      <IconButton onClick={() => (open ? handleClose() : setOpen(true))}>
        {open ? <CloseIcon /> : <SearchIcon />}
      </IconButton>
      <Grow style={{ maxWidth: 500 }} in={open} mountOnEnter unmountOnExit>
        <TextField
          style={{
            margin: '5px 10px',
          }}
          autoFocus
          fullWidth
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Grow>
    </Container>
  );
}