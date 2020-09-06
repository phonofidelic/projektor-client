import React from 'react';
import styled from 'styled-components';
import useMobileDetect from 'use-mobile-detect-hook';

import { useTheme } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.background};
  display: flex;
  width: ${({ open, isMobile }) => (open && isMobile ? '100%' : 'unset')};
  z-index: 0;
`;

export default function SearchBar(props) {
  const { placeholderMessage, open, setOpen, handleSearch } = props;
  const theme = useTheme();
  const { isMobile } = useMobileDetect();

  const handleClose = () => {
    setOpen(false);
    handleSearch('');
  };

  return (
    <Container theme={theme} open={open} isMobile={isMobile()}>
      <IconButton onClick={() => (open ? handleClose() : setOpen(true))}>
        {open ? <CloseIcon /> : <SearchIcon />}
      </IconButton>
      <Grow in={open} mountOnEnter unmountOnExit>
        <TextField
          style={{
            margin: '5px 10px'
          }}
          autoFocus
          fullWidth
          placeholder={placeholderMessage}
          // helperText="Search Projects"
          // FormHelperTextProps={{ margin: 'dense' }}
          onChange={e => handleSearch(e.target.value)}
        />
      </Grow>
    </Container>
  );
}
