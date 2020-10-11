import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useTheme, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const Backdrop = styled.div`
  background-color: ${({ backdropBackground }) => backdropBackground};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

export default function ContextualHelp(props) {
  const {
    childRef,
    open,
    text,
    uiBackground,
    backdropBackground,
    tooltipBackground,
    focusComponent,
    focusClickAction,
  } = props;
  const [helpIsOpen, setHelpIsOpen] = useState(open);
  const [boundingClientRect, setBoundingClientRect] = useState({});

  const theme = useTheme();

  const handleClose = () => {
    setHelpIsOpen(false);
    setBoundingClientRect({});
  };

  const handleFocusClick = () => {
    setHelpIsOpen(false);
    setBoundingClientRect({});
    focusClickAction();
  };

  const StyledTooltip = withStyles({
    tooltip: {
      background: tooltipBackground || '#fff',
      color: props.tooltipColor || '#000',
    },
    arrow: { color: tooltipBackground || '#fff' },
  })(Tooltip);

  useEffect(() => {
    setBoundingClientRect(childRef.current.getBoundingClientRect());
  }, [childRef]);

  const focusStyle = {
    cursor: 'pointer',
    zIndex: theme.zIndex.modal + 1,
    position: 'absolute',
    background: uiBackground || '#fff',
    borderRadius: '100%',
    width: boundingClientRect.width,
    height: boundingClientRect.height,
  };

  return helpIsOpen ? (
    <div>
      <StyledTooltip
        arrow
        disableFocusListener
        disableHoverListener
        disableTouchListener
        open={helpIsOpen}
        title={<Typography>{text}</Typography>}
      >
        <div style={focusStyle} onClick={handleFocusClick}>
          {focusComponent}
        </div>
      </StyledTooltip>
      <Backdrop
        open={helpIsOpen}
        theme={theme}
        backdropBackground={backdropBackground || 'rgba(0, 0, 0, 0.54)'}
        onClick={handleClose}
      />
    </div>
  ) : null;
}

/**
 * TODO: Add proptypes
 * open,
 * text,
 * uiBackground,
 * backdropBackground
 */
