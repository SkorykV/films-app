import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Films from './Films/Films';
import axios from 'axios';
import { API_HOST } from '../../../constants/api';
import { Film, FilterFilmsDTO } from '../../../models/Film';
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

const PageFilms: React.FC<{ onNotificationAdd: (message: string) => void }> = ({
  onNotificationAdd,
}: {
  onNotificationAdd: (message: string) => void;
}) => {
  const classes = useStyles();

  const [isLoading, setLoading] = useState(true);
  const [films, setFilms] = useState<Film[]>([]);
  const [searchApplied, setSearchApplied] = useState(false);

  const loadFilms = useCallback(async (filters?: FilterFilmsDTO) => {
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
    setFilms(res.data);
    setLoading(false);
    setSearchApplied(!!(filters?.title || filters?.actorName));
  }, []);

  const handleDeleteFilm = (id: number) => {
    axios.delete(`${API_HOST}/films/${id}`).then(() => {
      const deletedFilm = films.find(film => film.id === id);
      if (deletedFilm) {
        setFilms(films.filter(film => film.id !== id));
        onNotificationAdd(
          `Film "${deletedFilm.title}" was successfully deleted`
        );
      }
    });
  };

  useEffect(() => {
    loadFilms();
  }, [loadFilms]);

  const handleFiltersChange = useCallback(
    async (filters: FilterFilmsDTO) => {
      await loadFilms(filters);
    },
    [loadFilms]
  );

  const handleFiltersReset = useCallback(async () => {
    await loadFilms();
  }, [loadFilms]);

  return (
    <div className={classes.content}>
      <Typography variant='h4' align='center' className={classes.header}>
        Search for your favourite film
      </Typography>
      <div className={classes.filterFormContainer}>
        <FilterFilmsForm
          onSubmit={handleFiltersChange}
          onReset={handleFiltersReset}
          shouldResetOnClearing={searchApplied}
        />
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
