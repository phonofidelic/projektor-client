import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { useTheme, withStyles } from '@material-ui/core/styles';
// import Backdrop from '@material-ui/core/Backdrop';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const Backdrop = styled.div`
  background-color: ${({ backdropBackground }) => backdropBackground};
  /* background-color: green; */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

export default function ContextualHelp(props) {
  const {
    open,
    text,
    uiBackground,
    backdropBackground,
    tooltipBackground
  } = props;
  const [helpIsOpen, setHelpIsOpen] = useState(open);
  // const [boundingClientRect, setBoundingClientRect] = useState({});

  const theme = useTheme();

  const ref = useRef(null);

  const handleClose = () => {
    console.log('close');
    setHelpIsOpen(false);
    // setBoundingClientRect({});
  };

  const StyledTooltip = withStyles({
    tooltip: {
      background: tooltipBackground || '#fff',
      color: props.tooltipColor || '#000'
    },
    arrow: { color: tooltipBackground || '#fff' }
  })(Tooltip);

  // useEffect(() => {
  //   setBoundingClientRect(ref.current.getBoundingClientRect());
  // }, []);

  return (
    <div>
      <StyledTooltip
        arrow
        disableFocusListener
        disableHoverListener
        disableTouchListener
        open={helpIsOpen}
        title={<Typography>{text}</Typography>}
      >
        <div
          style={
            helpIsOpen
              ? {
                  zIndex: theme.zIndex.modal + 1,
                  position: 'absolute',
                  background: uiBackground || '#fff',
                  borderRadius: '100%'
                  // right: 12
                  // ...boundingClientRect,
                  // width:
                  //   boundingClientRect.width > boundingClientRect.height
                  //     ? boundingClientRect.width
                  //     : boundingClientRect.height,
                  // height:
                  //   boundingClientRect.width > boundingClientRect.height
                  //     ? boundingClientRect.width
                  //     : boundingClientRect.height
                }
              : {}
          }
          ref={ref}
          onClick={handleClose}
        >
          {props.children}
        </div>
      </StyledTooltip>
      {helpIsOpen && (
        <Backdrop
          theme={theme}
          backdropBackground={backdropBackground || 'rgba(0, 0, 0, 0.54)'}
          onClick={handleClose}
        />
      )}
    </div>
  );
}

/**
 * TODO: Add proptypes
 * open,
 * text,
 * uiBackground,
 * backdropBackground
 */
