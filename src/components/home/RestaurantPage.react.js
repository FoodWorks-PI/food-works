// @flow strict

import type {Node} from 'react';

import React from 'react';
import {useHistory} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import {Typography, Paper, IconButton, Chip, List, ListItem} from '@material-ui/core';
import {ArrowBack, LocationOnOutlined, PhoneAndroidOutlined} from '@material-ui/icons';

import FlexLayout from 'components/shared/FlexLayout.react';

import donuts from 'assets/donuts.jpg';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100vh',
    overflowY: 'scroll',
  },
  img: ({restaurant}) => ({
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundImage: `url(${restaurant.img})`,
  }),
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
});

const restaurant = {
  name: 'Donas Pedro',
  img: donuts,
  tags: ['dessert', 'donuts', 'cakes'],
  description: 'Donas de muchos sabores y más postres',
  address: 'Lomas de los Perros #13',
  phone: '12345678',
  products: [
    {
      id: 0,
      name: 'ITEM',
      description:
        'Deliciosas donas de chocolate hechas con la receta especial de Dunkin’ Donuts',
      active: true,
      cost: 50.0,
      img: donuts,
    },
    {
      id: 1,
      name: 'ITEM2',
      description: 'Donas de chocolate',
      active: true,
      cost: 48.0,
      img: donuts,
    },
    {
      id: 2,
      name: 'ITEM3',
      description: 'Donas de chocolate',
      active: true,
      cost: 75.0,
      img: donuts,
    },
    {
      id: 3,
      name: 'ITEM3',
      description: 'Donas de chocolate',
      active: true,
      cost: 75.0,
      img: donuts,
    },
    {
      id: 4,
      name: 'ITEM3',
      description: 'Donas de chocolate',
      active: true,
      cost: 75.0,
      img: donuts,
    },
  ],
};

function RestaurantPage(): Node {
  const classes = useStyles({restaurant});
  const history = useHistory();

  function goBack() {
    history.goBack();
  }
  function truncateText(text: string): string {
    if (text.length >= 55) {
      return text.substring(0, 50) + '...';
    } else {
      return text;
    }
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
              onClick={goBack}
            >
              <ArrowBack />
            </IconButton>
          </FlexLayout>
          <FlexLayout className={classes.titleRow} justify="between">
            <Typography variant="h5" className={classes.title}>
              {restaurant.name}
            </Typography>
          </FlexLayout>
        </FlexLayout>
        <FlexLayout direction="vertical" wrap="wrap" className={classes.headerBox}>
          <Typography variant="body1" gutterBottom>
            {restaurant.description}
          </Typography>
          <FlexLayout>
            <LocationOnOutlined className={classes.icon} />
            <Typography variant="subtitle2" gutterBottom>
              {restaurant.address}
            </Typography>
          </FlexLayout>
          <FlexLayout>
            <PhoneAndroidOutlined className={classes.icon} />
            <Typography variant="subtitle2" gutterBottom>
              {restaurant.phone}
            </Typography>
          </FlexLayout>
          <FlexLayout className={classes.chipRow}>
            {restaurant.tags.map((tag, ndx) => (
              <Chip
                key={ndx}
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
        {restaurant.products.map((product) => (
          <ListItem key={product.id}>
            <FlexLayout align="center">
              <FlexLayout direction="vertical" className={classes.productContent}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">
                  {truncateText(product.description)}
                </Typography>
                <Typography variant="subtitle2">
                  <strong>${product.cost}</strong>
                </Typography>
              </FlexLayout>
              <FlexLayout className={classes.productImgContainer} direction="vertical">
                <img
                  src={product.img}
                  alt={product.name}
                  className={classes.productImg}
                />
              </FlexLayout>
            </FlexLayout>
          </ListItem>
        ))}
      </List>
    </FlexLayout>
  );
}

export default RestaurantPage;
