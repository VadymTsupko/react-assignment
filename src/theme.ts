import { cyan } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      light: '#bddfeb',
      main: '#add8e6',
      dark: '#7997a1',
      contrastText: '#000'
    },
    secondary: {
      main: cyan[500]
    }
  },
  components: {
    // MuiAppBar: {
    //   styleOverrides: {
    //     root: ({ theme }) => ({
    //       backgroundColor: theme.palette.primary.main,
    //       color: theme.palette.primary.contrastText
    //     })
    //   }
    // }
  }
});

export default theme;
