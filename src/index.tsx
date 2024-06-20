import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Container from '@mui/material/Container';
import AppHeader from './components/AppHeader';
import Box from '@mui/material/Box';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container maxWidth="lg">
        <AppHeader />

        <Box
          component="main"
          pt={{ xs: 2, sm: 4 }}>
          <App />
        </Box>
      </Container>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
