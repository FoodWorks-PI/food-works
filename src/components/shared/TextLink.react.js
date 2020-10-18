// @flow strict

import React from 'react';
import type {Node} from 'react';

import {Link as RouterLink} from 'react-router-dom';
import {Link} from '@material-ui/core';

type Props = {
  children: Node,
  className?: string,
  to: string,
};

function TextLink(props: Props): Node {
  return (
    <Link
      className={props.className}
      to={props.to}
      color="primary"
      underline="none"
      component={RouterLink}
    >
      {props.children}
    </Link>
  );
}

export default TextLink;
