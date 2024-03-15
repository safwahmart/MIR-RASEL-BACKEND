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
  minimum_order_amount: Yup.number().required('Minimum Order Amount is required'),
  maximum_order_amount: Yup.number().required('Maximum Order Amount is required'),
});

const OrderSetting = () => {
  const showToast = useToast();
  const [existingData, setExistingData] = useState(null);
  const { t } = useTranslation();

  const [initialValues, setInitialValues] = useState({
    minimum_order_amount: 0,
    maximum_order_amount: 0,
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
        minimum_order_amount: existingData.minimum_order_amount || 0,
        maximum_order_amount: existingData.maximum_order_amount || 0,
      }));
    }
  }, [existingData]);

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('minimum_order_amount', values.minimum_order_amount);
      formData.append('maximum_order_amount', values.maximum_order_amount);

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
      console.log("Error", error);
      showToast(error.response?.data?.errors[0] || 'An error occurred.', 'error');
    }
  };

  return (
    <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched, values, handleChange }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Field name="minimum_order_amount">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('Minimum Order Amount')}
                    value={values.minimum_order_amount}
                    onChange={handleChange}
                    variant="outlined"
                    error={Boolean(errors.minimum_order_amount && touched.minimum_order_amount)}
                    helperText={touched.minimum_order_amount && errors.minimum_order_amount}
                  />
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field name="maximum_order_amount">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('Maximum Order Amount')}
                    value={values.maximum_order_amount}
                    onChange={handleChange}
                    variant="outlined"
                    error={Boolean(errors.maximum_order_amount && touched.maximum_order_amount)}
                    helperText={touched.maximum_order_amount && errors.maximum_order_amount}
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

export default OrderSetting;
