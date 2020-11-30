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
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ButtonBase from '@material-ui/core/ButtonBase';
import {useHistory} from 'react-router-dom';

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
    let productImage = nullthrows(props.product.image);
    productImage = productImage !== '' ? productImage : donuts;
    return {
      width: '100%',
      height: 96,
      objectFit: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '100%',
      backgroundImage: `url(${productImage})`,
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
  const history = useHistory();

  let restaurantLogo = nullthrows(product.restaurant?.image);
  restaurantLogo = restaurantLogo !== '' ? restaurantLogo : dLogo;

  function onClick() {
    history.push(`/customer/protected/products/${product.ID}`);
  }

  return (
    <ButtonBase className={classes.root} onClick={onClick}>
      <Paper elevation={3}>
        <FlexLayout direction="vertical" justify="center">
          <FlexLayout className={classes.img} direction="vertical">
            <div className={classes.imageOpacity} />
          </FlexLayout>
          <FlexLayout className={classes.titleRow} align="center">
            <div className={classes.logo}>
              <RoundedImage source={restaurantLogo} size="small" />
            </div>
            <Typography variant="body1" className={classes.title}>
              {nullthrows(product.name)}
            </Typography>
          </FlexLayout>
          <FlexLayout align="center" justify="between" className={classes.fullRow}>
            <FlexLayout align="center">
              <LocationOnOutlined style={{fontSize: 20}} className={classes.icon} />
              <Typography variant="subtitle2" style={{marginRight: 4}}>{`${nullthrows(
                product.distance?.toFixed(2),
              )} km`}</Typography>
              <StarBorderIcon style={{fontSize: 20}} className={classes.icon} />
              <Typography variant="subtitle2">
                {nullthrows(product.averageRating?.toFixed(2))}
              </Typography>
            </FlexLayout>
            <Typography variant="body1" color="primary" align="right">
              ${nullthrows(product.cost)}
            </Typography>
          </FlexLayout>
        </FlexLayout>
      </Paper>
    </ButtonBase>
  );
}
