// @flow strict

import type {Node} from 'react';
import type {Product, Restaurant} from 'constants/FeedTypes';

import React, {useState} from 'react';
import {List, Typography, ListItem, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Fastfood} from '@material-ui/icons';

import FlexLayout from 'components/shared/FlexLayout.react';
import TextInput from 'components/shared/TextInput.react';
import Button from 'components/shared/Button.react';
import ProductList from 'components/search/SearchProductsList.react';
import RestaurantList from 'components/search/SearchRestaurantsList.react';

import {gql, useLazyQuery} from '@apollo/client';

const SEARCH_GLOBAL = gql`
  query search($input: ProductsByAllFieldsInput!) {
    searchProductsAndRestaurants(input: $input) {
      restaurants {
        ID
        name
        description
      }
      products {
        ID
        cost
        name
      }
    }
  }
`;

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowY: 'scroll',
    whiteSpace: 'nowrap',
    padding: '8px',
    marginTop: '10%',
    marginBottom: '15%',
  },
  searchRow: {
    width: '100%',
  },
  initialCntainer: {
    width: '100%',
    height: '50vh',
  },
  icon: {
    fontSize: 64,
  },
});

function SearchPage(): Node {
  const classes = useStyles();
  const [searchString, setString] = useState('');
  const [searchGlobal, {data, loading, error}] = useLazyQuery(SEARCH_GLOBAL);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  if (!loading && error != null) {
    console.log(error);
    return <Typography>Error...</Typography>;
  }

  function handleChange(e: SyntheticInputEvent<>) {
    const value: string = e.target.value;
    setString(value);
  }

  function getSearch() {
    if (searchString === '') {
      window.alert('Escribe Algo');
      return;
    } else {
      searchGlobal({
        variables: {
          input: {
            searchString: searchString,
            productFilterConfig: {
              includeInactive: false,
            },
          },
        },
      });
    }
  }

  return (
    <FlexLayout className={classes.root} direction="vertical">
      <FlexLayout align="end" className={classes.searchRow}>
        <TextInput
          label="Buscar producto o restaurante"
          placeholder={'Tacos de canasta'}
          value={searchString}
          onChange={handleChange}
        />
        <Button onClick={getSearch}>Buscar</Button>
      </FlexLayout>
      {!data && (
        <FlexLayout
          direction="vertical"
          justify="center"
          align="center"
          className={classes.initialCntainer}
        >
          <Fastfood className={classes.icon} color="primary" />
          <Typography variant="h5">¿Qué hay para cenar?</Typography>
          <Typography variant="subtitle2">Busca productos y restaurantes</Typography>
        </FlexLayout>
      )}
      {data && (
        <>
          <ProductList products={data.searchProductsAndRestaurants.products} />
          <RestaurantList restaurants={data.searchProductsAndRestaurants.restaurants} />
        </>
      )}
    </FlexLayout>
  );
}

export default SearchPage;
