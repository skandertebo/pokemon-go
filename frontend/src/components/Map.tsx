import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useGoogleMapsLoader } from '../context/GoogleMapsLoaderContext';
import { useAppContext } from '../context/AppContext';
import { IoMdLocate } from 'react-icons/io';
import { Spawn } from '../types/Spawn';
import { useSpawnsContext } from '../context/SpawnsContext';
import { useSpawns } from '../Layouts/MainLayout';
const WebMap: React.FC = () => {
  const spawns = useSpawns();
  const googleMapsRef = useRef<typeof google.maps>();
  const mapRef = useRef<google.maps.Map>();
  const loader = useGoogleMapsLoader();
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
    fullscreenControl: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT
    }
  };
  const handleLocateClick = useCallback(() => {
    if (userMarkerRef.current && mapRef.current) {
      mapRef.current.panTo(userMarkerRef.current.getPosition()!);
    }
  }, []);

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

  useCharactersOnMap(mapRef, googleMapsRef);

  useEffect(() => {
    if (geoLocationPosition && mapRef.current && userMarkerRef.current) {
      userMarkerRef.current.setPosition({
        lat: geoLocationPosition?.coords?.latitude,
        lng: geoLocationPosition?.coords?.longitude
      });
    }
  }, [geoLocationPosition]);

  return (
    <div className='wrapper h-full w-full relative'>
      <div className='h-full w-full' id='map'></div>
      <IoMdLocate
        className='absolute top-4 right-2  bg-white rounded-full p-2 h-10 w-10 cursor-pointer text-primary'
        onClick={handleLocateClick}
      />
    </div>
  );
};

const useCharactersOnMap = (
  mapRef: React.MutableRefObject<google.maps.Map | undefined>,
  googleMapApiRef: React.MutableRefObject<typeof google.maps | undefined>
) => {
  const characters = useSpawns();
  const markersRef = useRef<google.maps.Marker[]>([]);
  useEffect(() => {
    if (mapRef.current && googleMapApiRef.current && characters) {
      markersRef.current.forEach((marker) => {
        marker.setMap(null);
      });
      markersRef.current = [];
      characters.forEach((character) => {
        const marker = new googleMapApiRef.current!.Marker({
          position: {
            lat: character.latitude,
            lng: character.longitude
          },
          icon: {
            url: '/images/spawnMarker.png',
            scaledSize: new googleMapApiRef.current!.Size(32, 50),
            origin: new googleMapApiRef.current!.Point(0, 0),
            anchor: new googleMapApiRef.current!.Point(16, 50)
          },
          map: mapRef.current
        });
        markersRef.current.push(marker);
      });
    }
  }, [characters, googleMapApiRef.current, mapRef.current]);
};

export default WebMap;
