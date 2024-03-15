import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormHelperText,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { format, parseISO } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import Customers from 'repositories/Customers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'store/slices/snackbar';
const schema = Yup.object()
    .shape({
        admin_message: Yup.string().min(10).required('Admin message is required'),
        user_message: Yup.string().min(10).required('Customer message is required'),
        to: Yup.date().required('date is required')
    })
    .required();

const BlockMessageDialog = ({ open, handleClose, userId, tableRef }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [valueBasic, setValueBasic] = React.useState(null);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { isSubmitting, errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        let from = format(parseISO(new Date().toISOString()), `yyyy-MM-dd HH:mm:ss`);
        let toDate = format(parseISO(new Date(valueBasic).toISOString()), `yyyy-MM-dd 23:59:59`);
        let updatedData = {
            to: toDate,
            from: from,
            user_message: data.user_message,
            admin_message: data.admin_message
        };
        await handleBlockUser(updatedData, tableRef);
    };

    useEffect(() => {
        register('to');
    }, [register]);

    const handleBlockUser = async (body, tableRef) => {
        try {
            const res = await Customers.block(userId, body);
            if (res.status === 200 && res.message) {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: res.message,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: true
                    })
                );
            }
            await tableRef.current.onQueryChange();
        } catch (error) {
            console.log('error', error);
            dispatch(
                openSnackbar({
                    open: true,
                    message: error.message,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
        }
        reset();
        setValueBasic(null);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            {open && (
                <>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <DialogTitle id="form-dialog-title">Block Customer</DialogTitle>
                        <DialogContent>
                            <Stack spacing={3}>
                                <DialogContentText>
                                    <Typography variant="body2" component="span">
                                        You're about to block a user ({userId}). Please describe admin and the user why are you blocking
                                        this user.
                                    </Typography>
                                </DialogContentText>

                                <TextField
                                    autoFocus
                                    size="small"
                                    name="admin_message"
                                    label="Admin Message"
                                    type="text"
                                    fullWidth
                                    {...register('admin_message')}
                                />

                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.admin_message && errors.admin_message.message}
                                </FormHelperText>

                                <TextField
                                    autoFocus
                                    size="small"
                                    name="user_message"
                                    label="Customer Message"
                                    type="text"
                                    fullWidth
                                    {...register('user_message')}
                                />
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.user_message && errors.user_message.message}
                                </FormHelperText>
                                <Controller
                                    control={control}
                                    name="to"
                                    render={({ field }) => (
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                renderInput={(props) => (
                                                    <TextField placeholder="Select Untill Block" fullWidth {...props} helperText="" />
                                                )}
                                                format="yyyy-MM-dd"
                                                label="Select Untill Block"
                                                value={valueBasic}
                                                name="to"
                                                onChange={(newValue) => {
                                                    setValueBasic(newValue);
                                                    setValue('to', newValue);
                                                }}
                                                disablePast
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.to && errors.to.message}
                                </FormHelperText>
                            </Stack>
                        </DialogContent>
                        <DialogActions sx={{ pr: 2.5 }}>
                            <Button sx={{ color: theme.palette.error.dark }} onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button variant="contained" size="small" type="submit" disabled={isSubmitting}>
                                Notify
                            </Button>
                        </DialogActions>
                    </form>
                </>
            )}
        </Dialog>
    );
};

export default BlockMessageDialog;
