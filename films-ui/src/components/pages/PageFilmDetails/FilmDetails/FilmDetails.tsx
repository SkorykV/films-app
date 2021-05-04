import { Paper, Typography, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { FilmDetails as FilmDetailsData } from '../../../../models/Film';

const useStyles = makeStyles(theme => ({
  title: {
    textTransform: 'uppercase',
  },
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
  title,
  releaseYear,
  format,
  stars,
}: FilmDetailsData) => {
  const classes = useStyles();
  return (
    <Paper>
      <Typography align='center' variant='h4' className={classes.title}>
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
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilmDetails;
