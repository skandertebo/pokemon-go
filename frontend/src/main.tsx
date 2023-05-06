import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GoogleMapsLoaderProvider } from './context/GoogleMapsLoaderContext';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import { AppContextProvider } from './context/AppContext';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthContextProvider } from './context/AuthContext';
import './App.css';

declare module '@mui/material/styles' {
  interface Palette {
    third: Palette['primary'];
    fourth: Palette['primary'];
  }
  interface PaletteOptions {
    third: string;
    fourth: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#00295F'
    },
    secondary: {
      main: '#F0F3D1'
    },
    third: '#F09393',
    fourth: '#8A8D91'
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <GoogleMapsLoaderProvider>
        <AppContextProvider>
          <ThemeProvider theme={theme}>
            <RouterProvider router={routes} />
          </ThemeProvider>
        </AppContextProvider>
      </GoogleMapsLoaderProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
