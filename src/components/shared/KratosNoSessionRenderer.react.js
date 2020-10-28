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

export default function KratosNoSessionRenderer({
  children,
  fallback,
}: Props): React.Node {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [receivedAt, setReceivedAt] = useState<?number>(null);

  useEffect(() => {
    async function checkSession() {
      try {
        await kratos.whoami();
        setLoading(false);
        setReceivedAt(Date.now());
      } catch {
        setLoading(false);
        setHasError(true);
        setReceivedAt(Date.now());
      }
    }

    checkSession();
  }, [setHasError, setLoading, setReceivedAt]);

  if (loading) {
    return fallback;
  }

  if (!loading && !hasError && receivedAt !== null) {
    return <Redirect to={ROUTES.PROTECTED_ROOT} />;
  }

  return children;
}
