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
    name: Yup.string().required('Delivery Man is required'),
});

const CustomerTypeAdd = ({ open, handleCloseDialog, handelFatchDeliveryMan, selectedData }) => {
    const showToast = useToast();
    const { t } = useTranslation()
    const language = localStorage.getItem('i18nextLng');
    const [districts, setDistricts] = useState([])
    const [areas, setAreas] = useState([])
    const [selectedDeliveryType, setSelectedDeliveryType] = useState(Object.keys(selectedData).length > 0 ? selectedData.customer_type_id : "")
    const [selectedDistrict, setSelectedDistrict] = useState(Object.keys(selectedData).length > 0 ? selectedData.district : "")
    const [selectedArea, setSelectedArea] = useState("")
    const initialValues = {
        name: Object.keys(selectedData).length > 0 ? selectedData.delivery_man_name : '',
        name_bn: Object.keys(selectedData).length > 0 ? selectedData.delivery_man_name_bn : '',
        address: Object.keys(selectedData).length > 0 ? selectedData.address : '',
        delivery_type_id: Object.keys(selectedData).length > 0 ? selectedData.delivery_type_id : '',
        phone: Object.keys(selectedData).length > 0 ? selectedData.phone : '',
        email: Object.keys(selectedData).length > 0 ? selectedData.email : '',
        district: Object.keys(selectedData).length > 0 ? selectedData.district_id : '',
        area: Object.keys(selectedData).length > 0 ? selectedData.area_id : '',
        address: Object.keys(selectedData).length > 0 ? selectedData.address : '',
        address_bn: Object.keys(selectedData).length > 0 ? selectedData.address_bn : '',
    };
    useEffect(() => {
        getDistricts();
    }, []);
    useEffect(() => {
        setSelectedArea("")
        setSelectedDeliveryType(Object.keys(selectedData).length > 0 ? selectedData.delivery_type_id : "");
        setSelectedDistrict(Object.keys(selectedData).length > 0 ? selectedData.district_id : "")
        if (Object.keys(selectedData).length > 0 && selectedData.area_id) {
            getArea(selectedData.district_id);
            setSelectedArea(Object.keys(selectedData).length > 0 ? selectedData.area_id : "")
        }

    }, [selectedData]);

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
    const handleDeliveryType = (e) => {
        setSelectedDeliveryType(e.target.value);
    }
    const handleDistrict = (e) => {
        setSelectedDistrict(e.target.value);
    }
    const handleArea = (e) => {
        setSelectedArea(e.target.value);
    }

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('delivery_man_name', values.name);
            formData.append('delivery_man_name_bn', values.name_bn);
            formData.append('delivery_type_id', selectedDeliveryType ?? '');
            formData.append('phone', values.phone ?? '');
            formData.append('email', values.email ?? '');
            formData.append('address', values.address ?? '');
            formData.append('address_bn', values.address_bn ?? '');
            formData.append('district_id', selectedDistrict ?? '');
            formData.append('area_id', selectedArea ?? '');
            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/deliveryMans/${selectedData.id}`, formData, {
                headers: headers
            }) : await axios.post(`${baseUrl}/deliveryMans`, formData, {
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
                    {({ errors, touched }) => (
                        <Form>
                            <DialogTitle>{Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t('Your Delivery Man ')}</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-filled-label">{t('Delivery Type')}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                fullWidth
                                                value={selectedDeliveryType}
                                                label="Delivery Type"
                                                onChange={handleDeliveryType}
                                            >
                                                <MenuItem value="" selected>
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="1" selected>
                                                    <em>Courier</em>
                                                </MenuItem>
                                                <MenuItem value="2" selected>
                                                    <em>Person</em>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-filled-label">{t('District')}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                fullWidth
                                                value={selectedDistrict}
                                                label="District"
                                                onChange={(e) => { handleDistrict(e); getArea(e.target.value) }}
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
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-filled-label">{t('Area')}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                fullWidth
                                                value={selectedArea}
                                                label="Area"
                                                onChange={handleArea}
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
                                        </FormControl>
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
                                    <Grid item xs={12}>
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
                                    <Grid item xs={12}>
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
                                    <Grid item xs={12}>
                                        <Field name="address_bn">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                    label={t("Enter Address Bn")}
                                                    error={errors.address_bn && touched.address_bn}
                                                    helperText={
                                                        errors.address_bn && touched.address_bn
                                                            ? errors.address_bn
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
