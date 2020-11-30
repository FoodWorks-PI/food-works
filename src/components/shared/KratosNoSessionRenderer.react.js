// @flow strict

import * as React from 'react';
import {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {kratos} from 'services/Kratos';
import * as ROUTES from 'constants/Routes';

type Props = $ReadOnly<{
  children: React.Node,
  fallback: React.Node,
}>;

type State = {
  loading: boolean,
  hasError: boolean,
};

export default function KratosNoSessionRenderer({
  children,
  fallback,
}: Props): React.Node {
  const [state, setState] = useState<State>({loading: true, hasError: false});

  useEffect(() => {
    async function checkSession() {
      try {
        await kratos.whoami();
        setState({loading: false, hasError: false});
      } catch {
        setState({loading: false, hasError: true});
      }
    }

    checkSession();
  }, [setState]);

  if (state.loading) {
    return fallback;
  }

  if (!state.loading && !state.hasError) {
    return <Redirect to={ROUTES.PROTECTED_ROOT} />;
  }

  return children;
}
