import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
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
    name: Yup.string().required('Customer  is required'),
    name_bn: Yup.string().required('Customer Bn is required'),
    email: Yup.string().required('Email  is required'),
    district: Yup.string().required('District is required'),
    area: Yup.string().required('Area is required'),
    customer_type_id: Yup.string().required('Customer Type is required'),
});

const CustomerTypeAdd = ({ open, handleCloseDialog, handelFatchCustomer, selectedData }) => {
    const showToast = useToast();
    const { t } = useTranslation()
    const language = localStorage.getItem('i18nextLng');
    const [customerTypes, setCustomerTypes] = useState([])
    const [districts, setDistricts] = useState([])
    const [areas, setAreas] = useState([])
    const [selectedCustomerType, setSelectedCustomerType] = useState(Object.keys(selectedData).length > 0 ? selectedData.customer_type_id : "")
    const [selectedGender, setSelectedGender] = useState(Object.keys(selectedData).length > 0 ? selectedData.gender : "")
    const [selectedDistrict, setSelectedDistrict] = useState(Object.keys(selectedData).length > 0 ? selectedData.district : "")
    const [selectedArea, setSelectedArea] = useState("")
    const initialValues = {
        name: Object.keys(selectedData).length > 0 ? selectedData.name : '',
        name_bn: Object.keys(selectedData).length > 0 ? selectedData.name_bn : '',
        address: Object.keys(selectedData).length > 0 ? selectedData.address : '',
        gender: Object.keys(selectedData).length > 0 ? selectedData.gender : '',
        customer_type_id: Object.keys(selectedData).length > 0 ? selectedData.customer_type_id : '',
        phone: Object.keys(selectedData).length > 0 ? selectedData.phone : '',
        email: Object.keys(selectedData).length > 0 ? selectedData.email : '',
        zip_code: Object.keys(selectedData).length > 0 ? selectedData.zip_code : '',
        district: Object.keys(selectedData).length > 0 ? selectedData.district : '',
        area: Object.keys(selectedData).length > 0 ? selectedData.area : '',
    };
    useEffect(() => {
        getCustomerType();
        getDistricts();
    }, []);
    useEffect(() => {
        setSelectedArea("")
        setSelectedCustomerType(Object.keys(selectedData).length > 0 ? selectedData.customer_type_id : "");
        setSelectedGender(Object.keys(selectedData).length > 0 ? selectedData.gender : "")
        setSelectedDistrict(Object.keys(selectedData).length > 0 ? selectedData.district : "")
        if (Object.keys(selectedData).length > 0 && selectedData.area) {
            getArea(selectedData.district);
            setSelectedArea(Object.keys(selectedData).length > 0 ? selectedData.area : "")

        }

    }, [selectedData]);

    const getCustomerType = async () => {
        const response = await axios.get(`${baseUrl}/getCustomerTypes`, {
            headers: headers
        });
        setCustomerTypes(response.data.data);
    }
    const getDistricts = async () => {
        const response = await axios.get(`${baseUrl}/districts`, {
            headers: headers
        });
        setDistricts(response.data.data);
    }
    const getArea = async (id) => {
        const response = await axios.get(`${baseUrl}/getArea/${id}`, {
            headers: headers
        });
        setAreas(response.data.data);
    }
    const handleCustomerType = (e) => {
        setSelectedCustomerType(e.target.value);
    }
    const handleDistrict = (e) => {
        setSelectedDistrict(e.target.value);
    }
    const handleArea = (e) => {
        setSelectedArea(e.target.value);
    }
    const handleGender = (e) => {
        setSelectedGender(e.target.value);
    }

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('name_bn', values.name_bn);
            formData.append('customer_type_id', values.customer_type_id ?? '');
            formData.append('phone', values.phone ?? '');
            formData.append('email', values.email ?? '');
            formData.append('gender', selectedGender ?? '');
            formData.append('address', values.address ?? '');
            formData.append('country', values.country ?? '');
            formData.append('district', values.district ?? '');
            formData.append('area', values.area ?? '');
            formData.append('zip_code', values.zip_code ?? '');
            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/customers/${selectedData.id}`, formData, {
                headers: headers
            }) : await axios.post(`${baseUrl}/customers`, formData, {
                headers: headers
            });
            if (response.status === 201) {
                showToast('Save Successfully ', 'success');
                handelFatchCustomer()
                handleCloseDialog();
            }
            if (response.status === 200) {
                showToast('Updated Successfully ', 'success');
                handelFatchCustomer()
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
                    {({ errors, touched, setFieldValue, values, handleChange }) => (
                        <Form>
                            {console.log('values', values)}
                            <DialogTitle>{Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t('Your Customer ')}</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-filled-label">{t('Customer Type')}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                fullWidth
                                                value={values.customer_type_id}
                                                label="Product Type"
                                                onChange={e => setFieldValue('customer_type_id', e.target.value)}
                                                required
                                                error={errors.customer_type_id && touched.customer_type_id}
                                            >
                                                <MenuItem value="" selected>
                                                    <em>None</em>
                                                </MenuItem>
                                                {customerTypes.length > 0 && customerTypes.map((option, index) => {
                                                    return <MenuItem key={index} value={option.id}>
                                                        {language === 'bn' ? option.name_bn : option.name}
                                                    </MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>

                                        {touched.customer_type_id && errors.customer_type_id ? (
                                            <FormHelperText sx={{ color: '#bf3333', marginLeft: '16px !important' }}>
                                                {touched.customer_type_id && errors.customer_type_id}
                                            </FormHelperText>
                                        ) : null}
                                    </Grid>
                                    <Grid item xs={6}>
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
                                    <Grid item xs={6}>
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
                                    <Grid item xs={6}>
                                        <Field name="phone">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    type='number'
                                                    label={t("Enter phone")}
                                                    error={errors.phone && touched.phone}
                                                    helperText={
                                                        errors.phone && touched.phone
                                                            ? errors.phone
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field name="email">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    type='email'
                                                    label={t("Enter email")}
                                                    error={errors.email && touched.email}
                                                    helperText={
                                                        errors.email && touched.email
                                                            ? errors.email
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-filled-label">{t('Gender')}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                fullWidth
                                                value={selectedGender}
                                                label="Gender"
                                                onChange={handleGender}
                                            >
                                                <MenuItem value={1}>Male</MenuItem>
                                                <MenuItem value={2}>Female</MenuItem>
                                                <MenuItem value={3}>Others</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field name="address">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                    label={t("Enter Address")}
                                                    error={errors.address && touched.address}
                                                    helperText={
                                                        errors.address && touched.address
                                                            ? errors.address
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field name="country">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter country")}
                                                    defaultValue={t("Bangladesh")}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    error={errors.country && touched.country}
                                                    helperText={
                                                        errors.country && touched.country
                                                            ? errors.country
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-filled-label">{t('District')}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                fullWidth
                                                value={values.district}
                                                label="District"
                                                name='district'
                                                error={errors.district && touched.district}
                                                onChange={(e) => { setFieldValue('district', e.target.value); getArea(e.target.value) }}
                                            >
                                                <MenuItem value="" selected>
                                                    <em>None</em>
                                                </MenuItem>
                                                {districts.length > 0 && districts.map((option, index) => {
                                                    return <MenuItem key={index} value={option.id}>
                                                        {language === 'bn' ? option.name_bn : option.name}
                                                    </MenuItem>
                                                })}
                                            </Select>
                                            {touched.district && errors.district ? (
                                                <FormHelperText sx={{ color: '#bf3333', marginLeft: '16px !important' }}>
                                                    {touched.district && errors.district}
                                                </FormHelperText>
                                            ) : null}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-filled-label">{t('Area')}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                fullWidth
                                                value={values.area}
                                                label="Area"
                                                name="area"
                                                onChange={handleChange}
                                                error={errors.area && touched.area}
                                            >
                                                <MenuItem value="" selected>
                                                    <em>None</em>
                                                </MenuItem>
                                                {areas.length > 0 && areas.map((option, index) => {
                                                    return <MenuItem key={index} value={option.id}>
                                                        {language === 'bn' ? option.name_bn : option.name}
                                                    </MenuItem>
                                                })}
                                            </Select>
                                            {touched.area && errors.area ? (
                                                <FormHelperText sx={{ color: '#bf3333', marginLeft: '16px !important' }}>
                                                    {touched.area && errors.area}
                                                </FormHelperText>
                                            ) : null}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field name="zip_code">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter zip code")}
                                                    error={errors.zip_code && touched.zip_code}
                                                    helperText={
                                                        errors.zip_code && touched.zip_code
                                                            ? errors.zip_code
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
