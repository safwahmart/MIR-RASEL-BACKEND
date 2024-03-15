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
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Warehouse name is required'),
    name_bn: Yup.string().required('Warehouse bn name is required'),
    area_id: Yup.string().required('Area is required')
});

const WareHouseAdd = ({ open, handleCloseDialog, handelFatchWareHouses, selectedData }) => {
    const showToast = useToast();
    const [wareHouses, setWareHouses] = useState([]);
    const { t } = useTranslation();
    const initialValues = {
        name: Object.keys(selectedData).length > 0 ? selectedData.name : '',
        name_bn: Object.keys(selectedData).length > 0 ? selectedData.name_bn : '',
        area_id: Object.keys(selectedData).length > 0 ? selectedData.area_id : '',
        contact_no: Object.keys(selectedData).length > 0 ? selectedData.contact_no : '',
        bin_no: Object.keys(selectedData).length > 0 ? selectedData.bin_no : '',
        address: Object.keys(selectedData).length > 0 ? selectedData.address : '',
        address_bn: Object.keys(selectedData).length > 0 ? selectedData.address_bn : ''
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
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('name_bn', values.name_bn);
            formData.append('address_bn', values.address_bn);
            formData.append('address', values.address);
            formData.append('bin_no', values.bin_no);
            formData.append('contact_no', values.contact_no);
            formData.append('area_id', values.area_id);
            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            const response =
                Object.keys(selectedData).length > 0
                    ? await axios.post(`${baseUrl}/wareHouses/${selectedData.id}`, formData, {
                        headers: headers
                    })
                    : await axios.post(`${baseUrl}/wareHouses`, formData, {
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
                                {Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t('Your Attribute')}
                            </DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <InputLabel id="demo-simple-select-filled-label">{t('Area')}</InputLabel>
                                        <Field name="area_id">
                                            {({ field }) => (
                                                <Select {...field} fullWidth label="Area" error={errors.area_id && touched.area_id}>
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {wareHouses.length > 0 &&
                                                        wareHouses.map((option, index) => {
                                                            return (
                                                                <MenuItem key={index} value={option.id}>
                                                                    {language === 'bn' ? option.name_bn : option.name}
                                                                </MenuItem>
                                                            );
                                                        })}
                                                </Select>
                                            )}
                                        </Field>
                                        {errors.area_id && touched.area_id ? <div style={{ color: 'red' }}>{errors.area_id}</div> : null}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field name="name">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t('Enter Warehouse Name') + '*'}
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
                                                    label={t('Enter Warehouse Name bn') + '*'}
                                                    error={errors.name_bn && touched.name_bn}
                                                    helperText={errors.name_bn && touched.name_bn ? errors.name_bn : ''}
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="contact_no">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t('Enter Contact No')}
                                                    error={errors.contact_no && touched.contact_no}
                                                    helperText={errors.contact_no && touched.contact_no ? errors.contact_no : ''}
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="bin_no">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t('Enter BIN No')}
                                                    error={errors.bin_no && touched.bin_no}
                                                    helperText={errors.bin_no && touched.bin_no ? errors.bin_no : ''}
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
                                                    label={t('Enter Address')}
                                                    error={errors.address && touched.address}
                                                    helperText={errors.address && touched.address ? errors.address : ''}
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
                                                    label={t('Enter Address Bn')}
                                                    error={errors.address_bn && touched.address_bn}
                                                    helperText={errors.address_bn && touched.address_bn ? errors.address_bn : ''}
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
