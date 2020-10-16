// @flow strict

import type {Node} from 'react';

import React from 'react';
import TopBar from 'components/home/TopBar.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import {makeStyles} from '@material-ui/core/styles';
import ProductRow from './ProductRow.react';

import donuts from 'assets/donuts.jpg';
import dLogo from 'assets/ddlogo.jpg';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowY: 'scroll',
    whiteSpace: 'nowrap',
    padding: '8px',
    marginTop: '15%',
    marginBottom: '15%',
  },
});

function HomePage(): Node {
  const classes = useStyles();
  const list = [
    {
      id: 0,
      title: 'ITEM',
      time: '7:00 a 9:00',
      location: '500m',
      price: 50.0,
      img: donuts,
      logo: dLogo,
    },
    {
      id: 1,
      title: 'ITEM2',
      time: '14:00 a 16:00',
      location: '2km',
      price: 48.0,
      img: donuts,
      logo: dLogo,
    },
    {
      id: 2,
      title: 'ITEM3',
      time: '10:00 a 12:00',
      location: '1.5km',
      price: 75.0,
      img: donuts,
      logo: dLogo,
    },
  ];

  return (
    <>
      <TopBar>Mi Dirección</TopBar>
      <FlexLayout direction="vertical" className={classes.root}>
        <ProductRow productList={list}>Recomendado para ti</ProductRow>
        <ProductRow productList={list}>Para más tarde</ProductRow>
        <ProductRow productList={list}>Para mañana</ProductRow>
        <ProductRow productList={list}>Para despues</ProductRow>
      </FlexLayout>
    </>
  );
}

export default HomePage;
