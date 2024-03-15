import PropTypes from 'prop-types';
import { forwardRef } from 'react';
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
    logo: Yup.string().required('Slider is required'),
    // slug: Yup.string().required('Slug is required'),
});

const SliderAdd = ({ open, handleCloseDialog, handelFatchSliders, selectedData }) => {
    const showToast = useToast();
    const { t } = useTranslation();
    const initialValues = {
        name: Object.keys(selectedData).length > 0 ? selectedData.name : '',
        name_bn: Object.keys(selectedData).length > 0 ? selectedData.name_bn : '',
        slug: Object.keys(selectedData).length > 0 ? selectedData.slug : '',
        slug_bn: Object.keys(selectedData).length > 0 ? selectedData.slug_bn : '',
        title: Object.keys(selectedData).length > 0 ? selectedData.title : '',
        title_bn: Object.keys(selectedData).length > 0 ? selectedData.title_bn : '',
        meta_title: Object.keys(selectedData).length > 0 ? selectedData.meta_title : '',
        meta_description: Object.keys(selectedData).length > 0 ? selectedData.meta_description : '',
        position: Object.keys(selectedData).length > 0 ? selectedData.position : '',
        alt_text: Object.keys(selectedData).length > 0 ? selectedData.alt_text : '',
        // alt_text_bn: Object.keys(selectedData).length > 0 ? selectedData.alt_text_bn : '',
        logo: Object.keys(selectedData).length > 0 ? selectedData.logo : '',
        description: Object.keys(selectedData).length > 0 ? selectedData.description : '',
        description_bn: Object.keys(selectedData).length > 0 ? selectedData.description_bn : ''
    };

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('name_bn', values.name_bn);
            formData.append('button_url', values.button_url);
            formData.append('slug', values.slug);
            formData.append('button_title', values.button_title);
            formData.append('alt_txt', values.alt_text ?? "");
            // formData.append('alt_text_bn', values.alt_text_bn ?? "");
            formData.append('meta_title', values.meta_title ?? "");
            // formData.append('meta_title_bn', values.meta_title_bn ?? "");
            formData.append('meta_description', values.meta_desc ?? "");
            // formData.append('meta_description_bn', values.meta_desc_bn ?? "");
            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            if (values.logo) {
                formData.append('logo', values.logo);
            }
            const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/sliders/${selectedData.id}`, formData, {
                headers: headers
            }) : await axios.post(`${baseUrl}/sliders`, formData, {
                headers: headers
            });
            if (response.status === 201) {
                showToast('Save Successfully ', 'success');
                handelFatchSliders()
                handleCloseDialog();
            }
            if (response.status === 200) {
                showToast('Updated Successfully ', 'success');
                handelFatchSliders()
                handleCloseDialog();
            }
            if (response?.errors?.length > 0) {
                showToast(response.errors[0], 'error');
            }
            handleCloseDialog()
        } catch (error) {
            console.error(error);
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
                    {({ errors, touched, values, setFieldValue }) => (
                        <Form>
                            <DialogTitle>{Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t("Your Sliders")}</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field name="name">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Slider Name") + '*'}
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
                                                    label={t("Slider Name bn") + '*'}
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
                                                    label={t("Slug") + '*'}
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
                                        <Field name="meta_title">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter meta title")}
                                                    error={errors.meta_title && touched.meta_title}
                                                    helperText={
                                                        errors.meta_title && touched.meta_title
                                                            ? errors.meta_title
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                        <Field name="meta_title_bn">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter meta title bn")}
                                                    error={errors.meta_title_bn && touched.meta_title_bn}
                                                    helperText={
                                                        errors.meta_title_bn && touched.meta_title_bn
                                                            ? errors.meta_title_bn
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid> */}
                                    <Grid item xs={12}>
                                        <Field name="meta_desc">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter meta description")}
                                                    error={errors.meta_description && touched.meta_description}
                                                    helperText={
                                                        errors.meta_description && touched.meta_description
                                                            ? errors.meta_description
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                        <Field name="meta_desc_bn">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter meta description bn")}
                                                    error={errors.meta_description_bn && touched.meta_description_bn}
                                                    helperText={
                                                        errors.meta_description_bn && touched.meta_description_bn
                                                            ? errors.meta_description_bn
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid> */}
                                    <Grid item xs={12}>
                                        <Field name="alt_text">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                    label={t("Enter Alt Text")}
                                                    error={errors.alt_text && touched.alt_text}
                                                    helperText={
                                                        errors.alt_text && touched.alt_text
                                                            ? errors.alt_text
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                        <Field name="alt_text_bn">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                    label={t("Enter Alt Text bn")}
                                                    error={errors.alt_text_bn && touched.alt_text_bn}
                                                    helperText={
                                                        errors.alt_text_bn && touched.alt_text_bn
                                                            ? errors.alt_text_bn
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid> */}
                                    <Grid item xs={12}>
                                        <Field name="button_title">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter Title bn")}
                                                    error={errors.button_title && touched.button_title}
                                                    helperText={
                                                        errors.button_title && touched.button_title
                                                            ? errors.button_title
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="button_url">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter url")}
                                                    error={errors.button_url && touched.button_url}
                                                    helperText={
                                                        errors.button_url && touched.button_url
                                                            ? errors.button_url
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
                                    {t("Close")}
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            )}
        </Dialog>
    );
};

SliderAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
};

export default SliderAdd;
