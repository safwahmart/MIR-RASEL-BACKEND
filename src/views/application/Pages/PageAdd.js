import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Slide,
    TextField,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';
import { useTranslation } from 'react-i18next';
import Editor from '@codifytools/react-text-editor';
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
});

const CustomerTypeAdd = ({ open, handleCloseDialog, handelFatchDeliveryMan, selectedData }) => {
    const showToast = useToast();
    const { t } = useTranslation()
    const language = localStorage.getItem('i18nextLng');
    const [selectedSerial, setSelectedSerial] = useState("")
    const initialValues = {
        name: Object.keys(selectedData).length > 0 ? selectedData.page_name : '',
        // name_bn: Object.keys(selectedData).length > 0 ? selectedData.delivery_man_name_bn : '',
        slug: Object.keys(selectedData).length > 0 ? selectedData.page_slug : '',
        serial: Object.keys(selectedData).length > 0 ? selectedData.serial ? selectedData.serial : selectedSerial : selectedSerial,
        page_text: Object.keys(selectedData).length > 0 ? selectedData.page_text : '',
    };
    useEffect(() => {
        if (open === true) {
            getSerial();
            debugger;
        }
    }, [open])

    const getSerial = async () => {
        const response = await axios.get(`${baseUrl}/pages`, {
            headers: headers
        })
        const data = response.data.data;
        let sortedList = data.sort(function (a, b) {
            return a.serial - b.serial;
        });
        console.log('sortedList', sortedList)
        let lastElement = sortedList[sortedList.length - 1];

        setSelectedSerial(parseInt(lastElement.serial) + 1)
    }


    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('page_name', values.name);
            formData.append('page_slug', values.slug ?? '');
            formData.append('serial', selectedSerial ?? '');
            formData.append('page_text', values.page_text ?? '');
            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/pages/${selectedData.id}`, formData, {
                headers: headers
            }) : await axios.post(`${baseUrl}/pages`, formData, {
                headers: headers
            });
            if (response.status === 201) {
                showToast('Save Successfully ', 'success');
                handelFatchDeliveryMan()
                handleCloseDialog();
            }
            if (response.status === 200) {
                showToast('Updated Successfully ', 'success');
                handelFatchDeliveryMan()
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
                    {({ errors, touched, values, setFieldValue }) => (
                        <Form>
                            <DialogTitle>{Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t('Your Pages ')}</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field name="name">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter Name") + '*'}

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
                                        <Field name="slug">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter slug")}
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
                                        <Field name="page_text">
                                            {({ field }) => (
                                                <Editor
                                                    {...field}
                                                    field="text"
                                                    html={values.page_text}
                                                    classes="example-class"
                                                    saveCallback={(e) => setFieldValue('page_text', e.target.value)}
                                                    placeholder="Description..."
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="serial">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter serial")}
                                                    error={errors.serial && touched.serial}
                                                    helperText={
                                                        errors.serial && touched.serial
                                                            ? errors.serial
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
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

CustomerTypeAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
};

export default CustomerTypeAdd;
