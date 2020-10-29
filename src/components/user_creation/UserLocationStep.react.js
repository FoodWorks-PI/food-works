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
import ButtonBase from '@material-ui/core/ButtonBase';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Button from 'components/shared/Button.react';
import {gql, useMutation} from '@apollo/client';
import {useHistory, useLocation} from 'react-router-dom';
import * as ROUTES from 'constants/Routes';

const CREATE_USER = gql`
  mutation CreateUser($input: RegisterCustomerInput!) {
    createCustomerProfile(input: $input)
  }
`;

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
  buttonToAutocomplete: {
    position: 'absolute',
    zIndex: 1,
    top: 24,
    width: '80%',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    borderRadius: 20,
  },
  searchCard: {
    borderRadius: 20,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  locationIcon: {
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  buttonReady: {
    position: 'absolute',
    zIndex: 1,
    bottom: 48,
    width: '80%',
    left: '50%',
    transform: 'translate(-50%, 0%)',
  },
});

export default function UserLocationStep(): Node {
  const history = useHistory();
  const location = useLocation();
  const selectedPlaceState = useMappedState((state) => state.selectedPlace);
  const customerCreationState = useMappedState((state) => state.customerCreation);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [map, setMap] = useState(null);
  const [userPosition] = useInitialGeoPosition();
  const [createUser, {loading: loadingCreation}] = useMutation(CREATE_USER, {
    onCompleted() {
      // TODO: Replace entire history stack
      history.replace({
        pathname: ROUTES.PROTECTED_ROOT,
      });
    },
  });

  const initialLat = new URLSearchParams(location.search).get('initial_lat');
  const initialLon = new URLSearchParams(location.search).get('initial_lon');

  useEffect(() => {
    if (initialLat != null && initialLon != null) {
      const lat = Number.parseFloat(initialLat);
      const lon = Number.parseFloat(initialLon);
      if (map !== null) {
        map.setCenter({lat, lng: lon});
      }
    } else if (userPosition) {
      const lat = userPosition.coords.latitude;
      const lon = userPosition.coords.longitude;
      if (map !== null) {
        map.setCenter({lat, lng: lon});
      }
    }
  }, [userPosition, map, initialLat, initialLon]);

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

  function onReadyClick() {
    if (customerCreationState.creation == null) {
      return;
    }
    if (
      !selectedPlaceState.isFetching &&
      !selectedPlaceState.hasError &&
      selectedPlaceState.place
    ) {
      createUser({
        variables: {
          input: {
            name: customerCreationState.creation.name,
            lastName: customerCreationState.creation.lastName,
            phone: customerCreationState.creation.phoneNumber,
            address: {
              latitude: selectedPlaceState.place.geometry.location.lat,
              longitude: selectedPlaceState.place.geometry.location.lng,
              streetLine: selectedPlaceState.place.formatted_address,
            },
          },
        },
      });
    }
  }

  function onAutocomplete() {
    history.push({
      pathname: ROUTES.AUTOCOMPLETE_SEARCH,
    });
  }

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
        <LocationOnIcon
          className={classes.locationIcon}
          color="primary"
          fontSize="large"
        />
        <ButtonBase onClick={onAutocomplete} className={classes.buttonToAutocomplete}>
          <Paper className={classes.searchCard} elevation={4}>
            <FlexLayout align="center">
              <SearchIcon className={classes.searchIcon} />
              <Typography variant="body2">Busca un lugar...</Typography>
            </FlexLayout>
          </Paper>
        </ButtonBase>
        <Button
          className={classes.buttonReady}
          isDisabled={loadingCreation}
          isLoading={loadingCreation}
          isLabelHidden={loadingCreation}
          onClick={onReadyClick}
        >
          Continuar
        </Button>
      </div>
    </FlexLayout>
  );
}
