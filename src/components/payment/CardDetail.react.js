// @flow strict

import type {Node} from 'react';

import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {useHistory, useParams} from 'react-router-dom';
import {ArrowBack} from '@material-ui/icons';
import FlexLayout from 'components/shared/FlexLayout.react';
import {Typography, IconButton} from '@material-ui/core';
import CardPreview from 'components/payment/CardPreview.react';
import TextInput from 'components/shared/TextInput.react';
import Button from 'components/shared/Button.react';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowY: 'scroll',
    whiteSpace: 'nowrap',
    marginBottom: '15%',
    padding: '8px',
  },
  fullWidth: {
    width: '100%',
  },
  title: {
    flexGrow: 3,
  },
  form: {
    width: '100%',
    margin: '10px 0 10px 0',
  },
  input: {
    width: '80%',
    margin: '3px 0 3px 0',
  },
  inputHalf: {
    width: '40%',
    margin: '3px',
  },
  button: {
    width: '80%',
    margin: '15px 0px 10px 0',
  },
});

const cardData = {
  name: 'Juan Perez Perez',
  number: '4512 8569 7845 1235',
  expires: '12/24',
  code: '1234',
};
const emptyData = {
  name: '',
  number: '',
  expires: '',
  code: '',
};

function CardDetail(): Node {
  const history = useHistory();
  const {cardType} = useParams();

  const initialData = cardType === 'add' ? emptyData : cardData;
  const [card, setCard] = useState(initialData);

  const classes = useStyles();

  function goBack() {
    history.goBack();
  }

  function handleChange(e: SyntheticInputEvent<>) {
    const name = e.target.name;
    const value = e.target.value;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  }

  return (
    <FlexLayout direction="vertical" className={classes.root} align="center">
      <FlexLayout justify="center" align="baseline" className={classes.fullWidth}>
        <IconButton aria-label="back" color="primary" size="medium" onClick={goBack}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" gutterBottom align="center" className={classes.title}>
          {card.name ? 'Editar mi tarjeta' : 'Nueva Tarjeta'}
        </Typography>
      </FlexLayout>
      <CardPreview cardData={card} />
      <FlexLayout className={classes.form} direction="vertical" align="center">
        <TextInput
          label="Numero de tarjeta"
          className={classes.input}
          type="password"
          name="number"
          onChange={handleChange}
          value={card.number}
        />
        <TextInput
          label="Nombre en tarjeta"
          className={classes.input}
          name="name"
          onChange={handleChange}
          value={card.name}
        />
        <FlexLayout className={classes.fullWidth} justify="center">
          <TextInput
            label="Vencimiento"
            className={classes.inputHalf}
            name="expires"
            onChange={handleChange}
            value={card.expires}
          />
          <TextInput
            label="Codigo de Seguridad"
            className={classes.inputHalf}
            type="password"
            name="code"
            onChange={handleChange}
            value={card.code}
          />
        </FlexLayout>
      </FlexLayout>
      <Button className={classes.button} onClick={goBack}>
        Guardar cambios
      </Button>
    </FlexLayout>
  );
}

export default CardDetail;
