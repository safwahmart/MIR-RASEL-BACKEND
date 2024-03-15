import React, { useState } from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next';

export default function Advance({ errors, touched, Field, handleSetData, selectedWarehouseId }) {
    const { t } = useTranslation()
    return (
        <Grid container alignItems="center" spacing={3}>
            {/* Warehouse*/}
            <Grid item xs={12} sm={4}>
                <label>{t("Warehouse")}</label>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedWarehouseId}
                        label="Age"
                        onChange={(e) => handleSetData(e.target.value, 'warehouse_id')}
                    >
                        <MenuItem value={10}>Main ware House</MenuItem>
                        <MenuItem value={20}>Flat</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {/* Lot*/}
            <Grid item xs={12} sm={4}>
                <label>{t("Lot")}</label>
                <Field name="lot">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            label={t("Lot")}
                            error={errors.lot && touched.lot}
                            helperText={
                                errors.lot && touched.lot
                                    ? errors.lot
                                    : ''
                            }
                        />
                    )}
                </Field>
            </Grid>

            {/* Expire Date */}
            <Grid item xs={12} sm={4}>
                <label>{("Expire Date")}</label>
                <Field name="expire_date">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            type='date'
                            variant="outlined"
                            label={t("Expire Date")}
                            error={errors.expire_date && touched.expire_date}
                            helperText={
                                errors.expire_date && touched.expire_date
                                    ? errors.expire_date
                                    : ''
                            }
                        />
                    )}
                </Field>
            </Grid>

            {/* Opening Qty */}
            <Grid item xs={12} sm={4}>
                <label>{t("Opening Qty")}</label>
                <Field name="opening_qty">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            label={t("Opening Qty")}
                            error={errors.opening_qty && touched.opening_qty}
                            helperText={
                                errors.opening_qty && touched.opening_qty
                                    ? errors.opening_qty
                                    : ''
                            }
                        />
                    )}
                </Field>
            </Grid>

            {/* Expire Note */}
            <Grid item xs={12} sm={4}>
                <label>{t("Expire Note")}</label>
                <Field name="expire_note">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            label={t("Expire Note")}
                            error={errors.expire_note && touched.expire_note}
                            helperText={
                                errors.expire_note && touched.expire_note
                                    ? errors.expire_note
                                    : ''
                            }
                        />
                    )}
                </Field>
            </Grid>

            {/*Max Order Qty */}
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                <Button variant="contained" className="Save__Btn float-right" sx={{ mr: 2 }} onClick={() => handleSetData("4", 'next')}>
                    Previous
                </Button>
                <Button type="submit" variant="contained" className="Save__Btn float-right"
                >
                    Save
                </Button>
            </Grid>
        </Grid>
    )
}
