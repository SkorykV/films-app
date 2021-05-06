import { Paper, Typography, Grid, makeStyles, Button } from '@material-ui/core';
import axios from 'axios';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { API_HOST } from '../../../../constants/api';
import { FilmDetails as FilmDetailsData } from '../../../../models/Film';

const useStyles = makeStyles(theme => ({
  posterContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  poster: {
    maxWidth: 300,
    width: '90%',
  },
  filmInfoContainer: {
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
}));

const FilmDetails: React.FC<FilmDetailsData> = ({
  id,
  title,
  releaseYear,
  format,
  stars,
}: FilmDetailsData) => {
  const classes = useStyles();
  const history = useHistory();

  const handleDelete = useCallback(() => {
    axios.delete(`${API_HOST}/films/${id}`).then(() => {
      history.push('/');
    });
  }, [id, history]);

  return (
    <Paper>
      <Typography align='center' variant='h4'>
        {title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} className={classes.posterContainer}>
          <img
            className={classes.poster}
            src='https://via.placeholder.com/300x500?text=Movie%20Poster'
            alt='Movie poster'
          />
        </Grid>
        <Grid item xs={12} sm={8} className={classes.filmInfoContainer}>
          <Typography component='p'>Release Year: {releaseYear}</Typography>
          <Typography component='p'>Format: {format}</Typography>
          <Typography component='p'>
            Actors:{' '}
            {stars
              .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
              .join(', ')}
          </Typography>
          <Button variant='outlined' color='secondary' onClick={handleDelete}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilmDetails;
