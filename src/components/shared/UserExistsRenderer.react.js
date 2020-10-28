// @flow strict
import * as React from 'react';
import {useHistory} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';

import * as ROUTES from 'constants/Routes';

type Props = $ReadOnly<{
  children: React.Node,
  fallback: React.Node,
}>;

const GET_CURRENT_CUSTOMER = gql`
  query GetCurrentCustomer {
    ID
  }
`;

// To be used under /customer/protected/
export default function UserExistsRenderer({children, fallback}: Props): React.Node {
  const history = useHistory();
  const {loading, error} = useQuery(GET_CURRENT_CUSTOMER);

  if (loading) {
    return fallback;
  }

  if (error) {
    history.replace(ROUTES.CREATE_ONE);
    return <div />;
  }

  return children;
}
