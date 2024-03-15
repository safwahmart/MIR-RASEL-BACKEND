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
    TextField
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';
import { useTranslation } from 'react-i18next';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { log } from 'util';
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Coupon name is required'),
    name_bn: Yup.string().required('Coupon bn name is required'),
    use_type_id: Yup.string().required('Coupon type is required'),
    discount_type_id: Yup.string().required('Amount type is required'),
    amount: Yup.string().required('Amount is required'),
    max_discount_amount: Yup.string().required('Max discount amount is required')
});

const WareHouseAdd = ({ open, handleCloseDialog, handelFatchWareHouses, selectedData }) => {
    const showToast = useToast();
    const [wareHouses, setWareHouses] = useState([]);
    const [existingCouponNames, setExistingCouponNames] = useState([]);
    const [existingCouponBnNames, setExistingCouponBnNames] = useState([]);

    useEffect(() => {
        fetchExistingCouponNames();
    }, []);

    const fetchExistingCouponNames = async () => {
        try {
            const response = await axios.get(`${baseUrl}/coupons`, {
                headers: headers
            });
            console.log('response', response);
            const names = response.data.data.map((coupon) => coupon.name);
            const bnNames = response.data.data.map((coupon) => coupon.name_bn);
            setExistingCouponNames(names);
            setExistingCouponBnNames(bnNames);
        } catch (error) {
            console.error('Error fetching existing coupon names:', error);
        }
    };

    console.log('existingCouponNames', existingCouponNames);

    const { t } = useTranslation();
    const initialValues = {
        use_type_id: Object.keys(selectedData).length > 0 ? selectedData.use_type_id : '',
        name: Object.keys(selectedData).length > 0 ? selectedData.name : '',
        name_bn: Object.keys(selectedData).length > 0 ? selectedData.name_bn : '',
        start_date: Object.keys(selectedData).length > 0 ? selectedData.start_date : '',
        end_date: Object.keys(selectedData).length > 0 ? selectedData.end_date : '',
        discount_type_id: Object.keys(selectedData).length > 0 ? selectedData.discount_type_id : '',
        amount: Object.keys(selectedData).length > 0 ? selectedData.amount : '',
        max_discount_amount: Object.keys(selectedData).length > 0 ? selectedData.max_discount_amount : '',
        description: Object.keys(selectedData).length > 0 ? selectedData.description : '',
        description_bn: Object.keys(selectedData).length > 0 ? selectedData.description_bn : ''
    };
    const language = localStorage.getItem('i18nextLng');
    useEffect(() => {
        getWareHousesData();
    }, []);

    const getWareHousesData = async () => {
        const response = await axios.get(`${baseUrl}/areas`, {
            headers: headers
        });
        setWareHouses(response.data.data);
    };

    const onSubmit = async (values) => {
        try {
            if (!values.start_date) {
                showToast('Start Date is required', 'error');
                return;
            }
            if (!values.end_date) {
                showToast('End Date is required', 'error');
                return;
            }
            if (existingCouponNames.some((name) => name.toLowerCase() === values.name.toLowerCase())) {
                showToast('Coupon name already exists', 'error');
                return;
            }
            if (existingCouponBnNames.includes(values.name_bn)) {
                showToast('Coupon bn name already exists', 'error');
                return;
            }
            const formData = new FormData();
            formData.append('use_type_id', values.use_type_id);
            formData.append('name', values.name);
            formData.append('name_bn', values.name_bn);
            formData.append('start_date', format(new Date(values.start_date), 'yyyy-MM-dd'));
            formData.append('end_date', format(new Date(values.end_date), 'yyyy-MM-dd'));
            formData.append('discount_type_id', values.discount_type_id);
            formData.append('amount', values.amount);
            formData.append('max_discount_amount', values.max_discount_amount);
            formData.append('description', values.description);
            formData.append('description_bn', values.description_bn);
            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            console.log('formData', values);
            const response =
                Object.keys(selectedData).length > 0
                    ? await axios.post(`${baseUrl}/coupons/${selectedData.id}`, formData, {
                        headers: headers
                    })
                    : await axios.post(`${baseUrl}/coupons`, formData, {
                        headers: headers
                    });
            if (response.status === 201) {
                showToast('Save Successfully ', 'success');
                handelFatchWareHouses();
                handleCloseDialog();
            }
            if (response.status === 200) {
                showToast('Updated Successfully ', 'success');
                handelFatchWareHouses();
                handleCloseDialog();
            }
            if (response?.errors?.length > 0) {
                showToast(response.errors[0], 'error');
            }
            handleCloseDialog();
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
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ errors, touched }) => (
                        <Form>
                            <DialogTitle>
                                {Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t('Your Coupon')}
                            </DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <InputLabel id="demo-simple-select-filled-label">{t('Coupon Type')}</InputLabel>
                                        <Field name="use_type_id">
                                            {({ field }) => (
                                                <Select
                                                    {...field}
                                                    fullWidth
                                                    label="Coupon Type"
                                                    error={errors.use_type_id && touched.use_type_id}
                                                >
                                                    <MenuItem value="">
                                                        <em>Select Coupon Type</em>
                                                    </MenuItem>
                                                    {/* Once option */}
                                                    <MenuItem value="1">{t('Once')}</MenuItem>
                                                    {/* Multiple option */}
                                                    <MenuItem value="2">{t('Multiple')}</MenuItem>
                                                </Select>
                                            )}
                                        </Field>
                                        {errors.use_type_id && touched.use_type_id ? (
                                            <div style={{ color: 'red' }}>{errors.use_type_id}</div>
                                        ) : null}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field name="name">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t('Enter Type Name') + '*'}
                                                    error={errors.name && touched.name}
                                                    helperText={errors.name && touched.name ? errors.name : ''}
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
                                                    label={t('Enter Type Name bn') + '*'}
                                                    error={errors.name_bn && touched.name_bn}
                                                    helperText={errors.name_bn && touched.name_bn ? errors.name_bn : ''}
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field name="start_date">
                                            {({ field }) => (
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        {...field}
                                                        fullWidth
                                                        label={t('Enter Start Date') + '*'}
                                                        value={field.value || null}
                                                        onChange={(value) => {
                                                            const event = { target: { name: field.name, value } };
                                                            field.onChange(event);
                                                        }}
                                                        error={errors.start_date && touched.start_date}
                                                        helperText={errors.start_date && touched.start_date ? errors.start_date : ''}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field name="end_date">
                                            {({ field }) => (
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        {...field}
                                                        fullWidth
                                                        label={t('Enter End Date') + '*'}
                                                        value={field.value || null}
                                                        onChange={(value) => {
                                                            const event = { target: { name: field.name, value } };
                                                            field.onChange(event);
                                                        }}
                                                        error={errors.end_date && touched.end_date}
                                                        helperText={errors.end_date && touched.end_date ? errors.end_date : ''}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel id="demo-simple-select-filled-label">{t('Amount Type')}</InputLabel>
                                        <Field name="discount_type_id">
                                            {({ field }) => (
                                                <Select
                                                    {...field}
                                                    fullWidth
                                                    label="Amount Type"
                                                    error={errors.discount_type_id && touched.discount_type_id}
                                                >
                                                    <MenuItem value="">
                                                        <em>Select Amount Type</em>
                                                    </MenuItem>
                                                    {/* Flat option */}
                                                    <MenuItem value="1">{t('Flat')}</MenuItem>
                                                    {/* Percent option */}
                                                    <MenuItem value="2">{t('Percent')}</MenuItem>
                                                </Select>
                                            )}
                                        </Field>
                                        {errors.discount_type_id && touched.discount_type_id ? (
                                            <div style={{ color: 'red' }}>{errors.discount_type_id}</div>
                                        ) : null}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field name="amount">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t('Enter Amount') + '*'}
                                                    error={errors.amount && touched.amount}
                                                    helperText={errors.amount && touched.amount ? errors.amount : ''}
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="max_discount_amount">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t('Enter Max Discount Amount') + '*'}
                                                    error={errors.max_discount_amount && touched.max_discount_amount}
                                                    helperText={
                                                        errors.max_discount_amount && touched.max_discount_amount
                                                            ? errors.max_discount_amount
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
                                                    label={t('Enter Description') + '*'}
                                                    error={errors.description && touched.description}
                                                    helperText={errors.description && touched.description ? errors.description : ''}
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="description_bn">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                    label={t('Enter Description Bn') + '*'}
                                                    error={errors.description_bn && touched.description_bn}
                                                    helperText={
                                                        errors.description_bn && touched.description_bn ? errors.description_bn : ''
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

WareHouseAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default WareHouseAdd;
