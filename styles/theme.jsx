import { createTheme, css } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3c75e2',
    },
    secondary: {
      main: '#4ec9b0',
    },
    error: {
      main: '#c72013',
    },
    background: {
      default: '#212121',
      paper: '#424242',
    },
  },
  components: {
    MuiGrid: {
      defaultProps: {
        width: '100%',
      },
    },
    MuiTextField: {
      defaultProps: {
        sx: {
          width: '100%',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h3: css`
          text-align: center;
          font-weight: 700;
          font-size: 2rem;
        `,
      },
    },
  },
});

export default theme;
