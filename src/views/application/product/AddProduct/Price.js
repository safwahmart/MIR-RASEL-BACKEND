import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

export default function Price({ errors, touched, Field, handleSetData, selectedVatTypeId }) {
    const { t } = useTranslation()
    const language = localStorage.getItem('i18nextLng');
    return (
        <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
            {/* Purchase Price */}
            <Grid item xs={12} sm={4}>
                <label>{t("Purchase Price")}</label>
                <Field name="purchase_price">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            label={t("Purchase Price")}
                            error={errors.purchase_price && touched.purchase_price}
                            helperText={
                                errors.purchase_price && touched.purchase_price
                                    ? errors.purchase_price
                                    : ''
                            }
                        />
                    )}
                </Field>
            </Grid>

            {/* Wholesale Price */}
            <Grid item xs={12} sm={4}>
                <label>{t("Wholesale Price")}</label>
                <Field name="wholesale_price">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            label={t("Wholesale Price")}
                            error={errors.wholesale_price && touched.wholesale_price}
                            helperText={
                                errors.wholesale_price && touched.wholesale_price
                                    ? errors.wholesale_price
                                    : ''
                            }
                        />
                    )}
                </Field>
            </Grid>

            {/* Sale Price */}
            <Grid item xs={12} sm={4}>
                <label>{t("Sale Price")}</label>
                <Field name="sale_price">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            label={t("Sale Price")}
                            error={errors.sale_price && touched.sale_price}
                            helperText={
                                errors.sale_price && touched.sale_price
                                    ? errors.sale_price
                                    : ''
                            }
                        />
                    )}
                </Field>
            </Grid>

            {/* VAT */}
            <Grid item xs={12} sm={4}>
                <label>
                    {t("VAT")} <span></span>
                </label>

                <div className="d_flex">
                    <Field name="vat">
                        {({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                variant="outlined"
                                label={t("VAT")}
                                error={errors.vat && touched.vat}
                                helperText={
                                    errors.vat && touched.vat
                                        ? errors.vat
                                        : ''
                                }
                            />
                        )}
                    </Field>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{t("Type")}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedVatTypeId}
                            label="Age"
                            onChange={(e) => handleSetData(e.target.value, 'vat_type')}
                        >
                            <MenuItem value={10}>Percentage</MenuItem>
                            <MenuItem value={20}>Flat</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </Grid>

            {/* Discount (%) */}
            <Grid item xs={12} sm={4}>
                <label>{t("Discount")}(%)</label>
                <Field name="discount">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            label={t("Discount")}
                            error={errors.discount && touched.discount}
                            helperText={
                                errors.discount && touched.discount
                                    ? errors.discount
                                    : ''
                            }
                        />
                    )}
                </Field>
            </Grid>

            {/* Discount (Flat) */}
            <Grid item xs={12} sm={4}>
                <label>{t("Discount(Flat)")}</label>
                <Field name="discount_flat">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            label={t("Discount(Flat)")}
                            error={errors.discount_flat && touched.discount_flat}
                            helperText={
                                errors.discount_flat && touched.discount_flat
                                    ? errors.discount_flat
                                    : ''
                            }
                        />
                    )}
                </Field>
            </Grid>
            {/* App Price */}
            <Grid item xs={12} sm={4}>
                <label>{t("App Price")}</label>
                <Field name="app_price">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            label={t("App Price")}
                            error={errors.app_price && touched.app_price}
                            helperText={
                                errors.app_price && touched.app_price
                                    ? errors.app_price
                                    : ''
                            }
                        />
                    )}
                </Field>
            </Grid>

            {/*Max Order Qty */}
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                <Button variant="contained" className="Save__Btn float-right" sx={{ mr: 2 }} onClick={() => handleSetData("1", 'next')}>
                    Previous
                </Button>
                <Button variant="contained" className="Save__Btn float-right" type='submit'>
                    Save & Next
                </Button>
            </Grid>
        </Grid>
    )
}
