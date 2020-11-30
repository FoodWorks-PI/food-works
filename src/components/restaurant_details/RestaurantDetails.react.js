// @flow strict

import type {Restaurant} from 'constants/FeedTypes';

import * as React from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {Typography, Paper, IconButton, Chip, List, ListItem} from '@material-ui/core';
import {ArrowBack, LocationOnOutlined, PhoneAndroidOutlined} from '@material-ui/icons';
import ButtonBase from '@material-ui/core/ButtonBase';
import FlexLayout from 'components/shared/FlexLayout.react';
import nullthrows from 'utils/nullthrows';
import {BASE_MEDIA_URL} from 'services/config';
import donuts from 'assets/donuts.jpg';
import dLogo from 'assets/ddlogo.jpg';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100vh',
    overflowY: 'scroll',
  },
  img: ({restaurant}: Props) => {
    let restaurantImage = nullthrows(restaurant.image);
    restaurantImage =
      restaurantImage !== '' ? `${BASE_MEDIA_URL}/${restaurantImage}` : dLogo;
    return {
      width: '100%',
      height: 160,
      objectFit: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '100%',
      backgroundImage: `url(${restaurantImage})`,
    };
  },
  fullWidth: {
    width: '100%',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    padding: '0 3px 0 0',
  },
  titleRow: {
    width: '100%',
    flexGrow: 2,
  },
  headerBox: {
    width: '100%',
    marginTop: 5,
    padding: 8,
  },
  chip: {
    color: 'white',
    marginRight: 5,
  },
  chipRow: {
    width: '100%',
    margin: '8px 0',
  },
  icon: {
    margin: '0 3px 0 0',
    fontSize: 19,
  },
  productImgContainer: {
    flex: '0 0 25.000%',
  },
  productImg: {
    objectFit: 'cover',
    width: '100%',
    height: 75,
  },
  productContent: {
    flex: '0 0 75.000%',
  },
  productRoot: {
    width: '100%',
  },
});

function truncateText(text: string): string {
  if (text.length >= 55) {
    return text.substring(0, 50) + '...';
  } else {
    return text;
  }
}

type Props = {
  restaurant: Restaurant,
};

export default function RestaurantDetails({restaurant}: Props): React.Node {
  const classes = useStyles({restaurant});
  const history = useHistory();

  function onProductClick(id) {
    history.push(`/customer/protected/products/${id}`);
  }

  return (
    <FlexLayout direction="vertical" className={classes.root}>
      <Paper elevation={3} className={classes.fullWidth} square>
        <FlexLayout className={classes.img} direction="vertical">
          <FlexLayout className={classes.fullWidth}>
            <IconButton
              aria-label="back"
              style={{color: 'white'}}
              size="medium"
              onClick={history.goBack}
            >
              <ArrowBack />
            </IconButton>
          </FlexLayout>
          <FlexLayout className={classes.titleRow} justify="between">
            <Typography variant="h5" className={classes.title}>
              {nullthrows(restaurant.name)}
            </Typography>
          </FlexLayout>
        </FlexLayout>
        <FlexLayout direction="vertical" wrap="wrap" className={classes.headerBox}>
          <Typography variant="body1" gutterBottom>
            {nullthrows(restaurant.description)}
          </Typography>
          <FlexLayout>
            <LocationOnOutlined className={classes.icon} />
            <Typography variant="subtitle2" gutterBottom>
              {nullthrows(restaurant.address?.streetLine)}
            </Typography>
          </FlexLayout>
          <FlexLayout>
            <PhoneAndroidOutlined className={classes.icon} />
            <Typography variant="subtitle2" gutterBottom>
              {nullthrows(restaurant.restaurantOwner?.phone)}
            </Typography>
          </FlexLayout>
          <FlexLayout className={classes.chipRow}>
            {nullthrows(restaurant.tags).map((tag) => (
              <Chip
                key={tag}
                size="small"
                color="primary"
                clickable={false}
                label={tag}
                className={classes.chip}
              />
            ))}
          </FlexLayout>
        </FlexLayout>
      </Paper>
      <List className={classes.fullWidth}>
        {nullthrows(restaurant.products).map((product) => {
          let productImage = nullthrows(product.image);
          productImage =
            productImage !== '' ? `${BASE_MEDIA_URL}/${productImage}` : donuts;
          return (
            <ListItem key={product.ID}>
              <ButtonBase onClick={() => onProductClick(product.ID)}>
                <FlexLayout className={classes.productRoot} align="center">
                  <FlexLayout direction="vertical" className={classes.productContent}>
                    <Typography variant="h6">{nullthrows(product.name)}</Typography>
                    <Typography variant="body2">
                      {truncateText(nullthrows(product.description))}
                    </Typography>
                    <Typography variant="subtitle2">
                      <strong>${nullthrows(product.cost)}</strong>
                    </Typography>
                  </FlexLayout>
                  <FlexLayout
                    className={classes.productImgContainer}
                    direction="vertical"
                  >
                    <img
                      src={productImage}
                      alt={nullthrows(product.name)}
                      className={classes.productImg}
                    />
                  </FlexLayout>
                </FlexLayout>
              </ButtonBase>
            </ListItem>
          );
        })}
      </List>
    </FlexLayout>
  );
}
