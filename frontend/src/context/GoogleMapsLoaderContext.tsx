import { Loader } from '@googlemaps/js-api-loader';
import React, { createContext, useContext } from 'react';

const loader = new Loader({
  apiKey: 'AIzaSyCKh-TCMnsxcllDAyxj2n7G0UFOnB6hTuw',
  version: 'weekly',
  libraries: ['places', 'geometry', 'visualization', 'drawing']
});

const GoogleMapsLoaderContext = createContext(loader);

const useGoogleMapsLoader = () => {
  return useContext(GoogleMapsLoaderContext);
};

const GoogleMapsLoaderProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  return (
    <GoogleMapsLoaderContext.Provider value={loader}>
      {children}
    </GoogleMapsLoaderContext.Provider>
  );
};

export { useGoogleMapsLoader, GoogleMapsLoaderProvider };
