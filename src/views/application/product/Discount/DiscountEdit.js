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
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
    offer_id: Yup.string().required('Offer Id  is required'),
});

const DiscountAdd = ({ open, handleCloseDialog, handelFatchDiscount, selectedData }) => {
    const showToast = useToast();
    const { t } = useTranslation()
    const language = localStorage.getItem('i18nextLng');
    const [offers, setOffers] = useState([])
    const [areas, setAreas] = useState([])
    const [selectedOffer, setSelectedOffer] = useState(Object.keys(selectedData).length > 0 ? selectedData.offer_id : "")
    const initialValues = {
        offer_id: Object.keys(selectedData).length > 0 ? selectedData.offer_id : '',
        product_id: Object.keys(selectedData).length > 0 ? selectedData.product_id : '',
        product_name: Object.keys(selectedData).length > 0 ? selectedData.product_name : '',
        product_name_bn: Object.keys(selectedData).length > 0 ? selectedData.product_name_bn : '',
        sale_price: Object.keys(selectedData).length > 0 ? selectedData.sale_price : '',
        discount_percent: Object.keys(selectedData).length > 0 ? selectedData.discount_percent : '',
        discount_flat: Object.keys(selectedData).length > 0 ? selectedData.discount_flat : '',
        start_date: Object.keys(selectedData).length > 0 ? selectedData.start_date : '',
        end_date: Object.keys(selectedData).length > 0 ? selectedData.end_date : '',
    };
    useEffect(() => {
        getOffers();
    }, []);
    useEffect(() => {
        setSelectedOffer(Object.keys(selectedData).length > 0 ? selectedData.offer_id : "");

    }, [selectedData]);

    const getOffers = async () => {
        const response = await axios.get(`${baseUrl}/offers`, {
            headers: headers
        });
        setOffers(response.data.data);
    }
    const handleOffer = (e) => {
        setSelectedOffer(e.target.value);
    }

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('product_id', selectedData.product_id);
            formData.append('offer_id', selectedOffer);
            formData.append('discount_percent', values.discount_percent ?? '');
            formData.append('discount_flat', values.discount_flat ?? '');
            formData.append('start_date', values.start_date ?? '');
            formData.append('end_date', values.end_date ?? '');
            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            const response = await axios.post(`${baseUrl}/discounts/${selectedData.id}`, formData, {
                headers: headers
            });
            if (response.status === 201) {
                showToast('Save Successfully ', 'success');
                handelFatchDiscount()
                handleCloseDialog();
            }
            if (response.status === 200) {
                showToast('Updated Successfully ', 'success');
                handelFatchDiscount()
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
                            <DialogTitle>{Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t('Your Discount ')}</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-filled-label">{t('Offer')}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                fullWidth
                                                value={selectedOffer}
                                                label="Offer"
                                                onChange={handleOffer}
                                            >
                                                <MenuItem value="" selected>
                                                    <em>None</em>
                                                </MenuItem>
                                                {offers.length > 0 && offers.map((option, index) => {
                                                    return <MenuItem key={index} value={option.id}>
                                                        {language === 'bn' ? option.name_bn : option.name}
                                                    </MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <label>{t("Product Name")}</label>
                                        <Field name="name">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    disabled
                                                    value={selectedData.product_name}
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
                                        <label>{t("MRP")}</label>
                                        <Field name="name_bn">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    disabled
                                                    value={selectedData.sale_price}
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
                                        <Field name="discount_percent">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    type='number'
                                                    label={t("Discount Percent")}
                                                    error={errors.discount_percent && touched.discount_percent}
                                                    helperText={
                                                        errors.discount_percent && touched.discount_percent
                                                            ? errors.discount_percent
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="discount_flat">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    type='number'
                                                    label={t("Discount Flat")}
                                                    error={errors.discount_flat && touched.discount_flat}
                                                    helperText={
                                                        errors.discount_flat && touched.discount_flat
                                                            ? errors.discount_flat
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="start_date">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    type='date'
                                                    label={t("Start Date")}
                                                    error={errors.start_date && touched.start_date}
                                                    helperText={
                                                        errors.start_date && touched.start_date
                                                            ? errors.start_date
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="end_date">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    type='date'
                                                    label={t("End Date")}
                                                    error={errors.end_date && touched.end_date}
                                                    helperText={
                                                        errors.end_date && touched.end_date
                                                            ? errors.end_date
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

DiscountAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
};

export default DiscountAdd;
