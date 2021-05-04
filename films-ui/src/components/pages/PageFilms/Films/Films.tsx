import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { makeStyles } from '@material-ui/core/styles';
import { Film } from '../../../../models/Film';

import { FixedSizeList } from 'react-window';
import FilmListItem, { FilmListItemData } from './FilmListItem/FilmListItem';
import CenteredLoader from '../../../CenteredLoader/CenteredLoader';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
  emptyPlaceholder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}));

export default function Films({
  films,
  loading,
  onFilmDelete,
}: {
  films: Film[];
  loading: boolean;
  onFilmDelete: (id: number) => void;
}) {
  const classes = useStyles();

  if (loading) {
    return <CenteredLoader />;
  }

  return (
    <Paper className={classes.root}>
      {!films.length ? (
        <Typography
          className={classes.emptyPlaceholder}
          variant='h6'
          align='center'
        >
          There is no films
        </Typography>
      ) : (
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList<FilmListItemData>
              height={height}
              width={width}
              itemSize={46}
              itemCount={films.length}
              itemData={{ films, onFilmDelete }}
            >
              {FilmListItem}
            </FixedSizeList>
          )}
        </AutoSizer>
      )}
    </Paper>
  );
}
