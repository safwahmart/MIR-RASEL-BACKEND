import PropTypes from 'prop-types';
import React, {  useCallback } from 'react';
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
import { useLocation, useNavigate } from 'react-router-dom';
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Brands Name is required'),
    meta_title: Yup.string().required('Meta Title Name is required'),
    meta_description: Yup.string().required('Meta Description Name is required'),
    description: Yup.string().required().max(255, 'Description is too long'),
    logo: Yup.mixed()
        .test('fileSize', 'File is too large', (value) => {
            if (value) {
                return value.size <= 500000;
            }
            return true;
        })
        .test('fileFormat', 'Unsupported file format', (value) => {
            if (value) {
                return ['image/jpeg', 'image/png'].includes(value.type);
            }
            return true;
        })
        .required('Brand Logo is required'),
});
const BrandsEdit = ({ open, handleCloseDialog, handelFatchBrands}) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const navigate = useNavigate();
    const [singleBrand, setSingleBrand] = React.useState({})
    const showToast = useToast();
    const initialValues = {
        name: '',
        meta_title: singleBrand?.meta_title,
        meta_description: singleBrand?.meta_description,
        logo: null,
        description: singleBrand?.description,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleFetchSingleBrand = useCallback(
        async () => {
            try {
                const data = await axios.get(`${baseUrl}/brands/${id}`, {
                    headers: headers
                });
                setSingleBrand(data?.data?.data);
                initialValues.name = data?.data?.data?.name;
                initialValues.meta_title = data?.data?.data?.meta_title;
                initialValues.meta_description = data?.data?.data?.meta_description;
                initialValues.description = data?.data?.data?.description;
            } catch (err) {
                console.error(err);
            }
        } , [id]
    )


    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('meta_title', values.meta_title);
            formData.append('meta_description', values.meta_description);
            formData.append('description', values.description);
            if (values.logo) {
                formData.append('logo', values.logo ? values.logo : singleBrand.logo);
            }
            const response = await axios.put(`${baseUrl}/brands/${id}`, formData, {
                headers: headers
            });
            if (response.data.success) {
                showToast(response.data.message, 'success');
                navigate(`/brands`)
           
            }
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        handleFetchSingleBrand();
    }, [handleFetchSingleBrand])
   

    console.log("singleBrand" , singleBrand)
    return (

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched, values, setFieldValue }) => (
                <Form>
                    <DialogTitle>Update Your Brands</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field name="name">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Enter Brands Name*"
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
                                <Field name="meta_title">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Enter meta title*"
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
                            <Grid item xs={12}>
                                <Field name="meta_description">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Enter meta description*"
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
                            <Grid item xs={12}>
                                <Field name="description">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            multiline
                                            rows={3}
                                            label="Enter description*"
                                            error={errors.description && touched.description}
                                            helperText={
                                                errors.description && touched.description
                                                    ? errors.description
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
                                Create
                            </Button>
                        </AnimateButton>
                        <Button variant="text" color="error" onClick={handleCloseDialog}>
                            Close
                        </Button>
                    </DialogActions>
                </Form>
            )}
        </Formik>
        //     )}
        // </Dialog>
    );
};

BrandsEdit.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
};

export default BrandsEdit;
