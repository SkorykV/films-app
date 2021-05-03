import React, { useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Films from './Films/Films';
import axios from 'axios';
import { API_HOST } from '../../constants/api';
import { Film, FilterFilmsDTO } from '../../models/Film';
import FilterFilmsForm from './FilterFilmsForm/FilterFilmsForm';

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    textTransform: 'uppercase',
  },
  filterFormContainer: {
    padding: theme.spacing(3),
  },
  filmsContainer: {
    flexGrow: 1,
  },
}));

const PageFilms: React.FC = () => {
  const classes = useStyles();

  const [isLoading, setLoading] = useState(true);
  const [films, setFilms] = useState<Film[]>([]);

  const loadFilms = async (filters?: FilterFilmsDTO) => {
    const params: any = {};
    let key: keyof FilterFilmsDTO;
    if (filters) {
      for (key in filters) {
        if (filters.hasOwnProperty(key) && filters[key]) {
          params[key] = filters[key];
        }
      }
    }

    setLoading(true);
    const res = await axios.get(`${API_HOST}/films`, {
      params,
    });
    setTimeout(() => {
      setFilms(res.data);
      setLoading(false);
    }, 500);
  };

  const handleDeleteFilm = (id: number) => {
    axios.delete(`${API_HOST}/films/${id}`).then(() => {
      setFilms(films.filter(film => film.id !== id));
    });
  };

  useEffect(() => {
    loadFilms();
  }, []);

  const handleFiltersChange = async (filters: FilterFilmsDTO) => {
    await loadFilms(filters);
  };

  return (
    <div className={classes.content}>
      <Typography variant='h4' align='center' className={classes.header}>
        Search for your favourite film
      </Typography>
      <div className={classes.filterFormContainer}>
        <FilterFilmsForm onSubmit={handleFiltersChange} disabled={isLoading} />
      </div>
      <div className={classes.filmsContainer}>
        <Films
          films={films}
          loading={isLoading}
          onFilmDelete={handleDeleteFilm}
        />
      </div>
    </div>
  );
};

export default PageFilms;