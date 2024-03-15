import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';
import { useTranslation } from 'react-i18next';

const validationSchema = Yup.object().shape({
  point_rate: Yup.number().required('Point Rate is required'),
  minimum_point_for_withdraw: Yup.number().required('Point for withdraw is required'),
});

const Pointsetting = () => {
  const showToast = useToast();
  const [existingData, setExistingData] = useState(null);
  const { t } = useTranslation();

  const [initialValues, setInitialValues] = useState({
    point_rate: 0,
    minimum_point_for_withdraw: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/settings`, {
          headers: headers,
        });

        if (response.data.data) {
          setExistingData(response.data.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (existingData) {
      setInitialValues(() => ({
        point_rate: existingData.point_rate || 0,
        minimum_point_for_withdraw: existingData.minimum_point_for_withdraw || 0,
      }));
    }
  }, [existingData]);

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('point_rate', values.point_rate);
      formData.append('minimum_point_for_withdraw', values.minimum_point_for_withdraw);

      const url = existingData
        ? `${baseUrl}/settings/${existingData.id}`
        : `${baseUrl}/settings`;

      if (existingData && Object.keys(existingData).length > 0) {
        formData.append('_method', 'PUT');
      }

      const response = await axios.post(
        url,
        formData,
        {
          headers: headers,
        },
      );

      if (existingData) {
        if (response.status === 200) {
          showToast('Update Successfully', 'success');
        } else {
          showToast('Update Failed', 'error');
        }
      } else {
        if (response.status === 201) {
          showToast('Create Successfully', 'success');
          // Reload the page after successful creation
          window.location.reload();
        } else {
          showToast('Create Failed', 'error');
        }
      }

    } catch (error) {
      showToast(error.response?.data?.errors[0] || 'An error occurred.', 'error');
    }
  };

  return (
    <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched, values, handleChange }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Field name="point_rate">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('Point Rate')}
                    value={values.point_rate}
                    onChange={handleChange}
                    variant="outlined"
                    error={Boolean(errors.point_rate && touched.point_rate)}
                    helperText={touched.point_rate && errors.point_rate}
                  />
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field name="minimum_point_for_withdraw">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('Minimum Point For Withdraw')}
                    value={values.minimum_point_for_withdraw}
                    onChange={handleChange}
                    variant="outlined"
                    error={Boolean(errors.minimum_point_for_withdraw && touched.minimum_point_for_withdraw)}
                    helperText={touched.minimum_point_for_withdraw && errors.minimum_point_for_withdraw}
                  />
                )}
              </Field>
            </Grid>

            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <AnimateButton>
                <Button type="submit" variant="contained">
                  {existingData && existingData.id ? t('Update') : t('Create')}
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default Pointsetting;
