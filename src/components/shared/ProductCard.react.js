// @flow strict

import type {Product} from 'constants/FeedTypes';

import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import FlexLayout from 'components/shared/FlexLayout.react';
import {Typography, Paper} from '@material-ui/core';
import {LocationOnOutlined} from '@material-ui/icons';
import RoundedImage from './RoundedImage.react';
import nullthrows from 'utils/nullthrows';
import donuts from 'assets/donuts.jpg';
import dLogo from 'assets/ddlogo.jpg';

const useStyles = makeStyles({
  root: {
    minWidth: 256,
    marginLeft: 8,
    marginRight: 8,
  },
  img: (props: Props) => {
    let restaurantImage = nullthrows(props.product.restaurant?.image);
    restaurantImage = restaurantImage !== '' ? restaurantImage : donuts;
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
  content: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
  },
  fullRow: {
    width: '100%',
    padding: 4,
  },
  chipRow: {
    width: '100%',
    padding: 2,
  },
  titleRow: {
    width: '100%',
    padding: 4,
  },
  icon: {
    marginRight: 4,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  title: {
    fontWeight: 500,
    maxWidth: '75%',
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
});

type Props = {
  product: Product,
};

export default function ProductCard({product}: Props): React.Node {
  const classes = useStyles({product});
  let logo = nullthrows(product.image);
  logo = logo !== '' ? logo : dLogo;

  return (
    <Paper elevation={3} className={classes.root}>
      <FlexLayout direction="vertical" justify="center">
        <FlexLayout className={classes.img} direction="vertical">
          <div className={classes.imageOpacity} />
        </FlexLayout>
        <FlexLayout className={classes.titleRow} align="center">
          <div className={classes.logo}>
            <RoundedImage source={logo} size="small" />
          </div>
          <Typography variant="body1" className={classes.title}>
            {nullthrows(product.name)}
          </Typography>
        </FlexLayout>
        <FlexLayout align="center" justify="between" className={classes.fullRow}>
          <FlexLayout>
            <LocationOnOutlined style={{fontSize: 20}} className={classes.icon} />
            <Typography variant="subtitle2">{nullthrows(product.distance)}</Typography>
          </FlexLayout>
          <Typography variant="body1" color="primary" align="right">
            ${nullthrows(product.cost)}
          </Typography>
        </FlexLayout>
      </FlexLayout>
    </Paper>
  );
}
