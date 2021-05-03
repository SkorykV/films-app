import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import ImportFilmsForm from './ImportFilmsForm/ImportFilmsForm';

const useStyles = makeStyles(theme => ({
  header: {
    textTransform: 'uppercase',
    marginBottom: theme.spacing(3),
  },
}));

const PageImportFilms: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant='h4' align='center' className={classes.header}>
        Import films from file in a moment!
      </Typography>
      <ImportFilmsForm />
    </>
  );
};

export default PageImportFilms;
