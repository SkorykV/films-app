import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  loadingContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const CenteredLoader: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.loadingContainer}>
      <CircularProgress color='secondary' />
    </div>
  );
};

export default CenteredLoader;
