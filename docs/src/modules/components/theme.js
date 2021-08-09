import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#843131',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      level1: '#24292e',
    },
    text: {
      secondary: '#586069',
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#24292e',
      },
    },
    MuiToggleButton: {
      root: {
        color: 'rgba(0, 0, 0, 0.54)',
      }
    },
    MuiTypography: {
      h1: {
        fontSize: '3rem',
        letterSpacing: '0em',
        fontWeight: 700,
      },
      h2: {
        fontSize: '2.5rem',
        letterSpacing: '0em',
        fontWeight: 400,
      },
      h3: {
        fontSize: '1.875rem',
        fontWeight: 500,
        lineHeight: 1.235,
        letterSpacing: '0.00735em',
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 400,
        lineHeight: 1.334,
        letterSpacing: '0em',
      },
    },
  },
});

export default theme;
