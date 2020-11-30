// @flow strict

import type {Order} from 'constants/FeedTypes';

import * as React from 'react';
import {useState} from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from 'components/shared/Button.react';
import nullthrows from 'utils/nullthrows';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import TextInput from 'components/shared/TextInput.react';

type Props = {
  order: ?Order,
  open: boolean,
  onClose: () => void,
  onRate: (productId: number, rating: number, comment: string) => void,
};

export default function RatingDialog({open, onClose, order, onRate}: Props): React.Node {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Calificar</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>{order?.product?.name}</Typography>
        <Typography variant="body1" gutterBottom>
          Calificación
        </Typography>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Calificación</Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(_, newValue) => {
              setRating(newValue);
            }}
          />
        </Box>
        <TextInput
          label="Comentario"
          placeholder="Opcional"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
        <Button onClick={() => onRate(nullthrows(order?.product?.ID), rating, comment)}>
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
