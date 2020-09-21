import { createMuiTheme } from '@material-ui/core/styles';
/**
 * Get access to augmentColor function to be used in theme creation.
 * https://github.com/mui-org/material-ui/issues/17410
 */
const { palette } = createMuiTheme({});

/**
 * Material-UI theme object
 */
export const materialUITheme = createMuiTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
    },
    secondary: {
      light: '#fff2bf',
      main: '#ffbf8e',
      dark: '#ca8f60',
    },
    logo: {
      cyan: palette.augmentColor({ main: '#00FFFF' }),
      magenta: palette.augmentColor({ main: '#FF00FF' }),
      orange: palette.augmentColor({ main: '#ff7f00' }),
    },
    background: {
      default: '#fff',
    },
  },
  dimensions: {
    projectDetailHeader: {
      height: 88,
    },
  },
});
