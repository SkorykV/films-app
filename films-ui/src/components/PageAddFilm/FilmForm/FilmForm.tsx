import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { API_HOST } from '../../../constants/api';
import { getValidator } from '../../../helpers/validation';
import { CreateFilmWithActorsDTO } from '../../../models/Film';
import ActorsField from './ActorsField/ActorsField';

const useStyles = makeStyles(theme => ({
  header: {
    textTransform: 'uppercase',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1, 0),
    },
  },
  submitBtn: {
    alignSelf: 'flex-end',
  },
}));

const FilmForm: React.FC = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      title: '',
      releaseYear: '',
      format: '',
      stars: [],
    },
    validate: getValidator(CreateFilmWithActorsDTO),
    onSubmit: async values => {
      try {
        await axios.post(`${API_HOST}/films`, values);
        alert(`Film "${values.title}" was successfully created!`);
        formik.resetForm();
      } catch (error) {
        alert('Something went wrong');
      }
    },
  });

  return (
    <div>
      <Typography variant='h4' align='center' className={classes.header}>
        Add your favourite film!
      </Typography>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextField
          fullWidth
          id='title'
          name='title'
          label='Title'
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          fullWidth
          id='releaseYear'
          name='releaseYear'
          label='Release Year'
          type='number'
          value={formik.values.releaseYear}
          onChange={formik.handleChange}
          error={
            formik.touched.releaseYear && Boolean(formik.errors.releaseYear)
          }
          helperText={formik.touched.releaseYear && formik.errors.releaseYear}
        />
        <TextField
          fullWidth
          id='format'
          name='format'
          label='Format'
          value={formik.values.format}
          onChange={formik.handleChange}
          error={formik.touched.format && Boolean(formik.errors.format)}
          helperText={formik.touched.format && formik.errors.format}
        />
        <ActorsField
          name='stars'
          value={formik.values.stars}
          onChange={formik.handleChange}
        />
        <Button
          classes={{ root: classes.submitBtn }}
          color='primary'
          variant='contained'
          type='submit'
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FilmForm;
