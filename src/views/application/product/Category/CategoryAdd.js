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
import { Formik, Form, Field, ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';
import Image from 'views/shared/Image';
import { useTranslation } from 'react-i18next';
import CategoryImage from 'views/shared/CategoryImage';
import Banner from 'views/shared/Banner';
import Icon from 'views/shared/Icon';
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Category Name is required'),
    slug: Yup.string().required('Slug is required'),
});

const CategoryAdd = ({ open, handleCloseDialog, handelFatchCategory, selectedData }) => {
    const showToast = useToast();
    const { t } = useTranslation();
    const language = localStorage.getItem('i18nextLng');
    const [parentData, setParentData] = useState([])
    const [productTypes, setProductTypes] = useState([])
    const [selectedParent, setSelectedParent] = useState(Object.keys(selectedData).length > 0 ? selectedData.parent_id : "")
    const [selectedProductType, setSelectedProductType] = useState(Object.keys(selectedData).length > 0 ? selectedData.product_type_id : "")
    const initialValues = {
        name: Object.keys(selectedData).length > 0 ? selectedData.name : '',
        name_bn: Object.keys(selectedData).length > 0 ? selectedData.name_bn : '',
        slug: Object.keys(selectedData).length > 0 ? selectedData.slug : '',
        slug_bn: Object.keys(selectedData).length > 0 ? selectedData.slug_bn : '',
        title: Object.keys(selectedData).length > 0 ? selectedData.title : '',
        title_bn: Object.keys(selectedData).length > 0 ? selectedData.title_bn : '',
        meta_title: Object.keys(selectedData).length > 0 ? selectedData.meta_title : '',
        meta_description: Object.keys(selectedData).length > 0 ? selectedData.meta_description : '',
        serial_number: Object.keys(selectedData).length > 0 ? selectedData.serial_number : '',
        alt_text: Object.keys(selectedData).length > 0 ? selectedData.alt_text : '',
        alt_text_bn: Object.keys(selectedData).length > 0 ? selectedData.alt_text_bn : '',
        category_image: Object.keys(selectedData).length > 0 ? selectedData.category_image : '',
        product_type_id: Object.keys(selectedData).length > 0 ? selectedData.product_type_id : '',
    };

    useEffect(() => {
        getParentData();
        getProductType();
    }, []);

    const getParentData = async () => {
        const response = await axios.get(`${baseUrl}/categories`, {
            headers: headers
        });
        setParentData(response.data.data);
    }
    const getProductType = async () => {
        const response = await axios.get(`${baseUrl}/productTypes`, {
            headers: headers
        });
        setProductTypes(response.data.data);
    }

    const handleParentData = (e) => {
        setSelectedParent(e.target.value);
    }
    const handleProductType = (e) => {
        setSelectedProductType(e.target.value);
    }


    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('name_bn', values.name_bn);
            formData.append('slug', values.slug);
            formData.append('slug_bn', values.slug_bn);
            formData.append('title', values.title ?? "");
            formData.append('title_bn', values.title_bn ?? "");
            formData.append('product_type_id', values.product_type_id ?? "");
            formData.append('parent_id', selectedParent ?? "");
            formData.append('serial_number', values.serial_number ?? "");
            formData.append('alt_text', values.alt_text ?? "");
            formData.append('alt_text_bn', values.alt_text_bn ?? "");
            formData.append('meta_title', values.meta_title ?? "");
            formData.append('meta_desc', values.meta_desc ?? "");
            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            if (values.category_image) {
                formData.append('category_image', values.category_image);
            }
            if (values.banner) {
                formData.append('banner', values.banner);
            }
            if (values.icon) {
                formData.append('icon', values.icon);
            }
            const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/categories/${selectedData.id}`, formData, {
                headers: headers
            }) : await axios.post(`${baseUrl}/categories`, formData, {
                headers: headers
            });
            if (response.status === 201) {
                showToast('Save Successfully ', 'success');
                handelFatchCategory()
                handleCloseDialog();
            }
            if (response.status === 200) {
                showToast('Updated Successfully ', 'success');
                handelFatchCategory()
                handleCloseDialog();
            }
            if (response?.errors?.length > 0) {
                showToast(response.errors[0], 'error');
            }
            handleCloseDialog()
        } catch (error) {
            console.error(error);
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
                    {({ errors, touched, values, setFieldValue }) => (
                        <Form>
                            <DialogTitle>{Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t("Your Category")}</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <InputLabel id="demo-simple-select-filled-label">{t('Parent Category')}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            fullWidth
                                            value={selectedParent}
                                            label="Attribute Type"
                                            onChange={handleParentData}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {parentData.length > 0 && parentData.map((option, index) => {
                                                return <MenuItem key={index} value={option.id}>
                                                    {language === 'bn' ? option.name_bn : option.name}
                                                </MenuItem>
                                            })}
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel id="demo-simple-select-filled-label">{t('Product Type')}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            fullWidth
                                            // value={selectedProductType}
                                            value={values.product_type_id}
                                            label="Product Type"
                                            // onChange={handleProductType}
                                            onChange={e => setFieldValue('product_type_id', e.target.value)}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {productTypes.length > 0 && productTypes.map((option, index) => {
                                                return <MenuItem key={index} value={option.id}>
                                                    {language === 'bn' ? option.name_bn : option.name}
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
                                                    label={t("Enter Category") + '*'}
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
                                                    label={t("Enter Category bn") + '*'}
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
                                        <Field name="slug">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter Slug") + '*'}
                                                    error={errors.slug && touched.slug}
                                                    helperText={
                                                        errors.slug && touched.slug
                                                            ? errors.slug
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="slug_bn">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter Slug bn") + '*'}
                                                    error={errors.slug_bn && touched.slug_bn}
                                                    helperText={
                                                        errors.slug_bn && touched.slug_bn
                                                            ? errors.slug_bn
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="title">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter Title")}
                                                    error={errors.title && touched.title}
                                                    helperText={
                                                        errors.title && touched.title
                                                            ? errors.title
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="title_bn">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter Title bn")}
                                                    error={errors.title_bn && touched.title_bn}
                                                    helperText={
                                                        errors.title_bn && touched.title_bn
                                                            ? errors.title_bn
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field name="meta_title">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter meta title")}
                                                    error={errors.meta_title && touched.meta_title}
                                                    helperText={
                                                        errors.meta_title && touched.meta_title
                                                            ? errors.meta_title
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="meta_desc">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                    label={t("Enter meta description")}
                                                    error={errors.meta_desc && touched.meta_desc}
                                                    helperText={
                                                        errors.meta_desc && touched.meta_desc
                                                            ? errors.meta_desc
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="alt_text">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                    label={t("Enter Alt Text")}
                                                    error={errors.alt_text && touched.alt_text}
                                                    helperText={
                                                        errors.alt_text && touched.alt_text
                                                            ? errors.alt_text
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="alt_text_bn">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                    label={t("Enter Alt Text bn")}
                                                    error={errors.alt_text_bn && touched.alt_text_bn}
                                                    helperText={
                                                        errors.alt_text_bn && touched.alt_text_bn
                                                            ? errors.alt_text_bn
                                                            : ''
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CategoryImage setFieldValue={setFieldValue}></CategoryImage>
                                        <ErrorMessage
                                            name="image"
                                            component="div"
                                            className="error"
                                        />

                                    </Grid>
                                    <Grid item xs={12}>
                                        <Banner setFieldValue={setFieldValue} />
                                        <ErrorMessage
                                            name="banner"
                                            component="div"
                                            className="error"
                                        />

                                    </Grid>
                                    <Grid item xs={12}>
                                        <Icon setFieldValue={setFieldValue} />
                                        <ErrorMessage
                                            name="icon"
                                            component="div"
                                            className="error"
                                        />

                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field name="serial_number">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label={t("Enter Serial Number") + '*'}
                                                    error={errors.serial_number && touched.serial_number}
                                                    helperText={
                                                        errors.serial_number && touched.serial_number
                                                            ? errors.serial_number
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

CategoryAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
};

export default CategoryAdd;
