import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useTranslation } from 'react-i18next';

export default function Basic({ errors, touched, Field, handleSetData, selectedBrandId, selectedCategoryId, selectedHighlightId, selectedTagId, selectedUnitId, generateSku, productSku, barcode, generateBarcode, values, handleChange, selectedUserId, selectedCountryId }) {
    const [users, setUsers] = useState([])
    const [highlights, setHighlightTypes] = useState([])
    const [tags, setTags] = useState([])
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [units, setUnits] = useState([])
    const [countries, setCountries] = useState([])
    const { t } = useTranslation()
    const language = localStorage.getItem('i18nextLng');
    useEffect(() => {
        getUsers();
        getHighlightType();
        getTags();
        getCategories();
        getBrands();
        geUnits();
        getCountries();
    }, []);
    const getUsers = async () => {
        const response = await axios.get(`${baseUrl}/customerTypeForProduct`, {
            headers: headers
        });
        setUsers(response.data.data);
    }
    const getHighlightType = async () => {
        const response = await axios.get(`${baseUrl}/highlightTypeForProduct`, {
            headers: headers
        });
        setHighlightTypes(response.data.data);
    }
    const getTags = async () => {
        const response = await axios.get(`${baseUrl}/getTagForProduct`, {
            headers: headers
        });
        setTags(response.data.data);
    }
    const getCountries = async () => {
        const response = await axios.get(`${baseUrl}/getCountry`, {
            headers: headers
        });
        setCountries(response.data.data);
    }
    const getCategories = async () => {
        const response = await axios.get(`${baseUrl}/categoryForProduct`, {
            headers: headers
        });
        setCategories(response.data.data);
    }
    const getBrands = async () => {
        const response = await axios.get(`${baseUrl}/brands`, {
            headers: headers
        });
        setBrands(response.data.data);
    }
    const geUnits = async () => {
        const response = await axios.get(`${baseUrl}/units`, {
            headers: headers
        });
        setUnits(response.data.data);
    }

    return (

        <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
            {/* Assign User */}
            <Grid item xs={12} sm={4}>
                <label>{t('Assign User')}</label>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('Assign User')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedUserId}
                        label="Age"
                        onChange={(e) => handleSetData(e.target.value, 'user_id')}
                    >
                        {users.length > 0 && users.map((option, index) => {
                            return <MenuItem key={index} value={option.id}>
                                {language === 'bn' ? option.name_bn : option.name}
                            </MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>

            {/* Highlight Type */}
            <Grid item xs={12} sm={4}>
                <label>{t('Highlight Type')}</label>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('Highlight Type')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedHighlightId}
                        label="Age"
                        onChange={(e) => handleSetData(e.target.value, 'highlight_id')}
                    >
                        {highlights.length > 0 && highlights.map((option, index) => {
                            return <MenuItem key={index} value={option.id}>
                                {language === 'bn' ? option.name_bn : option.name}
                            </MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>

            {/* Product Tag */}
            <Grid item xs={12} sm={4}>
                <label>{t('Product Tag')}</label>
                <FormControl fullWidth>
                    <InputLabel id="demo-multiple-checkbox-label">{t('Product Tag')}</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        value={selectedTagId}
                        label="Age"
                        onChange={(e) => handleSetData(e.target.value, 'tag_id')}
                        renderValue={(selected) => selected.join(', ')}
                        multiple
                    >
                        {tags.length > 0 && tags.map((option, index) => {
                            return <MenuItem key={index} value={option.id}>
                                {language === 'bn' ? option.name_bn : option.name}
                            </MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>

            {/* Category */}
            <Grid item xs={12} sm={4}>
                <label>{t('Category')} <span>*</span>
                </label>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('Category')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values?.category_id}
                        label="Age"
                        name="category_id"
                        onChange={handleChange}
                    >
                        {categories.length > 0 && categories.map((option, index) => {
                            return <MenuItem key={index} value={option.id}>
                                {language === 'bn' ? option.name_bn : option.name}
                            </MenuItem>
                        })}
                    </Select>
                    {errors.category_id && <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-ss295e-MuiFormHelperText-root">{errors.category_id}</p>}
                </FormControl>
            </Grid>

            {/* Brand */}
            <Grid item xs={12} sm={4}>
                <label>{('Brand')}</label>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('Brand')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedBrandId}
                        label="Age"
                        onChange={(e) => handleSetData(e.target.value, 'brand_id')}
                    >
                        {brands.length > 0 && brands.map((option, index) => {
                            return <MenuItem key={index} value={option.id}>
                                {language === 'bn' ? option.name_bn : option.name}
                            </MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>

            {/* Unit Measure */}
            <Grid item xs={12} sm={4}>
                <label>{('Unit Measure')} <span>*</span>
                </label>

                <div className="d_flex">
                    <Field name="unit">
                        {({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                variant="outlined"
                                label={t("e.g. 10")}
                                error={errors.unit && touched.unit}
                                helperText={
                                    errors.unit && touched.unit
                                        ? errors.unit
                                        : ''
                                }
                            />
                        )}
                    </Field>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{t('Type')}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values?.unit_id}
                            label="Age"
                            name='unit_id'
                            onChange={handleChange}
                        >
                            {units.length > 0 && units.map((option, index) => {
                                return <MenuItem key={index} value={option.id}>
                                    {language === 'bn' ? option.name_bn : option.name}
                                </MenuItem>
                            })}
                        </Select>
                        {errors.unit_id && <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-ss295e-MuiFormHelperText-root">{errors.unit_id}</p>}
                    </FormControl>
                </div>
            </Grid>

            {/* Country Origin */}
            <Grid item xs={12} sm={4}>
                <label>{t('Country Origin')}</label>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('Country Origin')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedCountryId}
                        label="Country"
                        onChange={(e) => handleSetData(e.target.value, 'country_id')}
                    >
                        {countries.length > 0 && countries.map((option, index) => {
                            return <MenuItem key={index} value={option.id}>
                                {language === 'bn' ? option.country_name : option.country_name}
                            </MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>

            {/* Country Origin */}
            <Grid item xs={12} sm={4}>
                <label>{t('Product Name')} <span>*</span>
                </label>
                {/* <TextField id="outlined-basic" label="Product Name" variant="outlined" /> */}
                <Field name="product_name">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            label={t("Product Name")}
                            error={errors.product_name && touched.product_name}
                            helperText={
                                errors.product_name && touched.product_name
                                    ? errors.product_name
                                    : ''
                            }
                        />
                    )}</Field>
            </Grid>
            <Grid item xs={12} sm={4}>
                <label>{t('Product Name bn')} <span>*</span>
                </label>
                {/* <TextField id="outlined-basic" label="Product Name" variant="outlined" /> */}
                <Field name="product_name_bn">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            label={t("Product Name bn")}
                            error={errors.product_name_bn && touched.product_name_bn}
                            helperText={
                                errors.product_name_bn && touched.product_name_bn
                                    ? errors.product_name_bn
                                    : ''
                            }
                        />
                    )}</Field>
            </Grid>

            {/* Country Origin */}
            <Grid item xs={12} sm={4}>
                <label>{t('Product Slug')}</label>
                <Field name="product_slug">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            label={t("Product Slug")}
                            error={errors.product_slug && touched.product_slug}
                            helperText={
                                errors.product_slug && touched.product_slug
                                    ? errors.product_slug
                                    : ''
                            }
                        />
                    )}
                </Field>
            </Grid>

            {/* Country Origin */}
            <Grid item xs={12} sm={4}>
                <label>{t('Product Code')}</label>
                <Field name="product_code">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            label={t("Product Code")}
                            error={errors.product_code && touched.product_code}
                            helperText={
                                errors.product_code && touched.product_code
                                    ? errors.product_code
                                    : ''
                            }
                        />
                    )}
                </Field>
            </Grid>

            {/* Product SKU */}
            <Grid item xs={12} sm={4}>
                <label>{t('Product SKU')}</label>
                <div className="pos__relative">
                    <Field name="product_sku">
                        {({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                variant="outlined"
                                label={t("Product SKU")}
                                error={errors.product_sku && touched.product_sku}
                                helperText={
                                    errors.product_sku && touched.product_sku
                                        ? errors.product_sku
                                        : ''
                                }
                                value={productSku}
                            />
                        )}
                    </Field>
                    <Button className="position__btn" onClick={generateSku}>{t('Generate')}</Button>
                </div>
            </Grid>

            {/* Mfg. Model No */}
            <Grid item xs={12} sm={4}>
                <label>{t('Mfg. Model No')}</label>
                <Field name="mfg_model_no">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            label={t("Mfg. Model No")}
                            error={errors.mfg_model_no && touched.mfg_model_no}
                            helperText={
                                errors.mfg_model_no && touched.mfg_model_no
                                    ? errors.mfg_model_no
                                    : ''
                            }
                        />
                    )}
                </Field>
            </Grid>

            {/*Barcode */}
            <Grid item xs={12} sm={4}>
                <label>{t('Barcode')}</label>
                <div className="pos__relative">
                    <Field name="barcode">
                        {({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                variant="outlined"
                                label={t("Barcode")}
                                error={errors.barcode && touched.barcode}
                                helperText={
                                    errors.barcode && touched.barcode
                                        ? errors.barcode
                                        : ''
                                }
                                value={barcode}
                            />
                        )}
                    </Field>
                    <Button className="position__btn" onClick={generateBarcode}>{t('Generate')}</Button>
                </div>
            </Grid>

            {/*Weight (KG) */}
            <Grid item xs={12} sm={4}>
                <label>{('Weight (KG)')}</label>
                <div className="pos__relative">
                    <Field name="weight">
                        {({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                variant="outlined"
                                label={t("Weight (KG)")}
                                error={errors.weight && touched.weight}
                                helperText={
                                    errors.weight && touched.weight
                                        ? errors.weight
                                        : ''
                                }
                            />
                        )}
                    </Field>
                </div>
            </Grid>

            {/*Alert Quantity */}
            <Grid item xs={12} sm={4}>
                <label>{t('Alert Quantity')}</label>
                <div className="pos__relative">
                    <Field name="alert_quantity">
                        {({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                variant="outlined"
                                label={t("Alert Quantity")}
                                error={errors.alert_quantity && touched.alert_quantity}
                                helperText={
                                    errors.alert_quantity && touched.alert_quantity
                                        ? errors.alert_quantity
                                        : ''
                                }
                            />
                        )}
                    </Field>
                    {/* <Button className="position__btn">{t('Generate')}</Button> */}
                </div>
            </Grid>

            {/*Max Order Qty */}
            <Grid item xs={12} sm={4}>
                <label>{t('Max Order Qty')}</label>
                <div className="pos__relative">
                    <Field name="max_order_qty">
                        {({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                variant="outlined"
                                label={t("Max Order Qty")}
                                error={errors.max_order_qty && touched.max_order_qty}
                                helperText={
                                    errors.max_order_qty && touched.max_order_qty
                                        ? errors.max_order_qty
                                        : ''
                                }
                            />
                        )}
                    </Field>
                </div>
            </Grid>

            {/*Max Order Qty */}
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                <Button variant="contained" className="Save__Btn float-right" sx={{ mr: 2 }}>
                    Back To List
                </Button>
                <Button type='submit' variant="contained" className="Save__Btn float-right">
                    Save & Next
                </Button>
            </Grid>
        </Grid>
    )
}
