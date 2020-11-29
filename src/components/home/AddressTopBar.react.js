// @flow strict

import * as React from 'react';
import {useCallback, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';
import FlexLayout from 'components/shared/FlexLayout.react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ButtonBase from '@material-ui/core/ButtonBase';
import {useHistory} from 'react-router-dom';
import * as ROUTES from 'constants/Routes';
import queryString from 'query-string';
import {gql, useQuery} from '@apollo/client';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    paddingTop: 4,
    paddingBottom: 4,
  },
  address: {
    color: theme.palette.common.white,
    width: '100%',
  },
  addressIcon: {
    marginRight: theme.spacing(1),
  },
  addressText: {
    width: 196,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 600,
  },
}));

const GET_CURRENT_CUSTOMER_ADDRESS = gql`
  query GetCurrentCustomer {
    getCurrentCustomer {
      address {
        streetLine
        latitude
        longitude
      }
    }
  }
`;

export default function AddressTopBar(): React.Node {
  const classes = useStyles();
  const history = useHistory();
  const {data, loading, error, refetch} = useQuery(GET_CURRENT_CUSTOMER_ADDRESS);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const onLocationClick = useCallback(() => {
    if (data != null) {
      history.push({
        pathname: ROUTES.PROTECTED_ADDRESS_UPDATE,
        search: queryString.stringify({
          initial_lat: data.getCurrentCustomer.address.latitude,
          initial_lon: data.getCurrentCustomer.address.longitude,
        }),
      });
    }
  }, [history, data]);

  let content: React.Node;

  if (!loading && data != null) {
    content = (
      <ButtonBase className={classes.button} onClick={onLocationClick}>
        <FlexLayout className={classes.address} align="center" justify="center">
          <LocationOnIcon className={classes.addressIcon} />
          <Typography
            variant="body2"
            align="center"
            color="inherit"
            className={classes.addressText}
          >
            {data.getCurrentCustomer.address.streetLine}
          </Typography>
        </FlexLayout>
      </ButtonBase>
    );
  } else if (!loading && error != null) {
    content = <Typography variant="body2">Error...</Typography>;
  } else {
    content = <Typography variant="body2">Loading...</Typography>;
  }

  return (
    <AppBar position="fixed">
      <Toolbar>{content}</Toolbar>
    </AppBar>
  );
}
