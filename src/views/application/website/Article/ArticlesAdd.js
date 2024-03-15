import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField, TextareaAutosize } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';
import Image from 'views/shared/Image';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Banners Name is required')
    // slug: Yup.string().required('Slug is required'),
});

const ArticleAdd = ({ open, handleCloseDialog, handelFatchBanners, selectedData }) => {
    const showToast = useToast();
    const { t } = useTranslation();
    const initialValues = {
        name: Object.keys(selectedData).length > 0 ? selectedData.name : '',
        slug: Object.keys(selectedData).length > 0 ? selectedData.slug : '',
        logo: Object.keys(selectedData).length > 0 ? selectedData.logo : '',
        description: Object.keys(selectedData).length > 0 ? selectedData.description : '',
        meta_title: Object.keys(selectedData).length > 0 ? selectedData.meta_title : '',
        meta_desc: Object.keys(selectedData).length > 0 ? selectedData.meta_desc : '',
        alt_text: Object.keys(selectedData).length > 0 ? selectedData.alt_text : ''
    };

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('slug', values.slug);
            formData.append('description', values.description);
            formData.append('meta_title', values.meta_title ?? '');
            formData.append('meta_desc', values.meta_desc ?? '');
            formData.append('alt_text', values.alt_text ?? '');
            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            if (values.logo) {
                formData.append('image', values.logo);
            }
            const response =
                Object.keys(selectedData).length > 0
                    ? await axios.post(`${baseUrl}/articles/${selectedData.id}`, formData, {
                        headers: headers
                    })
                    : await axios.post(`${baseUrl}/articles`, formData, {
                        headers: headers
                    });
            if (response.status === 201) {
                showToast('Save Successfully ', 'success');
                handelFatchBanners();
                handleCloseDialog();
            }
            if (response.status === 200) {
                showToast('Updated Successfully ', 'success');
                handelFatchBanners();
                handleCloseDialog();
            }
            if (response?.errors?.length > 0) {
                showToast(response.errors[0], 'error');
            }
            handleCloseDialog();
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
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ errors, touched, values, setFieldValue }) => (
                        <Form>
                            <DialogTitle>
                                {Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t('Your Articles')}
                            </DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field name="name">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t('Article Name') + '*'}
                                                    error={errors.name && touched.name}
                                                    helperText={errors.name && touched.name ? errors.name : ''}
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
                                                    label={t('Enter slug')}
                                                    error={errors.slug && touched.slug}
                                                    helperText={errors.slug && touched.slug ? errors.slug : ''}
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field name="description">
                                            {({ field }) => (
                                                <ReactQuill
                                                    {...field}
                                                    name="description" // Add name attribute here
                                                    theme="snow"
                                                    value={values.description}
                                                    onChange={(val) => setFieldValue('description', val)}
                                                    onBlur={(e) => {
                                                        if (touched.description) {
                                                            if (!values.description) {
                                                                // If description is empty, show an error message
                                                                showToast('Description is required', 'error');
                                                            }
                                                        }
                                                    }}
                                                    modules={{
                                                        toolbar: [
                                                            ['bold', 'italic', 'underline', 'strike'],
                                                            [{ align: [] }],
                                                            [{ list: 'ordered' }, { list: 'bullet' }],
                                                            ['link', 'image'],
                                                            ['clean']
                                                        ]
                                                    }}
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
                                                    label={t('Enter meta title')}
                                                    error={errors.meta_title && touched.meta_title}
                                                    helperText={errors.meta_title && touched.meta_title ? errors.meta_title : ''}
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field name="meta_desc">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t('Enter meta description')}
                                                    error={errors.meta_desc && touched.meta_desc}
                                                    helperText={errors.meta_desc && touched.meta_desc ? errors.meta_desc : ''}
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field name="alt_text">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                    label={t('Enter Alt Text')}
                                                    error={errors.alt_text && touched.alt_text}
                                                    helperText={errors.alt_text && touched.alt_text ? errors.alt_text : ''}
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Image setFieldValue={setFieldValue}></Image>
                                        <ErrorMessage name="image" component="div" className="error" />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <AnimateButton>
                                    <Button type="submit" variant="contained">
                                        {Object.keys(selectedData).length > 0 ? t('Update') : t('Create')}
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

ArticleAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default ArticleAdd;
