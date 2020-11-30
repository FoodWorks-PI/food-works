// @flow strict

import {ApolloClient, InMemoryCache} from '@apollo/client';
import BASE_URL from '../services/config';

export const client = new ApolloClient({
  uri: `${BASE_URL}/api/graphql`,
  cache: new InMemoryCache(),
});
