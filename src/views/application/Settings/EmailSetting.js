import React, { useEffect, useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';
import { useTranslation } from 'react-i18next';

const validationSchema = Yup.object().shape({
  sender_name: Yup.string().required('Minimum Order Amount is required'),
  sender_email: Yup.string().required('Maximum Order Amount is required'),
});

const EmailSetting = () => {
  const showToast = useToast();
  const [existingData, setExistingData] = useState(null);
  const { t } = useTranslation();

  const [initialValues, setInitialValues] = useState({
    sender_name: '',
    sender_email: '',
    mail_mailer: '',
    mail_host: '',
    mail_port: '',
    mail_encryption: '',
    mail_username: '',
    mail_password: '',
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
        sender_name: existingData.sender_name || '',
        sender_email: existingData.sender_email || '',
        mail_mailer: existingData.mail_mailer || '',
        mail_host: existingData.mail_host || '',
        mail_port: existingData.mail_port || '',
        mail_encryption: existingData.mail_encryption || '',
        mail_username: existingData.mail_username || '',
        mail_password: existingData.mail_password || '',
      }));
    }
  }, [existingData]);

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('sender_name', values.sender_name);
      formData.append('sender_email', values.sender_email);
      formData.append('mail_mailer', values.mail_mailer);
      formData.append('mail_host', values.mail_host);
      formData.append('mail_port', values.mail_port);
      formData.append('mail_encryption', values.mail_encryption);
      formData.append('mail_username', values.mail_username);
      formData.append('mail_password', values.mail_password);

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
              <Field name="sender_name">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('Sender Name')}
                    value={values.sender_name}
                    onChange={handleChange}
                    variant="outlined"
                    error={Boolean(errors.sender_name && touched.sender_name)}
                    helperText={touched.sender_name && errors.sender_name}
                  />
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field name="sender_email">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='email'
                    label={t('Sender Email')}
                    value={values.sender_email}
                    onChange={handleChange}
                    variant="outlined"
                    error={Boolean(errors.sender_email && touched.sender_email)}
                    helperText={touched.sender_email && errors.sender_email}
                  />
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field name="mail_mailer">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('Mail Mailer')}
                    value={values.mail_mailer}
                    onChange={handleChange}
                    variant="outlined"
                    disabled
                    error={Boolean(errors.mail_mailer && touched.mail_mailer)}
                    helperText={touched.mail_mailer && errors.mail_mailer}
                  />
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field name="mail_host">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('Mail Host')}
                    value={values.mail_host}
                    onChange={handleChange}
                    variant="outlined"
                    error={Boolean(errors.mail_host && touched.mail_host)}
                    helperText={touched.mail_host && errors.mail_host}
                  />
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field name="mail_port">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('Mail Port')}
                    value={values.mail_port}
                    onChange={handleChange}
                    variant="outlined"
                    error={Boolean(errors.mail_port && touched.mail_port)}
                    helperText={touched.mail_port && errors.mail_port}
                  />
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field name="mail_encryption">
                {({ field }) => (
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="mail-encryption">{t('Mail Encryption')}</InputLabel>
                    <Select
                      {...field}
                      label={t('Mail Encryption')}
                      value={values.mail_encryption}
                      onChange={handleChange}
                      error={Boolean(errors.mail_encryption && touched.mail_encryption)}
                    >
                      <MenuItem value="tls">TLS</MenuItem>
                      <MenuItem value="ssl">SSL</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field name="mail_username">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('Mail Username')}
                    value={values.mail_username}
                    onChange={handleChange}
                    variant="outlined"
                    error={Boolean(errors.mail_username && touched.mail_username)}
                    helperText={touched.mail_username && errors.mail_username}
                  />
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field name="mail_password">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('Mail Password')}
                    value={values.mail_password}
                    onChange={handleChange}
                    variant="outlined"
                    error={Boolean(errors.mail_password && touched.mail_password)}
                    helperText={touched.mail_password && errors.mail_password}
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

export default EmailSetting;
