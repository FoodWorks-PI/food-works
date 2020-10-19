// @flow strict

import React from 'react';
import type {Node} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: (props) => ({
    background: 'none',
    backgroundColor: props.isDisabled ? '#99b9ef' : '#7ea8ef',
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
      backgroundColor: !props.isDisabled ? '#6b9cef' : '#99b9ef',
    },
  }),
  content: (props) => ({
    opacity: props.isLoading ? 0 : 1,
  }),
});

type Props = $ReadOnly<{
  onClick?: ?(e: SyntheticMouseEvent<>) => mixed,
  children: Node,
  className?: ?string,
  isLabelHidden?: boolean,
  isDisabled?: boolean,
  isLoading?: boolean,
}>;

function Button({
  onClick,
  children,
  className,
  isDisabled = false,
  isLabelHidden = false,
  isLoading = false,
}: Props): Node {
  const classes = useStyles({isDisabled, isLoading});

  return (
    <div
      className={clsx(classes.root, className)}
      onClick={!isDisabled ? onClick : undefined}
      role="button"
    >
      {isLabelHidden ? '\u200B' : <span className={classes.content}>{children}</span>}
      {isLoading && <CircularProgress size={16} />}
    </div>
  );
}

export default Button;
