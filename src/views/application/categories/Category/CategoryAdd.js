import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
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
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Brands Name is required'),
    meta_title: Yup.string().required('Meta Title Name is required'),
    meta_description: Yup.string().required('Meta Description Name is required'),
    description: Yup.string().required().max(255, 'Description is too long'),
    logo: Yup.string().required().max(255, 'Brands Logo is required'),
});

const CategoryAdd = ({ open, handleCloseDialog, handelFatchBrands }) => {
    const showToast = useToast();
    const initialValues = {
        name: '',
        meta_title: '',
        meta_description: '',
        logo: null,
        description: '',
    };

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('meta_title', values.meta_title);
            formData.append('meta_description', values.meta_description);
            formData.append('description', values.description);
            if (values.logo) {
                formData.append('logo', values.logo);
            }
            const response = await axios.post(`${baseUrl}/brands`, formData, {
                headers: headers
            });
            console.log(response.data.success);
            if (response.data.success) {
                showToast(response.data.message, 'success');
                handelFatchBrands()
                handleCloseDialog();
            }
            handleCloseDialog()
        } catch (error) {
            console.error(error);
        }
    };
    const [categoriesTypeList, setCategoriesTypeList] = React.useState([]);

    const handleFetchCategoriesType = React.useCallback(
        async () => {
            try {
                const data = await axios.get(`${baseUrl}/category-type` ,{
                    headers:headers
                });
                setCategoriesTypeList(data?.data?.data);
                

            } catch (err) {
                console.error(err);
            }
          

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [])


        React.useEffect(() => {
            handleFetchCategoriesType();
          }, [handleFetchCategoriesType]);

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
                            <DialogTitle>Add Your Brands</DialogTitle>
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
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Select Category*"
                                    // value={currency}
                                    fullWidth
                                    // onChange={handleSelectChange}
                                    helperText="Please select Category"
                                >
                                    {categoriesTypeList.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
            )}
        </Dialog>
    );
};

CategoryAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
};

export default CategoryAdd;
