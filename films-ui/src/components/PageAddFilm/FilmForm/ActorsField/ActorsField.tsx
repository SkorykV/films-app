import { Button, Chip, makeStyles, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { getValidator } from '../../../../helpers/validation';
import { CreateActorDTO } from '../../../../models/Actor';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& > *': {
      margin: theme.spacing(1, 0),
    },
    alignItems: 'flex-end',
  },
  actorList: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  actorItem: {
    margin: theme.spacing(0.5),
  },
}));

function areEqualActors(
  actorA: CreateActorDTO,
  actorB: CreateActorDTO
): boolean {
  return (
    actorA.firstName === actorB.firstName && actorA.lastName === actorB.lastName
  );
}

interface ActorsFieldParams {
  name: string;
  value: CreateActorDTO[];
  onChange(e: React.ChangeEvent<any>): void;
}

const ActorsField: React.FC<ActorsFieldParams> = ({
  name: parentFieldName,
  value: actors,
  onChange,
}: ActorsFieldParams) => {
  const classes = useStyles();

  const handleDeleteActor = (deletedActor: CreateActorDTO) => () => {
    const filteredActors = actors.filter(
      actor => !areEqualActors(actor, deletedActor)
    );
    onChange({
      target: { name: parentFieldName, value: filteredActors },
    } as React.ChangeEvent<any>);
  };

  const addActorForm = useFormik<CreateActorDTO>({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    validate: getValidator(CreateActorDTO),
    onSubmit: data => {
      const alreadyAdded = !!actors.find(actor => areEqualActors(actor, data));

      if (!alreadyAdded) {
        const newActors = [...actors, { ...data }];
        addActorForm.resetForm();
        onChange({
          target: { name: parentFieldName, value: newActors },
        } as React.ChangeEvent<any>);
      }
    },
  });

  return (
    <div>
      <div className={classes.form}>
        <TextField
          id='firstName'
          name='firstName'
          label='First Name'
          size='medium'
          fullWidth={false}
          value={addActorForm.values.firstName}
          onChange={addActorForm.handleChange}
          error={
            addActorForm.touched.firstName &&
            Boolean(addActorForm.errors.firstName)
          }
          helperText={
            addActorForm.touched.firstName && addActorForm.errors.firstName
          }
        />
        <TextField
          id='lastName'
          name='lastName'
          label='Last Name'
          size='medium'
          fullWidth={false}
          value={addActorForm.values.lastName}
          onChange={addActorForm.handleChange}
          error={
            addActorForm.touched.lastName &&
            Boolean(addActorForm.errors.lastName)
          }
          helperText={
            addActorForm.touched.lastName && addActorForm.errors.lastName
          }
        />
        <Button color='secondary' onClick={() => addActorForm.handleSubmit()}>
          Add Actor
        </Button>
      </div>
      <ul className={classes.actorList}>
        {actors.map((actor, i) => (
          <li key={`${actor.firstName} ${actor.lastName}`}>
            <Chip
              label={`${actor.firstName} ${actor.lastName}`}
              onDelete={handleDeleteActor(actor)}
              className={classes.actorItem}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActorsField;
