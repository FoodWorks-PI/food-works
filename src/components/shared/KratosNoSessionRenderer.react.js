// @flow strict
import * as React from 'react';
import {Redirect} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';

import * as ROUTES from 'constants/Routes';

type Props = $ReadOnly<{
  children: React.Node,
  fallback: React.Node,
}>;

const GET_CURRENT_CUSTOMER = gql`
  query GetCurrentCustomer {
    getCurrentCustomer {
      ID
    }
  }
`;

// To be used under ROUTES.PROTECTED_ROOT
export default function UserExistsRenderer({children, fallback}: Props): React.Node {
  const {loading, error} = useQuery(GET_CURRENT_CUSTOMER);

  if (loading) {
    return fallback;
  }

  if (error) {
    return <Redirect to={ROUTES.CREATE_ONE} />;
  }

  return children;
}
