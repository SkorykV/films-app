import React from 'react';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import axios from 'axios';
import { API_HOST } from '../../../../constants/api';

const useStyles = makeStyles(theme => ({
  header: {
    textTransform: 'uppercase',
  },
  fileInputMessage: {
    textAlign: 'right',
  },
  submitBtn: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  centered: {
    textAlign: 'center',
  },
}));

const ImportFilmsForm: React.FC = () => {
  const classes = useStyles();

  const filmsImportForm = useFormik<{ file: File | string }>({
    initialValues: {
      file: '',
    },
    validate: values => {
      if (!values.file) {
        return { file: 'File can`t be empty' };
      }
      if (values.file instanceof File && values.file.type !== 'text/plain') {
        return { file: 'File should have extension *.txt' };
      }
    },
    onSubmit: async values => {
      try {
        const formData = new FormData();
        formData.append('file', values.file);
        const res = await axios.post(`${API_HOST}/films/parse`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert(`Your file was parsed! ${res.data.created} new films added`);
      } catch (error) {
        alert(error.response.data?.message);
      }
    },
  });

  const fileInputError = !!filmsImportForm.errors.file;

  return (
    <form onSubmit={filmsImportForm.handleSubmit}>
      <Grid container alignItems='center' spacing={2}>
        <Grid item xs={6} sm={6} className={classes.fileInputMessage}>
          <Typography
            component='span'
            color={fileInputError ? 'error' : 'textPrimary'}
            align='right'
          >
            {fileInputError
              ? filmsImportForm.errors.file
              : filmsImportForm.values.file instanceof File
              ? filmsImportForm.values.file.name
              : 'Please select a file with films'}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3} md={2} className={classes.centered}>
          <div>
            <input
              accept='text/plain'
              id='file'
              name='file'
              type='file'
              onChange={event => {
                filmsImportForm.setFieldValue(
                  'file',
                  event.currentTarget.files && event.currentTarget.files[0]
                );
              }}
              hidden
            />
            <label htmlFor='file'>
              <Button variant='contained' component='span'>
                Upload
              </Button>
            </label>
          </div>
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <Button
            color='primary'
            variant='contained'
            type='submit'
            className={classes.submitBtn}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ImportFilmsForm;
