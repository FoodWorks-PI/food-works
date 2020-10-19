// @flow

import type {Node} from 'react';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useState, useCallback, useEffect} from 'react';
import {GoogleMap} from '@react-google-maps/api';
import useInitialGeoPosition from 'hooks/useInitialGeoPosition';
import {headquartersLatitude, headquartersLongitude} from 'constants/PlacesConstants';
import FlexLayout from 'components/shared/FlexLayout.react';
import {useDispatch, useMappedState} from 'stores/hooks/CustomerStoreHooks';
import {loadPlaceFromReverse} from 'actions/CustomerSelectedPlaceActions';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const barHeight = 104;

const containerStyle = {
  width: '100%',
  height: '100%',
};

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
  },
  address: {
    width: '100%',
    height: barHeight,
    paddingTop: 8,
    zIndex: 1,
  },
  mapContainer: {
    width: '100%',
    height: `calc(100vh - ${barHeight}px)`,
    position: 'relative',
  },
});

export default function UserLocationStep(): Node {
  const selectedPlaceState = useMappedState((state) => state.selectedPlace);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [map, setMap] = useState(null);
  const [userPosition] = useInitialGeoPosition();

  useEffect(() => {
    if (userPosition) {
      const lat = userPosition.coords.latitude;
      const lon = userPosition.coords.longitude;
      dispatch(loadPlaceFromReverse(lat.toString(), lon.toString()));
      if (map !== null) {
        map.setCenter({lat, lng: lon});
      }
    }
  }, [userPosition, dispatch, map]);

  // Deliberately not using useCallback, this is only called once
  function onLoad(mapInstance) {
    setMap(mapInstance);
  }

  const onIdle = useCallback(() => {
    if (map !== null && map.center) {
      dispatch(
        loadPlaceFromReverse(map.center.lat().toString(), map.center.lng().toString()),
      );
    }
  }, [map, dispatch]);

  return (
    <FlexLayout className={classes.root} direction="vertical">
      <Paper elevation={4} square className={classes.address}>
        <FlexLayout direction="vertical" align="center">
          <Typography align="center" variant="h6" gutterBottom>
            Selecciona tu ubicación
          </Typography>
          <Typography align="center" variant="body2">
            {!selectedPlaceState.isFetching && !selectedPlaceState.hasError
              ? selectedPlaceState.place !== null
                ? selectedPlaceState.place?.formatted_address
                : 'Dirección no encontrada'
              : selectedPlaceState.hasError
              ? 'Error'
              : 'Cargando...'}
          </Typography>
        </FlexLayout>
      </Paper>
      <div className={classes.mapContainer}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          defaultCenter={{
            lat: headquartersLatitude,
            lng: headquartersLongitude,
          }}
          zoom={17}
          options={{disableDefaultUI: true}}
          onLoad={onLoad}
          onIdle={onIdle}
        />
      </div>
    </FlexLayout>
  );
}
