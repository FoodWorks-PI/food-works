// @flow strict

import type {Restaurant} from 'constants/FeedTypes';

import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import FlexLayout from 'components/shared/FlexLayout.react';
import {Typography, Paper} from '@material-ui/core';
import {LocationOnOutlined} from '@material-ui/icons';
import nullthrows from 'utils/nullthrows';
import dLogo from 'assets/ddlogo.jpg';
import ButtonBase from '@material-ui/core/ButtonBase';
import {useHistory} from 'react-router-dom';
import {BASE_MEDIA_URL} from 'services/config';

const useStyles = makeStyles({
  root: {
    minWidth: 256,
    marginLeft: 8,
    marginRight: 8,
    '& > *': {
      width: '100%',
    },
  },
  img: (props: Props) => {
    let restaurantImage = nullthrows(props.restaurant.image);
    restaurantImage =
      restaurantImage !== '' ? `${BASE_MEDIA_URL}/${restaurantImage}` : dLogo;
    return {
      width: '100%',
      height: 96,
      objectFit: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '100%',
      backgroundImage: `url(${restaurantImage})`,
      position: 'relative',
    };
  },
  logo: {
    flex: 1,
  },
  fullRow: {
    width: '100%',
    padding: 4,
  },
  titleRow: {
    width: '100%',
    padding: 4,
  },
  icon: {
    marginRight: 2,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  title: {
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  imageOpacity: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  metrics: {
    padding: 4,
  },
});

type Props = {
  restaurant: Restaurant,
};

export default function RestaurantCard({restaurant}: Props): React.Node {
  const classes = useStyles({restaurant});
  const history = useHistory();

  function onClick() {
    history.push(`/customer/protected/restaurants/${restaurant.ID}`);
  }

  return (
    <ButtonBase className={classes.root} onClick={onClick}>
      <Paper elevation={3}>
        <FlexLayout direction="vertical" justify="center">
          <FlexLayout className={classes.img} direction="vertical">
            <div className={classes.imageOpacity} />
          </FlexLayout>
          <div className={classes.titleRow}>
            <Typography variant="body1" className={classes.title}>
              {nullthrows(restaurant.name)}
            </Typography>
          </div>
          <FlexLayout className={classes.metrics}>
            <LocationOnOutlined style={{fontSize: 20}} className={classes.icon} />
            <Typography variant="subtitle2">{`${nullthrows(
              restaurant.distance?.toFixed(2),
            )} km`}</Typography>
          </FlexLayout>
        </FlexLayout>
      </Paper>
    </ButtonBase>
  );
}
