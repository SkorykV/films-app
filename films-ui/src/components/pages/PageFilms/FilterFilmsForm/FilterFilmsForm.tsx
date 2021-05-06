import { Button, Grid, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
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
  const [wasSubmited, setWasSubmited] = useState(false);

  const handleSubmit = useCallback(
    (filters: FilterFilmsDTO) => {
      if (!wasSubmited) {
        setWasSubmited(true);
      }

      onSubmit(filters);
    },
    [wasSubmited, onSubmit]
  );

  const formik = useFormik({
    initialValues: {
      title: '',
      actorName: '',
    },
    validate: getValidator(FilterFilmsDTO),
    onSubmit: handleSubmit,
  });

  const onFormFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const updatedValues = { ...formik.values, [name]: value };
      if (wasSubmited && !updatedValues.title && !updatedValues.actorName) {
        onSubmit(updatedValues);
      }
      formik.handleChange(e);
    },
    [wasSubmited, formik, onSubmit]
  );

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
            onChange={onFormFieldChange}
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
            onChange={onFormFieldChange}
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
