// @flow strict

import type {Node} from 'react';

import React from 'react';
import {useState, useCallback} from 'react';
import {GoogleMap} from '@react-google-maps/api';
import {searchAutocomplete} from 'services/GoogleAPI';

const containerStyle = {
  width: '100wh',
  height: '100vh',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export default function UserLocationStep(): Node {
  const [map, setMap] = useState(null);

  // Deliberately not using useCallback, this is only called once
  function onLoad(mapInstance) {
    setMap(mapInstance);
    searchAutocomplete('polanco', '133').then((results) => {
      console.log(results);
    });
  }

  const onIdle = useCallback(() => {
    if (map !== null) {
      const center = map.getCenter();
      const lat = center.lat();
      const lon = center.lat();
      console.log(lat, lon);
    }
  }, [map]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      options={{disableDefaultUI: true}}
      onLoad={onLoad}
      onIdle={onIdle}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  );
}
