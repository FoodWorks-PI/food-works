// @flow strict

import {gql, ApolloClient, InMemoryCache} from '@apollo/client';

export const apiClient = new ApolloClient({
  uri: 'https://127.0.0.1:4455/api/graphql',
  cache: new InMemoryCache(),
});

export const CREATE_USER = gql`
  mutation CreateUser($input: RegisterCustomerInput!) {
    createCustomerProfile(input: $input)
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentCustomer {
      name
      email
      phone
    }
  }
`;
