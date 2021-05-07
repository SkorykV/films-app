import { Button, Grid, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { getValidator } from '../../../../helpers/validation';
import { FilterFilmsDTO } from '../../../../models/Film';

const FilterFilmsForm: React.FC<{
  shouldResetOnClearing: boolean;
  onSubmit: (filters: FilterFilmsDTO) => Promise<void>;
  onReset: () => Promise<void>;
}> = ({
  shouldResetOnClearing,
  onSubmit,
  onReset,
}: {
  shouldResetOnClearing: boolean;
  onSubmit: (filters: FilterFilmsDTO) => Promise<void>;
  onReset: () => Promise<void>;
}) => {
  const [isReseting, setReseting] = useState(false);
  const handleSubmit = useCallback(
    async (filters: FilterFilmsDTO) => {
      if (isReseting) {
        return;
      }
      await onSubmit(filters);
    },
    [isReseting, onSubmit]
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
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const updatedValues = { ...formik.values, [name]: value };
      if (
        shouldResetOnClearing &&
        !(formik.isSubmitting || isReseting) &&
        !updatedValues.title &&
        !updatedValues.actorName
      ) {
        setReseting(true);
        formik.resetForm();
        await onReset();
        setReseting(false);
      }

      formik.handleChange(e);
    },
    [shouldResetOnClearing, isReseting, formik, onReset]
  );

  return (
    <form onSubmit={formik.handleSubmit} key='search'>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            id='title'
            name='title'
            label='Title'
            value={formik.values.title}
            disabled={formik.isSubmitting}
            onChange={onFormFieldChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            id='actorName'
            name='actorName'
            label='Actor Name'
            value={formik.values.actorName}
            disabled={formik.isSubmitting}
            onChange={onFormFieldChange}
            error={formik.touched.actorName && Boolean(formik.errors.actorName)}
            helperText={formik.touched.actorName && formik.errors.actorName}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            color='primary'
            variant='contained'
            type='submit'
            disabled={formik.isSubmitting || isReseting}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FilterFilmsForm;
