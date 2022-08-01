import { createTheme } from '@mui/material';

const colors = {
  red: '#E63946',
  offWhite: '#F1FAEE',
  blue1: '#A8DADC',
  blue2: '#457B9D',
  blue3: '#1D3557',
};

const globalTheme = createTheme({
  breakpoints: {
    keys: [],
    values: {},
  },
  palette: {
    primary: {
      main: colors.blue3,
    },
    secondary: {
      main: colors.blue2,
    },
  },
});

export default globalTheme;
