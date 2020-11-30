// @flow strict

import * as React from 'react';
import {gql, useQuery} from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import {useParams} from 'react-router-dom';
import RestaurantDetails from 'components/restaurant_details/RestaurantDetails.react';

const GET_RESTAURANT = gql`
  query GetProduct($input: ID!) {
    getRestaurantByID(input: $input) {
      ID
      name
      description
      address {
        streetLine
        latitude
        longitude
      }
      tags
      products {
        ID
        name
        image
        description
        cost
      }
      image
      distance
      restaurantOwner {
        phone
      }
    }
  }
`;

function RestaurantPage(): React.Node {
  const params = useParams();
  const {data, loading, error} = useQuery(GET_RESTAURANT, {
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

  return <RestaurantDetails restaurant={data.getRestaurantByID} />;
}

export default RestaurantPage;
