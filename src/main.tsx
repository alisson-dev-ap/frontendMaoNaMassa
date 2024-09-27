import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MessagesProvider } from './context/messageChat.tsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Cor primária personalizada
    },
    secondary: {
      main: '#dc004e', // Cor secundária personalizada
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <MessagesProvider>
        <App />
      </MessagesProvider>
    </ThemeProvider>
  </StrictMode>,
);
