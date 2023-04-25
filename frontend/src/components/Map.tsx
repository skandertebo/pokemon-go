import React, { useEffect, useRef } from 'react';
import { useGoogleMapsLoader } from '../context/GoogleMapsLoaderContext';
import { useAppContext } from '../context/AppContext';


const WebMap: React.FC = () => {
  const googleMapsRef = useRef<typeof google.maps>();
  const mapRef = useRef<google.maps.Map>();
  const loader = useGoogleMapsLoader();
  const MarkerRef = useRef<google.maps.MarkerLibrary>();
  const userMarkerRef = useRef<google.maps.Marker>();
  const { geoLocationPosition } = useAppContext() as {
    geoLocationPosition: GeolocationPosition;
  };
  const mapOptions = {
    center: {
      lat: geoLocationPosition?.coords?.latitude,
      lng: geoLocationPosition?.coords?.longitude
    },
    zoom: 16,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false
  };
  useEffect(() => {
    loader.load().then(async (google) => {
      mapRef.current = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          ...mapOptions,
          mapId: '29b1e9be7c81fd4a',
          gestureHandling: 'greedy'
        }
      );
      googleMapsRef.current = google.maps;
      const Marker = google.maps.Marker;
      userMarkerRef.current = new Marker({
        position: {
          lat: geoLocationPosition?.coords?.latitude,
          lng: geoLocationPosition?.coords?.longitude
        },

        icon: {
          url: '/images/userLocation.png',
          scaledSize: new google.maps.Size(25, 25),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(12.5, 15.5)
        },
        map: mapRef.current
      });
    });
  }, [loader]);

  useEffect(() => {
    if (geoLocationPosition && mapRef.current) {
      mapRef.current.setCenter({
        lat: geoLocationPosition?.coords?.latitude,
        lng: geoLocationPosition?.coords?.longitude
      });
    }
  }, [geoLocationPosition]);

  return <div className='h-full w-full' id='map'></div>;
};

export default WebMap;
