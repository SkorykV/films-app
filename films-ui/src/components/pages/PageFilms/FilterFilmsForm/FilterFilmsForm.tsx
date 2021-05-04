import { Button, Grid, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { getValidator } from '../../../../helpers/validation';
import { FilterFilmsDTO } from '../../../../models/Film';

const FilterFilmsForm: React.FC<{
  disabled: boolean;
  onSubmit: (filters: FilterFilmsDTO) => void;
}> = ({
  onSubmit,
  disabled,
}: {
  disabled: boolean;
  onSubmit: (filters: FilterFilmsDTO) => void;
}) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      actorName: '',
    },
    validate: getValidator(FilterFilmsDTO),
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            id='title'
            name='title'
            label='Title'
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            id='actorName'
            name='actorName'
            label='Actor Name'
            value={formik.values.actorName}
            onChange={formik.handleChange}
            error={formik.touched.actorName && Boolean(formik.errors.actorName)}
            helperText={formik.touched.actorName && formik.errors.actorName}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            color='primary'
            variant='contained'
            type='submit'
            disabled={disabled}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FilterFilmsForm;
