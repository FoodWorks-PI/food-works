// @flow strict

import type {Node} from 'react';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

import {Avatar} from '@material-ui/core';

type Size = 'small' | 'medium ' | 'large';

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  medium: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

type Props = {
  source: string,
  size?: Size,
  className?: ?string,
};

function RoundedImage({source, size = 'medium', className}: Props): Node {
  const classes = useStyles();

  return (
    <Avatar
      src={source}
      className={clsx(className, {
        [classes.large]: size === 'large',
        [classes.medium]: size === 'medium',
        [classes.small]: size === 'small',
      })}
    />
  );
}

export default RoundedImage;
