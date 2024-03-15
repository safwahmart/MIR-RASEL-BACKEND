import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Variation name is required'),
});

const AreaAdd = ({ open, handleCloseDialog, handelFatchVariation, selectedData }) => {
    const showToast = useToast();
    const [areas, setAreas] = useState([])
    const [selectedType, setSelectedType] = useState(Object.keys(selectedData).length > 0 ? selectedData.product_upload_id : "")
    const { t } = useTranslation();
    const initialValues = {
        product_upload_id: Object.keys(selectedData).length > 0 ? selectedData.product_upload_id : '',
        name: Object.keys(selectedData).length > 0 ? selectedData.name : '',
        name_bn: Object.keys(selectedData).length > 0 ? selectedData.name_bn : '',
        product_price: Object.keys(selectedData).length > 0 ? selectedData.product_price : '',
        sale_price: Object.keys(selectedData).length > 0 ? selectedData.sale_price : '',
        opening_quantity: Object.keys(selectedData).length > 0 ? selectedData.opening_quantity : '',
    };
    const language = localStorage.getItem('i18nextLng');
    useEffect(() => {
        getAreasData();
    }, []);

    const getAreasData = async () => {
        const response = await axios.get(`${baseUrl}/products`, {
            headers: headers
        });
        setAreas(response.data.data);
    }

    const handleArea = (e) => {
        setSelectedType(e.target.value);
    }

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('product_upload_id', selectedType);
            formData.append('name', values.name);
            formData.append('name_bn', values.name_bn);
            formData.append('product_price', values.product_price);
            formData.append('sale_price', values.sale_price);
            formData.append('opening_quantity', values.opening_quantity);
            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/variations/${selectedData.id}`, formData, {
                headers: headers
            }) : await axios.post(`${baseUrl}/variations`, formData, {
                headers: headers
            });
            if (response.status === 201) {
                showToast('Save Successfully ', 'success');
                handelFatchVariation()
                handleCloseDialog();
            }
            if (response.status === 200) {
                showToast('Updated Successfully ', 'success');
                handelFatchVariation()
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
                    {({ errors, touched }) => (
                        <Form>
                            <DialogTitle>{Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t("Your Variation")}</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <InputLabel id="demo-simple-select-filled-label">{t('Product')}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            fullWidth
                                            value={selectedType}
                                            label="District"
                                            onChange={handleArea}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {areas.length > 0 && areas.map((option, index) => {
                                                return <MenuItem key={index} value={option.id}>
                                                    {language === 'bn' ? option.product_name_bn : option.product_name}
                                                </MenuItem>
                                            })}
                                        </Select>
                                    </Grid>
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
                                        <Field name="name_bn">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter Name bn") + '*'}
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
                                        <Field name="product_price">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Product Price") + '*'}
                                                    error={errors.product_price && touched.product_price}
                                                    helperText={
                                                        errors.product_price && touched.product_price
                                                            ? errors.product_price
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="sale_price">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Sale Price") + '*'}
                                                    error={errors.sale_price && touched.sale_price}
                                                    helperText={
                                                        errors.sale_price && touched.sale_price
                                                            ? errors.sale_price
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="opening_quantity">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Opening Quantity") + '*'}
                                                    error={errors.opening_quantity && touched.opening_quantity}
                                                    helperText={
                                                        errors.opening_quantity && touched.opening_quantity
                                                            ? errors.opening_quantity
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

AreaAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
};

export default AreaAdd;
