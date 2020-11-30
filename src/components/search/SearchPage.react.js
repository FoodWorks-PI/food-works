// @flow strict

import * as React from 'react';
import {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Fastfood from '@material-ui/icons/Fastfood';
import Paper from '@material-ui/core/Paper';

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    overflowY: 'scroll',
    whiteSpace: 'nowrap',
    marginBottom: theme.mixins.toolbar.minHeight,
  },
  searchRow: {
    width: '100%',
    position: 'fixed',
    padding: 16,
    zIndex: theme.zIndex.appBar,
  },
  container: {
    width: '100%',
    marginTop: 88,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
  },
  initialContainer: {
    width: '100%',
    marginTop: 32,
  },
  icon: {
    fontSize: 64,
  },
  input: {
    marginRight: 8,
  },
}));

function SearchPage(): React.Node {
  const classes = useStyles();
  const [searchString, setString] = useState('');
  const [searchGlobal, {data, loading, error}] = useLazyQuery(SEARCH_GLOBAL);

  function handleChange(e: SyntheticInputEvent<>) {
    const value: string = e.target.value;
    setString(value);
  }

  function getSearch() {
    if (searchString === '') {
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
      <Paper elevation={1} className={classes.searchRow}>
        <FlexLayout align="end">
          <TextInput
            label="Buscar producto o restaurante"
            placeholder="Tacos de canasta"
            value={searchString}
            className={classes.input}
            onChange={handleChange}
          />
          <Button onClick={getSearch}>Buscar</Button>
        </FlexLayout>
      </Paper>
      <div className={classes.container}>
        {!data && !loading && !error && (
          <FlexLayout
            direction="vertical"
            justify="center"
            align="center"
            className={classes.initialContainer}
          >
            <Fastfood className={classes.icon} color="primary" />
            <Typography variant="h5">¿Qué hay para cenar?</Typography>
            <Typography variant="subtitle2">Busca productos y restaurantes</Typography>
          </FlexLayout>
        )}
        {loading && <Typography>Loading...</Typography>}
        {!loading && error && <Typography>Error...</Typography>}
        {data && (
          <>
            <ProductList products={data.searchProductsAndRestaurants.products} />
            <RestaurantList
              restaurants={data.searchProductsAndRestaurants.restaurants}
            />
          </>
        )}
      </div>
    </FlexLayout>
  );
}

export default SearchPage;
