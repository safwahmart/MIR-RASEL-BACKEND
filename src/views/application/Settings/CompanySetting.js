import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';
import { useTranslation } from 'react-i18next';

const validationSchema = Yup.object().shape({
    company_name: Yup.string().required('Company Name is required')
    // phone: Yup.string().required('Phone is required'),
});

const CompanySetting = () => {
    const showToast = useToast();
    const [existingData, setExistingData] = useState({});
    const [companyLogo, setCompanyLogo] = useState(null);
    const [faviconIcon, setFaviconIcon] = useState(null);
    const { t } = useTranslation();

    const [initialValues, setInitialValues] = useState({
        company_name: '',
        phone: '',
        hotline: '',
        email: '',
        address: '',
        bill_footer: '',
        bin: '',
        musak: '',
        company_logo: '',
        favicon_icon: '',
        website_link: '',
        google_map: '',
        app_link: '',
        ios_link: '',
        meta_keyword: '',
        meta_description: '',
        login_meta_title: '',
        login_meta_description: '',
        login_alt_text: '',
        registration_meta_title: '',
        registration_meta_description: '',
        registration_alt_text: '',
        company_logo_alt_text: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/settings`, {
                    headers: headers
                });

                console.log('zres', response.data.data[0]);

                if (response.data.data) {
                    setExistingData(response.data.data[0]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    console.log('existdata', existingData);

    useEffect(() => {
        if (existingData) {
            setInitialValues(() => ({
                company_name: existingData.company_name || '',
                phone: existingData.phone || '',
                hotline: existingData.hotline || '',
                email: existingData.email || '',
                address: existingData.address || '',
                bill_footer: existingData.bill_footer || '',
                bin: existingData.bin || '',
                musak: existingData.musak || '',
                company_logo: existingData.company_logo || '',
                favicon_icon: existingData.favicon_icon || '',
                website_link: existingData.website_link || '',
                google_map: existingData.google_map || '',
                app_link: existingData.app_link || '',
                ios_link: existingData.ios_link || '',
                meta_keyword: existingData.meta_keyword || '',
                meta_description: existingData.meta_description || '',
                login_meta_title: existingData.login_meta_title || '',
                login_meta_description: existingData.login_meta_description || '',
                login_alt_text: existingData.login_alt_text || '',
                registration_meta_title: existingData.registration_meta_title || '',
                registration_meta_description: existingData.registration_meta_description || '',
                registration_alt_text: existingData.registration_alt_text || '',
                company_logo_alt_text: existingData.company_logo_alt_text || ''
            }));
        }
    }, [existingData]);

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('company_name', values.company_name);
            formData.append('phone', values.phone);
            formData.append('hotline', values.hotline);
            formData.append('email', values.email);
            formData.append('address', values.address);
            formData.append('bill_footer', values.bill_footer);
            formData.append('bin', values.bin);
            formData.append('musak', values.musak);
            formData.append('company_logo', values.company_logo);
            formData.append('favicon_icon', values.favicon_icon);
            formData.append('website_link', values.website_link);
            formData.append('google_map', values.google_map);
            formData.append('app_link', values.app_link);
            formData.append('ios_link', values.ios_link);
            formData.append('meta_keyword', values.meta_keyword);
            formData.append('meta_description', values.meta_description);
            formData.append('login_meta_title', values.login_meta_title);
            formData.append('login_meta_description', values.login_meta_description);
            formData.append('login_alt_text', values.login_alt_text);
            formData.append('registration_meta_title', values.registration_meta_title);
            formData.append('registration_meta_description', values.registration_meta_description);
            formData.append('registration_alt_text', values.registration_alt_text);
            formData.append('company_logo_alt_text', values.company_logo_alt_text);

            const url = existingData ? `${baseUrl}/settings/${existingData.id}` : `${baseUrl}/settings`;

            if (existingData && Object.keys(existingData).length > 0) {
                formData.append('_method', 'PUT');
            }

            const response = await axios.post(url, formData, {
                headers: headers
            });

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
            console.log('error details', error);
            showToast(error.response?.data?.errors[0] || 'An error occurred.', 'error');
        }
    };

    const handleImage = (e) => {
        setCompanyLogo(URL.createObjectURL(e.target.files[0]));
    };

    const handleFavicon = (e) => {
        setFaviconIcon(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, values, handleChange, setFieldValue }) => (
                <Form>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
                        {/* First Column */}
                        <Grid item xs={12} sm={6}>
                            {/* <Typography variant="h4">{t('Company Name')}</Typography> */}
                            <Field name="company_name">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('Company Name')}
                                        value={values.company_name}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.company_name && touched.company_name)}
                                        helperText={touched.company_name && errors.company_name}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="website_link">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('Website Link')}
                                        value={values.website_link}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.website_link && touched.website_link)}
                                        helperText={touched.website_link && errors.website_link}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            {/* <Typography variant="h4">{t('Phone')}</Typography> */}
                            <Field name="phone">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('Phone')}
                                        value={values.phone}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.phone && touched.phone)}
                                        helperText={touched.phone && errors.phone}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="app_link">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('App Link')}
                                        value={values.app_link}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.app_link && touched.app_link)}
                                        helperText={touched.app_link && errors.app_link}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="hotline">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('Hotline')}
                                        value={values.hotline}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.hotline && touched.hotline)}
                                        helperText={touched.hotline && errors.hotline}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="ios_link">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('IOS Link')}
                                        value={values.ios_link}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.ios_link && touched.ios_link)}
                                        helperText={touched.ios_link && errors.ios_link}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="email">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('Email')}
                                        value={values.email}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.email && touched.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="meta_keyword">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        rows={3}
                                        multiline
                                        style={{ width: '100%' }}
                                        label={t('Meta Keyword')}
                                        value={values.meta_keyword}
                                        onChange={handleChange}
                                        error={Boolean(errors.meta_keyword && touched.meta_keyword)}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="address">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        rows={3}
                                        multiline
                                        style={{ width: '100%' }}
                                        fullWidth
                                        label={t('Address')}
                                        value={values.address}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.address && touched.address)}
                                        helperText={touched.address && errors.address}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="meta_description">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        rows={3}
                                        multiline
                                        style={{ width: '100%' }}
                                        fullWidth
                                        label={t('Meta Description')}
                                        value={values.meta_description}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.meta_description && touched.meta_description)}
                                        helperText={touched.meta_description && errors.meta_description}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="bill_footer">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        rows={3}
                                        multiline
                                        style={{ width: '100%' }}
                                        fullWidth
                                        label={t('Bill Footer')}
                                        value={values.bill_footer}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.bill_footer && touched.bill_footer)}
                                        helperText={touched.bill_footer && errors.bill_footer}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="login_meta_title">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('Login Meta Title')}
                                        value={values.login_meta_title}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.login_meta_title && touched.login_meta_title)}
                                        helperText={touched.login_meta_title && errors.login_meta_title}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="bin">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('Bin')}
                                        value={values.bin}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.bin && touched.bin)}
                                        helperText={touched.bin && errors.bin}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="login_meta_description">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        rows={3}
                                        multiline
                                        style={{ width: '100%' }}
                                        fullWidth
                                        label={t('Login Meta Description')}
                                        value={values.login_meta_description}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.login_meta_description && touched.login_meta_description)}
                                        helperText={touched.login_meta_description && errors.login_meta_description}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="musak">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('Musak')}
                                        value={values.musak}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.musak && touched.musak)}
                                        helperText={touched.musak && errors.musak}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="login_alt_text">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('Login Alt Text')}
                                        value={values.login_alt_text}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.login_alt_text && touched.login_alt_text)}
                                        helperText={touched.login_alt_text && errors.login_alt_text}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="registration_meta_title">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('Registration Meta Title')}
                                        value={values.registration_meta_title}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.registration_meta_title && touched.registration_meta_title)}
                                        helperText={touched.registration_meta_title && errors.registration_meta_title}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Company Logo')}</Typography>
                            </Grid>
                            <Grid item>
                                <input
                                    type="file"
                                    name="company_logo"
                                    onChange={(e) => {
                                        handleImage(e);
                                        setFieldValue('company_logo', e.target.files[0]);
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <img src={companyLogo ? companyLogo : `${process.env.REACT_APP_ASSET_BASE}/uploads/${values.company_logo}`} />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="company_logo_alt_text">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('Company Logo Alt Text')}
                                        value={values.company_logo_alt_text}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.company_logo_alt_text && touched.company_logo_alt_text)}
                                        helperText={touched.company_logo_alt_text && errors.company_logo_alt_text}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="registration_meta_description">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        rows={3}
                                        multiline
                                        style={{ width: '100%' }}
                                        fullWidth
                                        label={t('Registration Meta Description')}
                                        value={values.registration_meta_description}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.registration_meta_description && touched.registration_meta_description)}
                                        helperText={touched.registration_meta_description && errors.registration_meta_description}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Favicon Icon')}</Typography>
                            </Grid>
                            <Grid item>
                                <input
                                    type="file"
                                    name="favicon_icon"
                                    onChange={(e) => {
                                        handleFavicon(e);
                                        setFieldValue('favicon_icon', e.target.files[0]);
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <img src={faviconIcon ? faviconIcon : `${process.env.REACT_APP_ASSET_BASE}/uploads/${values.company_logo}`} />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="registration_alt_text">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('Registration Alt Text')}
                                        value={values.registration_alt_text}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.registration_alt_text && touched.registration_alt_text)}
                                        helperText={touched.registration_alt_text && errors.registration_alt_text}
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

export default CompanySetting;
