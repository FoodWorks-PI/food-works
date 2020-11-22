// @flow strict

import type {Node} from 'react';

import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Typography, Paper, Chip, IconButton} from '@material-ui/core';
import {Schedule, ArrowBack} from '@material-ui/icons';
import {useHistory} from 'react-router-dom';

import FlexLayout from 'components/shared/FlexLayout.react';
import RoundedImage from 'components/shared/RoundedImage.react';
import Button from 'components/shared/Button.react';
import ReservationDialog from 'components/home/ReservationDialog.react';

import donuts from 'assets/donuts.jpg';
import dLogo from 'assets/ddlogo.jpg';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#EEEEEE',
    overflowY: 'scroll',
    whiteSpace: 'nowrap',
  },
  img: (props) => ({
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundImage: `url(${props.product.img})`,
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
  logo: {
    margin: '0 0 -10px 8px',
    alignSelf: 'flex-end',
  },
  icon: {
    margin: '0 3px 0 0',
  },
  headerBox: {
    marginTop: 5,
    padding: 8,
  },
  contentBox: {
    width: '100%',
    margin: '15px 0',
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
  button: {
    margin: '0 5px',
  },
  bottomBox: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: '10%',
    display: 'flex',
  },
  buyButton: {
    width: '65%',
  },
});

const product = {
  id: 2,
  restaurant: 'DOnas de Pedro',
  time: '10:00 a 12:00',
  description: 'Ricas donas de diferentes sabores',
  tags: ['dessert', 'donuts', 'cakes'],
  cost: 75.0,
  img: donuts,
  logo: dLogo,
  name: 'Donas Surtidas',
  address: 'Lomas del Perro #13',
};

function ProductPage(): Node {
  const classes = useStyles({product});
  const [open, setOpen] = useState(false);
  const history = useHistory();

  function openDialog() {
    setOpen(true);
  }
  function closeDialog() {
    setOpen(false);
  }
  function goBack() {
    history.goBack();
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
            <RoundedImage source={product.logo} className={classes.logo} />
            <Typography variant="h5" className={classes.title}>
              {product.name}
            </Typography>
          </FlexLayout>
        </FlexLayout>
        <FlexLayout direction="vertical" className={classes.headerBox}>
          <Typography variant="body2" gutterBottom>
            {product.restaurant}
          </Typography>
          <FlexLayout align="center" justify="between" className={classes.fullWidth}>
            <FlexLayout align="center">
              <Schedule style={{fontSize: 19}} className={classes.icon} />
              <Typography variant="body2">{product.time}</Typography>
            </FlexLayout>
            <Typography variant="body2" color="secondary">
              <strong>${product.cost}</strong>
            </Typography>
          </FlexLayout>
        </FlexLayout>
      </Paper>
      <Paper elevation={3} square className={classes.contentBox}>
        <FlexLayout direction="vertical">
          <Typography variant="body2">
            <strong>Descripción</strong>
          </Typography>
          <Typography variant="body2">{product.description}</Typography>
          <FlexLayout className={classes.chipRow}>
            {product.tags.map((tag, ndx) => (
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
      <Paper elevation={3} square className={classes.contentBox}>
        <FlexLayout direction="vertical">
          <Typography variant="body2">
            <strong>Recoger en</strong>
          </Typography>
          <Typography variant="body2" gutterBottom>
            {product.address}
          </Typography>
          <FlexLayout className={classes.fullWidth} align="center" justify="center">
            <Button className={classes.button}>Ver Restaurante</Button>
            <Button className={classes.button}>Ver en Mapa</Button>
          </FlexLayout>
        </FlexLayout>
      </Paper>
      <Paper elevation={3} square className={classes.bottomBox}>
        <FlexLayout
          className={classes.fullWidth}
          align="center"
          justify="center"
          direction="vertical"
        >
          <Button className={classes.buyButton} onClick={openDialog}>
            COMPRAR
          </Button>
        </FlexLayout>
      </Paper>
      <ReservationDialog open={open} closeDialog={closeDialog} />
    </FlexLayout>
  );
}

export default ProductPage;
