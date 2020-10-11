// @flow strict

import React from 'react';
import type {Node} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    background: 'none',
    backgroundColor: '#7ea8ef',
    color: '#fff',
    lineHeight: 1.42858,
    border: 'none',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 8,
    fontWeight: 700,
    fontSize: 14,
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: 'rgb(0,0,0,0.4)',
    '&:active': {
      backgroundColor: '#6b9cef',
    },
  },
});

type Props = $ReadOnly<{
  onClick: (e: SyntheticMouseEvent<>) => mixed,
  children: Node,
  className?: ?string,
}>;

function Button(props: Props): Node {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, props.className)}
      onClick={props.onClick}
      role="button"
    >
      <span>{props.children}</span>
    </div>
  );
}

export default Button;
