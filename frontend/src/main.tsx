import React from 'react';
import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import './index.css';
import { GoogleMapsLoaderProvider } from './context/GoogleMapsLoaderContext';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import { AppContextProvider } from './context/AppContext';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthContextProvider } from './context/AuthContext';
import './App.css';
import { registerSW } from 'virtual:pwa-register';
import OfflinePage from './pages/OfflinePage';
import PokemonProgress from './components/PokemonProgress';

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

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  !navigator.onLine ? (
    <OfflinePage />
  ) : (
    <AuthContextProvider>
      <GoogleMapsLoaderProvider>
        <AppContextProvider>
          <ThemeProvider theme={theme}>
            <Suspense fallback={<PokemonProgress />}>
              <RouterProvider router={routes} />
            </Suspense>
          </ThemeProvider>
        </AppContextProvider>
      </GoogleMapsLoaderProvider>
    </AuthContextProvider>
  )
);
