import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';
import { useTranslation } from 'react-i18next';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format } from 'date-fns';
import './TimeSlot.css';
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
    time_slot_name: Yup.string().required('Slot Name is required'),
    time_slot_name_bn: Yup.string().required('Slot Bn Name is required'),
    starting_time: Yup.string().required('Starting Time is required'),
    ending_time: Yup.string().required('Ending Time is required'),
    disable_at: Yup.string().required('Disable At is required')
});

const AttributeTypeAdd = ({ open, handleCloseDialog, handelFetchTimeSlots, selectedData }) => {
    const showToast = useToast();
    const { t } = useTranslation();
    console.log('Object.keys(selectedData).length', Object.keys(selectedData).length > 0 ? selectedData.free_delivery_amount : '');
    const parseTime = (timeString) => {
        const date = new Date();
        const [hours, minutes] = timeString.split(':');
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        return date;
    };

    const initialValues = {
        time_slot_name: Object.keys(selectedData).length > 0 ? selectedData.time_slot_name : '',
        time_slot_name_bn: Object.keys(selectedData).length > 0 ? selectedData.time_slot_name_bn : '',
        starting_time: Object.keys(selectedData).length > 0 ? parseTime(selectedData.starting_time) : '',
        ending_time: Object.keys(selectedData).length > 0 ? parseTime(selectedData.ending_time) : '',
        disable_at: Object.keys(selectedData).length > 0 ? parseTime(selectedData.disable_at) : ''
    };


    const onSubmit = async (values) => {
        console.log('values', values);
        try {
            const formData = new FormData();
            formData.append('time_slot_name', values.time_slot_name ?? '');
            formData.append('time_slot_name_bn', values.time_slot_name_bn ?? '');
            formData.append('starting_time', format(values.starting_time, 'hh:mm a') ?? '');
            formData.append('ending_time', format(values.ending_time, 'hh:mm a') ?? '');
            formData.append('disable_at', format(values.disable_at, 'hh:mm a') ?? '');
            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            const response =
                Object.keys(selectedData).length > 0
                    ? await axios.post(`${baseUrl}/timeSlotes/${selectedData.id}`, formData, {
                        headers: headers
                    })
                    : await axios.post(`${baseUrl}/timeSlotes`, formData, {
                        headers: headers
                    });
            if (response.status === 201) {
                showToast('Save Successfully ', 'success');
                handelFetchTimeSlots();
                handleCloseDialog();
            }
            if (response.status === 200) {
                showToast('Updated Successfully ', 'success');
                handelFetchTimeSlots();
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
                                {Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t('Your Time Slot')}
                            </DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field name="time_slot_name">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t('Slot Name') + '*'}
                                                    error={errors.time_slot_name && touched.time_slot_name}
                                                    helperText={
                                                        errors.time_slot_name && touched.time_slot_name ? errors.time_slot_name : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="time_slot_name_bn">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t('Slot Bn Name') + '*'}
                                                    error={errors.time_slot_name_bn && touched.time_slot_name_bn}
                                                    helperText={
                                                        errors.time_slot_name_bn && touched.time_slot_name_bn
                                                            ? errors.time_slot_name_bn
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="starting_time">
                                            {({ field }) => (
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <TimePicker
                                                        {...field}
                                                        fullWidth
                                                        label={t('Starting Time') + '*'}
                                                        value={field.value || null}
                                                        onChange={(value) => {
                                                            const event = { target: { name: field.name, value } };
                                                            field.onChange(event);
                                                        }}
                                                        error={errors.starting_time && touched.starting_time}
                                                        helperText={
                                                            errors.starting_time && touched.starting_time ? errors.starting_time : ''
                                                        }
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="ending_time">
                                            {({ field }) => (
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <TimePicker
                                                        {...field}
                                                        fullWidth
                                                        label={t('Ending Time') + '*'}
                                                        value={field.value || null}
                                                        onChange={(value) => {
                                                            const event = { target: { name: field.name, value } };
                                                            field.onChange(event);
                                                        }}
                                                        error={errors.ending_time && touched.ending_time}
                                                        helperText={errors.ending_time && touched.ending_time ? errors.ending_time : ''}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="disable_at">
                                            {({ field }) => (
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <TimePicker
                                                        {...field}
                                                        fullWidth
                                                        label={t('Disable At') + '*'}
                                                        value={field.value || null}
                                                        onChange={(value) => {
                                                            const event = { target: { name: field.name, value } };
                                                            field.onChange(event);
                                                        }}
                                                        error={errors.disable_at && touched.disable_at}
                                                        helperText={errors.disable_at && touched.disable_at ? errors.disable_at : ''}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
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

AttributeTypeAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default AttributeTypeAdd;
