// @flow

import type {CustomerCreation} from 'constants/CustomerCreationTypes';

import * as React from 'react';
import {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from 'components/shared/Button.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import TextInput from 'components/shared/TextInput.react';
import validator from 'validator';
import {useDispatch} from 'stores/hooks/CustomerStoreHooks';
import {setUserData} from 'actions/CustomerCreationActions';
import {useHistory} from 'react-router-dom';
import * as ROUTES from 'constants/Routes';

const useStyles = makeStyles({
  root: {
    padding: 32,
  },
  button: {
    width: '100%',
    marginTop: 12,
  },
  title: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  subtitle: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  field: {
    marginBottom: 12,
  },
  form: {
    width: '100%',
  },
});

export default function UserNameStep(): React.Node {
  const history = useHistory();
  const dispatch = useDispatch();
  const [fields, setFields] = useState<CustomerCreation>({
    name: '',
    lastName: '',
    phoneNumber: '',
  });
  const [fieldErrors, setFieldErrors] = useState<{[$Keys<CustomerCreation>]: ?string}>({
    name: null,
    lastName: null,
    phoneNumber: null,
  });
  const classes = useStyles();
  function handleSubmit(e) {
    e.preventDefault();
    let errors: {[$Keys<CustomerCreation>]: ?string} = {
      name: null,
      lastName: null,
      phoneNumber: null,
    };
    // Very simple validation, might be worth to extract this later
    if (validator.isEmpty(fields.name)) {
      errors = {...errors, name: 'Llenar nombre'};
    }

    if (validator.isEmpty(fields.lastName)) {
      errors = {...errors, lastName: 'Llenar apellido'};
    }

    if (validator.isEmpty(fields.phoneNumber)) {
      errors = {...errors, phoneNumber: 'Llenar número'};
    }

    setFieldErrors(errors);

    const noNullErrors = Object.keys(errors).reduce(
      (acc: {[$Keys<CustomerCreation>]: ?string}, current: $Keys<CustomerCreation>) => {
        if (errors[current] == null) {
          return acc;
        }
        acc[current] = errors[current];
        return acc;
      },
      {},
    );

    if (Object.keys(noNullErrors).length !== 0) {
      return;
    }

    dispatch(setUserData(fields));
    history.push({
      pathname: ROUTES.CREATE_TWO,
    });
  }

  return (
    <FlexLayout className={classes.root} direction="vertical">
      <Typography className={classes.title} color="primary" variant="h4" align="center">
        FOOD WORKS
      </Typography>
      <Typography className={classes.subtitle} variant="h6" align="center">
        Datos de usuario
      </Typography>
      <form className={classes.form} method="POST" onSubmit={handleSubmit}>
        <TextInput
          className={classes.field}
          label="Nombre"
          placeholder="Nombres"
          value={fields.name}
          errorMessage={fieldErrors.name}
          onChange={(e) => setFields({...fields, name: e.target.value})}
        />
        <TextInput
          className={classes.field}
          label="Apellido"
          placeholder="Apellidos"
          value={fields.lastName}
          errorMessage={fieldErrors.lastName}
          onChange={(e) => setFields({...fields, lastName: e.target.value})}
        />
        <TextInput
          className={classes.field}
          label="Teléfono"
          placeholder="10 digitos"
          type="tel"
          value={fields.phoneNumber}
          errorMessage={fieldErrors.phoneNumber}
          onChange={(e) => setFields({...fields, phoneNumber: e.target.value})}
        />
        <Button className={classes.button} type="submit">
          Continuar
        </Button>
      </form>
    </FlexLayout>
  );
}
