import { Container, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import FilmForm from './FilmForm/FilmForm';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
}));

const PageAddFilm: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth='sm' className={classes.root}>
      <FilmForm />
    </Container>
  );
};

export default PageAddFilm;
