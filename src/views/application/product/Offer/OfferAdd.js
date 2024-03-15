import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Slide,
    TextField,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';
import Image from 'views/shared/Image';
import { useTranslation } from 'react-i18next';
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Offer is required'),
    name_bn: Yup.string().required('Offer Bn is required'),
    slug: Yup.string().required('Slug is required'),
    slug_bn: Yup.string().required('Slug Bn is required'),
});

const HighlightTypeAdd = ({ open, handleCloseDialog, handelFatchOffers, selectedData }) => {
    const showToast = useToast();
    const [lastSerial, setLastSerial] = useState(0)
    const { t } = useTranslation();
    const initialValues = {
        name: Object.keys(selectedData).length > 0 ? selectedData.name : '',
        name_bn: Object.keys(selectedData).length > 0 ? selectedData.name_bn : '',
        slug: Object.keys(selectedData).length > 0 ? selectedData.slug : '',
        slug_bn: Object.keys(selectedData).length > 0 ? selectedData.slug_bn : '',
        serial: Object.keys(selectedData).length > 0 ? selectedData.serial : lastSerial,
    };

    useEffect(() => {
        getSerial();
    })
    const getSerial = async () => {
        const response = await axios.get(`${baseUrl}/getOfferSerial`, {
            headers: headers
        });
        setLastSerial(response.data);
    }


    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('name_bn', values.name_bn);
            formData.append('slug', values.slug);
            formData.append('slug_bn', values.slug_bn);
            formData.append('serial', Object.keys(selectedData).length > 0 ? selectedData.serial : lastSerial + 1);
            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            if (values.logo) {
                formData.append('logo', values.logo);
            }
            const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/offers/${selectedData.id}`, formData, {
                headers: headers
            }) : await axios.post(`${baseUrl}/offers`, formData, {
                headers: headers
            });
            if (response.status === 201) {
                showToast('Save Successfully ', 'success');
                handelFatchOffers()
                handleCloseDialog();
            }
            if (response.status === 200) {
                showToast('Updated Successfully ', 'success');
                handelFatchOffers()
                handleCloseDialog();
            }
            if (response?.errors?.length > 0) {
                showToast(response.errors[0], 'error');
            }
            handleCloseDialog()
        } catch (error) {
            showToast(error.response.data.errors[0], 'error');
        }
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
        // ... (existing sx styles)
        >
            {open && (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched, setFieldValue }) => (
                        <Form>
                            <DialogTitle>{Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t('Your Offer')}</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field name="name">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Offer Name") + '*'}
                                                    error={errors.name && touched.name}
                                                    helperText={
                                                        errors.name && touched.name
                                                            ? errors.name
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="name_bn">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Offer Name bn") + '*'}
                                                    error={errors.name_bn && touched.name_bn}
                                                    helperText={
                                                        errors.name_bn && touched.name_bn
                                                            ? errors.name_bn
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="slug">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Offer Slug") + '*'}
                                                    error={errors.slug && touched.slug}
                                                    helperText={
                                                        errors.slug && touched.slug
                                                            ? errors.slug
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="slug_bn">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Offer Slug bn") + '*'}
                                                    error={errors.slug_bn && touched.slug_bn}
                                                    helperText={
                                                        errors.slug_bn && touched.slug_bn
                                                            ? errors.slug_bn
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="serial">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    type='number'
                                                    fullWidth
                                                    label={t("Serial") + '*'}
                                                    error={errors.serial && touched.serial}
                                                    value={Object.keys(selectedData).length > 0 ? selectedData.serial : lastSerial + 1}
                                                    helperText={
                                                        errors.serial && touched.serial
                                                            ? errors.serial
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Image setFieldValue={setFieldValue}></Image>
                                        <ErrorMessage
                                            name="logo"
                                            component="div"
                                            className="error"
                                        />

                                    </Grid>

                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <AnimateButton>
                                    <Button type="submit" variant="contained">
                                        {Object.keys(selectedData).length > 0 ? t("Update") : t("Create")}
                                    </Button>
                                </AnimateButton>
                                <Button variant="text" color="error" onClick={handleCloseDialog}>

                                    {t('Close')}
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            )}
        </Dialog>
    );
};

HighlightTypeAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
};

export default HighlightTypeAdd;
