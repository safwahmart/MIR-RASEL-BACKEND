import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';
import { useTranslation } from 'react-i18next';

const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Social Name is required')
    // slug: Yup.string().required('Slug is required'),
});

const SocialLinkAdd = ({ open, handleCloseDialog, handleFetchSocials, selectedData }) => {
    const showToast = useToast();
    const { t } = useTranslation();
    const initialValues = {
        name: Object.keys(selectedData).length > 0 ? selectedData.name : '',
        url: Object.keys(selectedData).length > 0 ? selectedData.url : '',
        icon: Object.keys(selectedData).length > 0 ? selectedData.icon : '',
    };

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('url', values.url);
            formData.append('icon', values.icon);
            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            const response =
                Object.keys(selectedData).length > 0
                    ? await axios.post(`${baseUrl}/socialLinks/${selectedData.id}`, formData, {
                        headers: headers
                    })
                    : await axios.post(`${baseUrl}/socialLinks`, formData, {
                        headers: headers
                    });
            if (response.status === 201) {
                showToast('Save Successfully ', 'success');
                handleFetchSocials();
                handleCloseDialog();
            }
            if (response.status === 200) {
                showToast('Updated Successfully ', 'success');
                handleFetchSocials();
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
                                {Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t('Your Social Link')}
                            </DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field name="name">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t('Social Link Name') + '*'}
                                                    error={errors.name && touched.name}
                                                    helperText={errors.name && touched.name ? errors.name : ''}
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field name="url">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t('Enter social url') + '*'}
                                                    error={errors.url && touched.url}
                                                    helperText={errors.url && touched.url ? errors.url : ''}
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field name="icon">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t('Enter icon class')}
                                                    error={errors.icon && touched.icon}
                                                    helperText={errors.icon && touched.icon ? errors.icon : ''}
                                                />
                                            )}
                                        </Field>
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

SocialLinkAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default SocialLinkAdd;
