import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Grid, Switch, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';
import { useTranslation } from 'react-i18next';
import { isEmpty, isUndefined } from 'lodash';

const validationSchema = Yup.object().shape({
  inside_cod_dhaka: Yup.string().required('Inside COD Charge is required'),
  outside_cod_dhaka: Yup.string().required('Outside COD Charge is required'),
  min_purchase_amount: Yup.string().required('Minimum Purchase Amount is required'),
  free_delivery_amount: Yup.string().required('Free Delivery Amount is required'),
});

const DeliveryDiscount = () => {
  const showToast = useToast();
  const [isCODInsideDhaka, setIsCODInsideDhaka] = useState(false);
  const [isCODOutsideDhaka, setIsCODOutsideDhaka] = useState(false);
  const [isFreeDelivery, setIsFreeDelivery] = useState(false);
  const [existingData, setExistingData] = useState({});
  const { t } = useTranslation();

  const [initialValues, setInitialValues] = useState({
    inside_cod_dhaka: '',
    outside_cod_dhaka: '',
    min_purchase_amount: '',
    free_delivery_amount: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/deliveryDiscounts`, {
          headers: headers,
        });

        console.log('zres', response.data.data[0])

        if (!isUndefined(response.data.data[0])) {
          setExistingData(response.data.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log('existdata', existingData)

  useEffect(() => {
    if (existingData) {
      setIsCODInsideDhaka(existingData.cod_inside_dhaka === 1);
      setIsCODOutsideDhaka(existingData.cod_outside_dhaka === 1);
      setIsFreeDelivery(existingData.free_delivery === 1);

      // Set initial values here
      setInitialValues(() => ({
        inside_cod_dhaka: existingData.inside_cod_dhaka || '',
        outside_cod_dhaka: existingData.outside_cod_dhaka || '',
        min_purchase_amount: existingData.min_purchase_amount || '',
        free_delivery_amount: existingData.free_delivery_amount || '',
      }));
    }
  }, [existingData]);


  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('cod_inside_dhaka', isCODInsideDhaka ? 1 : 0);
      formData.append('cod_outside_dhaka', isCODOutsideDhaka ? 1 : 0);
      formData.append('free_delivery', isFreeDelivery ? 1 : 0);
      formData.append('inside_cod_dhaka', values.inside_cod_dhaka);
      formData.append('outside_cod_dhaka', values.outside_cod_dhaka);
      formData.append('min_purchase_amount', values.min_purchase_amount);
      formData.append('free_delivery_amount', values.free_delivery_amount);

      const url = !isEmpty(existingData) ?
        `${baseUrl}/deliveryDiscounts/${existingData.id}` :
        `${baseUrl}/deliveryDiscounts`;

      if (!isUndefined(existingData) && Object.keys(existingData).length > 0) {
        formData.append('_method', 'PUT');
      }

      const response = await axios.post(
        url,
        formData,
        {
          headers: headers
        },
      );

      if (response.status === 201 || response.status === 200) {
        showToast('Save Successfully', 'success');
      } else {
        showToast('Something went wrong!', 'error');
      }
    } catch (error) {
      console.log('error details', error)
      showToast(error.response?.data?.errors[0] || 'An error occurred.', 'error');
    }
  };

  return (
    <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched, values, handleChange }) => (
        <Form>
          <Grid container spacing={2}>
            {/* COD Inside Dhaka */}
            <Grid item xs={6}>
              <Typography variant="h4">{t('COD Inside Dhaka')}</Typography>
              <Switch
                checked={isCODInsideDhaka}
                onChange={() => setIsCODInsideDhaka((prevValue) => !prevValue)}
                color="primary"
                name='cod_inside_dhaka'
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Field name="inside_cod_dhaka">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label={t('Inside COD Charge(%)')}
                    value={values.inside_cod_dhaka}
                    onChange={handleChange}
                    variant="outlined"
                    error={Boolean(errors.inside_cod_dhaka && touched.inside_cod_dhaka)}
                    helperText={touched.inside_cod_dhaka && errors.inside_cod_dhaka}
                  />
                )}
              </Field>
            </Grid>

            {/* COD Outside Dhaka */}
            <Grid item xs={6}>
              <Typography variant="h4">{t('COD Outside Dhaka')}</Typography>
              <Switch
                checked={isCODOutsideDhaka}
                onChange={() => setIsCODOutsideDhaka((prevValue) => !prevValue)}
                color="primary"
                name='cod_outside_dhaka'
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Field name="outside_cod_dhaka">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='number'
                    label={t('Outside COD Charge(%)')}
                    value={values.outside_cod_dhaka}
                    onChange={handleChange}
                    variant="outlined"
                    error={Boolean(errors.outside_cod_dhaka && touched.outside_cod_dhaka)}
                    helperText={touched.outside_cod_dhaka && errors.outside_cod_dhaka}
                  />
                )}
              </Field>
            </Grid>

            {/* Free Delivery */}
            <Grid item xs={6}>
              <Typography variant="h4">{t('Free Delivery')}</Typography>
              <Switch
                checked={isFreeDelivery}
                onChange={() => setIsFreeDelivery((prevValue) => !prevValue)}
                color="primary"
                name='free_delivery'
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Field name="free_delivery_amount">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='number'
                    label={t('Free Delivery Amount')}
                    value={values.free_delivery_amount}
                    onChange={handleChange}
                    variant="outlined"
                    error={Boolean(errors.free_delivery_amount && touched.free_delivery_amount)}
                    helperText={touched.free_delivery_amount && errors.free_delivery_amount}
                  />
                )}
              </Field>
            </Grid>

            <Grid item xs={6}>

            </Grid>

            {/* Min Purchase Amount */}
            <Grid item xs={6}>
              <Field name="min_purchase_amount">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='number'
                    label={t('Min Purchase Amount')}
                    value={values.min_purchase_amount}
                    onChange={handleChange}
                    variant="outlined"
                    error={Boolean(errors.min_purchase_amount && touched.min_purchase_amount)}
                    helperText={touched.min_purchase_amount && errors.min_purchase_amount}
                  />
                )}
              </Field>
            </Grid>



            <Grid item xs={6}>
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

DeliveryDiscount.propTypes = {
  handelFatchWareHouses: PropTypes.func,
};

export default DeliveryDiscount;