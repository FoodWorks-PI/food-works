// @flow strict

import type {Node} from 'react';

import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {Paper, Typography} from '@material-ui/core';
import FlexLayout from 'components/shared/FlexLayout.react';

const useStyles = makeStyles({
  root: {
    width: '80%',
    height: '150px',
    margin: '0 auto',
    perspective: '1000px',
  },
  content: {
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transition: 'all .7s linear',
  },
  cardSide: {
    color: 'white !important',
    padding: '10px',
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#8BC6EC',
    backfaceVisibility: 'hidden',
    backgroundImage: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)',
  },
  backCard: {
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
    backgroundImage: 'linear-gradient(135deg, #9599E2 0%, #8BC6EC 100%)',
    zIndex: 2,
  },
  fullRow: {
    width: '100%',
  },
  cardNumber: {
    width: '100%',
    flexGrow: '3',
  },
  rotation: {
    transform: 'rotateY(180deg)',
  },
  revertRotation: {
    transform: 'rotateY(0deg)',
  },
  flipFront: {
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 1s ease-in, visibility .75s linear',
  },
  revertFlip: {
    opacity: 1,
    visibility: 'visible',
    transition: 'opacity 1s ease-in, visibility .75s linear',
  },
});

type Props = {
  cardData: {
    number: string,
    name: string,
    expires: string,
    code: string,
  },
};

function CardPreview({cardData}: Props): Node {
  const classes = useStyles();
  const [isFlipped, setFlip] = useState<boolean>(true);

  function flipCard() {
    if (!isFlipped) {
      setFlip(true);
    } else {
      setFlip(false);
    }
  }

  return (
    <div className={classes.root} onClick={flipCard}>
      <div
        className={clsx(
          classes.content,
          !isFlipped && classes.rotation,
          isFlipped && classes.revertRotation,
        )}
      >
        <Paper
          className={clsx(
            classes.cardSide,
            classes.fullRow,
            !isFlipped && classes.flipFront,
            isFlipped && classes.revertFlip,
          )}
          elevation={3}
        >
          <FlexLayout direction="vertical">
            <FlexLayout className={classes.fullRow}>
              <Typography variant="body1">FOODWORKS</Typography>
            </FlexLayout>
            <FlexLayout
              className={classes.cardNumber}
              direction="vertical"
              justify="center"
            >
              <Typography variant="caption">NUMERO DE TARJETA</Typography>
              <Typography variant="subtitle2">{cardData.number}</Typography>
            </FlexLayout>
            <FlexLayout direction="vertical" className={classes.fullRow}>
              <Typography variant="caption">VENCE</Typography>
              <Typography variant="subtitle2">{cardData.expires}</Typography>
            </FlexLayout>
          </FlexLayout>
        </Paper>
        <Paper
          className={clsx(classes.backCard, classes.fullRow, classes.cardSide)}
          elevation={3}
        >
          <FlexLayout direction="vertical" className={classes.content}>
            <FlexLayout className={classes.fullRow}>
              <Typography variant="body1">FOODWORKS</Typography>
            </FlexLayout>
            <FlexLayout
              className={classes.cardNumber}
              direction="vertical"
              justify="center"
            >
              <Typography variant="caption">NOMBRE </Typography>
              <Typography variant="subtitle2">{cardData.name}</Typography>
            </FlexLayout>
            <FlexLayout direction="vertical" className={classes.fullRow}>
              <Typography variant="caption">CODIGO</Typography>
              <Typography variant="subtitle2">{cardData.code}</Typography>
            </FlexLayout>
          </FlexLayout>
        </Paper>
      </div>
    </div>
  );
}

export default CardPreview;
