// @flow strict

import type {Node} from 'react';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FlexLayout from 'components/shared/FlexLayout.react';
import {Typography} from '@material-ui/core';
import {Place} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    backgroundColor: theme.palette.primary.main,
    position: 'fixed',
    top: 0,
    maxHeight: '10%',
    color: 'white',
    zIndex: 99,
  },
}));

type Props = {
  children: Node,
};

function TopBar(props: Props): Node {
  const classes = useStyles();

  return (
    <FlexLayout
      direction="vertical"
      align="center"
      justify="center"
      className={classes.root}
    >
      <FlexLayout align="center">
        <Place />
        <Typography variant="h6" align="center">
          {props.children}
        </Typography>
      </FlexLayout>
      <Typography variant="caption" align="center">
        Dentro de 2km
      </Typography>
    </FlexLayout>
  );
}

export default TopBar;
