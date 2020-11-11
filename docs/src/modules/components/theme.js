import { createMuiTheme, fade } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

/**
 *
 */
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      level1: '#24292e',
    },
    text: {
      secondary: fade('#fff', 0.8),
    },
  },
  shape: {
    borderRadius: 2,
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: null,
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#24292e',
      },
    },
  },
});

export default theme;
