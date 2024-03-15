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
    name: Yup.string().required('Supplier is required'),
});

const CustomerTypeAdd = ({ open, handleCloseDialog, handelFatchSupplier, selectedData }) => {
    const showToast = useToast();
    const { t } = useTranslation()
    const language = localStorage.getItem('i18nextLng');
    const [districts, setDistricts] = useState([])
    const [areas, setAreas] = useState([])
    const [selectedDeliveryType, setSelectedDeliveryType] = useState(Object.keys(selectedData).length > 0 ? selectedData.customer_type_id : "")
    const [selectedDistrict, setSelectedDistrict] = useState(Object.keys(selectedData).length > 0 ? selectedData.district : "")
    const [selectedArea, setSelectedArea] = useState("")
    const initialValues = {
        name: Object.keys(selectedData).length > 0 ? selectedData.supplier_name : '',
        name_bn: Object.keys(selectedData).length > 0 ? selectedData.supplier_name_bn : '',
        phone: Object.keys(selectedData).length > 0 ? selectedData.phone : '',
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
            formData.append('supplier_name', values.name);
            formData.append('supplier_name_bn', values.name_bn);
            formData.append('phone', values.phone ?? '');
            formData.append('address', values.address ?? '');
            formData.append('address_bn', values.address_bn ?? '');
            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/suppliers/${selectedData.id}`, formData, {
                headers: headers
            }) : await axios.post(`${baseUrl}/suppliers`, formData, {
                headers: headers
            });
            if (response.status === 201) {
                showToast('Save Successfully ', 'success');
                handelFatchSupplier()
                handleCloseDialog();
            }
            if (response.status === 200) {
                showToast('Updated Successfully ', 'success');
                handelFatchSupplier()
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
                            <DialogTitle>{Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t('Your Supplier ')}</DialogTitle>
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
