import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Divider, FormControl, FormHelperText, Grid, InputAdornment, TextField } from '@mui/material';
import CreateDrawer from 'ui-component/drawer/CreateDrawer';
import { useTheme } from '@mui/styles';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { ArrowDropDown, CloudUpload } from '@mui/icons-material';
import { statusLists } from 'utils/customDatas';
import SelectImage from './SelectImage';
import promotionsModule from 'store/slices/promotionsModule';
import { useDispatch } from 'react-redux';
import useScriptRef from 'hooks/useScriptRef';

const UpdatePromotionsDrawer = (props) => {
    console.log(props);
    const dispatch = useDispatch();
    const scriptedRef = useScriptRef();
    const theme = useTheme();
    let schema = Yup.object().shape({
        title: Yup.string().max(255).required('Title is required'),
        description: Yup.string().required('Description is required'),
        status: Yup.string().trim().required('Status selection is required'),
        image: Yup.string().required('Image is required')
    });

    return (
        <CreateDrawer {...props} title="Create Promotions">
            <Formik
                initialValues={{
                    title: props?.itemData?.title ? props?.itemData?.title : '',
                    status: props?.itemData?.status ? props?.itemData?.status : '',
                    description: props?.itemData?.description ? props?.itemData?.description : '',
                    image: props?.itemData?.image?.url ? props?.itemData?.image?.url : '',
                    submit: null
                }}
                validationSchema={schema}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    const formData = new FormData();
                    formData.append(`image`, values.image);
                    try {
                        const res = await dispatch(
                            promotionsModule.updatePromotions(
                                props?.itemData?.id,
                                {
                                    title: values.title,
                                    status: values.status,
                                    description: values.description,
                                    _method: 'PATCH'
                                },
                                formData
                            )
                        );
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                            setErrors({
                                submit: res?.errMsg ? res?.errMsg : null
                            });
                        }
                        props.onClose(res);
                    } catch (err) {
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                    <form
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                        // {...others}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <SelectImage
                                    values={values}
                                    prevImage={props?.itemData?.image?.url}
                                    setFieldValue={setFieldValue}
                                    errors={errors}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={Boolean(touched.title && errors.title)}>
                                    <TextField
                                        fullWidth
                                        id="outlined-adornment-title-login"
                                        type="text"
                                        label="Title"
                                        value={values.title}
                                        name="title"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.title && errors.title && (
                                        <FormHelperText error id="standard-weight-helper-text-title">
                                            {errors.title}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth error={Boolean(touched.description && errors.description)}>
                                    <TextField
                                        multiline
                                        rows={2}
                                        id="outlined-adornment-description-login"
                                        type="text"
                                        fullWidth
                                        label="Write Description"
                                        value={values.description}
                                        name="description"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />

                                    {touched.description && errors.description && (
                                        <FormHelperText error id="standard-weight-helper-text-description">
                                            {errors.description}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.status && errors.status)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <Autocomplete
                                        fullWidth
                                        value={values.status}
                                        disableClearable
                                        getOptionLabel={(option) => option}
                                        onChange={(event, newValue) => {
                                            setFieldValue('status', newValue);
                                        }}
                                        autoComplete="off"
                                        selectOnFocus
                                        clearOnBlur
                                        autoHighlight
                                        handleHomeEndKeys
                                        id="status"
                                        options={statusLists}
                                        renderOption={(props, option) => (
                                            <Box component="li" {...props}>
                                                {option}
                                            </Box>
                                        )}
                                        freeSolo
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="status"
                                                onKeyPress={(e) => {
                                                    e.preventDefault();
                                                }}
                                                error={touched.status && Boolean(errors.status)}
                                                helperText={touched.status && errors.status && errors.status}
                                                placeholder="Select Satus"
                                                InputProps={{
                                                    ...params.InputProps,
                                                    sx: { bgcolor: 'grey.0' },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <ArrowDropDown sx={{ color: 'var(--color-gray200)' }} />
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                        </Grid>

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        <Box sx={{ mt: 2, mb: 2 }}>
                            <Button
                                disableElevation
                                color="primary"
                                disabled={isSubmitting}
                                fullWidth
                                size="medium"
                                sx={{
                                    borderRadius: 2,
                                    padding: '0.625rem 1.5rem'
                                }}
                                type="submit"
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </CreateDrawer>
    );
};

export default UpdatePromotionsDrawer;
