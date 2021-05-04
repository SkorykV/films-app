import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound: React.FC = () => (
  <Typography variant='h6' align='center'>
    Page doesn`t exist.. Return to the <Link to=''>Main Page</Link>
  </Typography>
);

export default PageNotFound;
