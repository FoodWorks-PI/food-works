// @flow strict

import * as React from 'react';
import {gql, useQuery} from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import {useParams} from 'react-router-dom';
import ProductDetails from 'components/product_details/ProductDetails.react';

const GET_PRODUCT = gql`
  query GetProduct($input: ID!) {
    getProductById(input: $input) {
      ID
      name
      description
      tags
      cost
      averageRating
      image
      distance
      restaurant {
        ID
        name
        address {
          streetLine
          latitude
          longitude
        }
        image
      }
    }
  }
`;

function ProductPage(): React.Node {
  const params = useParams();
  const {data, loading, error} = useQuery(GET_PRODUCT, {
    variables: {
      input: params.id,
    },
  });

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!loading && error != null) {
    return <Typography>Error...</Typography>;
  }

  return <ProductDetails product={data.getProductById} />;
}

export default ProductPage;
