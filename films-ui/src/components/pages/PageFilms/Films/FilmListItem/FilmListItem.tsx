import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemIcon } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
// TODO: any
function FilmListItem(props: any) {
  const { index, style, data } = props;

  const { films, onFilmDelete } = data;
  const film = films[index];

  const handleDelete = useCallback(
    e => {
      e.preventDefault();
      onFilmDelete(film.id);
    },
    [onFilmDelete, film.id]
  );

  return (
    <ListItem
      button
      style={style}
      key={film.id}
      component={Link}
      to={`/films/${film.id}`}
    >
      <ListItemIcon>
        <LocalMoviesIcon />
      </ListItemIcon>
      <ListItemText primary={`${index + 1}. ${film.title}`} />
      <ListItemIcon>
        <DeleteIcon color='secondary' onClick={handleDelete} />
      </ListItemIcon>
    </ListItem>
  );
}

export default FilmListItem;
