import React, { useState } from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next';
import Editor from '@codifytools/react-text-editor';


export default function Description({ errors, touched, Field, handleSetData, setFieldValue, values }) {
    const { t } = useTranslation()
    const language = localStorage.getItem('i18nextLng');
    return (
        <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
            {/* Short Description/SEO Description */}
            <Grid item xs={12} sm={12}>
                <label>{t("Short Description/SEO Description")}</label>
                {/* <ReactRichEditor height={200} /> */}

                <Field name="short_desc">
                    {({ field }) => (
                        <Editor
                            {...field}
                            field="text"
                            html={values.short_desc}
                            classes="example-class"
                            saveCallback={(e) => setFieldValue('short_desc', e.target.value)}
                            // onChange={(e) => setFieldValue('short_desc', e.target.value)}
                            placeholder="Description..."
                        />
                        // <TextField
                        //     {...field}
                        //     fullWidth
                        //     multiline
                        //     rows={3}
                        //     variant="outlined"
                        //     label={t("Short Description/SEO Description")}
                        //     error={errors.short_desc && touched.short_desc}
                        //     helperText={
                        //         errors.short_desc && touched.short_desc
                        //             ? errors.short_desc
                        //             : ''
                        //     }
                        // />
                    )}
                </Field>
            </Grid>

            {/* Meta Title */}
            <Grid item xs={12} sm={12}>
                <label>{t("Meta Title")}</label>
                <Field name="meta_title">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            label={t("Meta Title")}
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

            {/* Meta Description */}
            <Grid item xs={12} sm={12}>
                <label>{t("Meta Description")}</label>
                <Field name="meta_desc">
                    {({ field }) => (
                        // <TextField
                        //     {...field}
                        //     fullWidth
                        //     multiline
                        //     rows={3}
                        //     variant="outlined"
                        //     label={t("Meta Description")}
                        //     error={errors.meta_desc && touched.meta_desc}
                        //     helperText={
                        //         errors.meta_desc && touched.meta_desc
                        //             ? errors.meta_desc
                        //             : ''
                        //     }
                        // />
                        <Editor
                            {...field}
                            field="text"
                            html={values.meta_desc}
                            classes="example-class"
                            saveCallback={(e) => setFieldValue('meta_desc', e.target.value)}
                            placeholder="Meta Description..."
                        />
                    )}
                </Field>
            </Grid>

            {/* Alt Text */}
            <Grid item xs={12} sm={12}>
                <label>{t("Alt Text")}</label>
                <Field name="alt_text">
                    {({ field }) => (
                        // <TextField
                        //     {...field}
                        //     fullWidth
                        //     multiline
                        //     rows={3}
                        //     variant="outlined"
                        //     label={t("Alt Text")}
                        //     error={errors.alt_text && touched.alt_text}
                        //     helperText={
                        //         errors.alt_text && touched.alt_text
                        //             ? errors.alt_text
                        //             : ''
                        //     }
                        // />
                        <Editor
                            {...field}
                            field="text"
                            html={values.alt_text}
                            classes="example-class"
                            saveCallback={(e) => setFieldValue('alt_text', e.target.value)}
                            placeholder="Alt Text..."
                        />
                    )}
                </Field>
            </Grid>

            {/* Description */}
            <Grid item xs={12} sm={12}>
                <label>{t("Description")}</label>
                <Field name="desc">
                    {({ field }) => (
                        // <TextField
                        //     {...field}
                        //     fullWidth
                        //     multiline
                        //     rows={3}
                        //     variant="outlined"
                        //     label={t("Description")}
                        //     error={errors.desc && touched.desc}
                        //     helperText={
                        //         errors.desc && touched.desc
                        //             ? errors.desc
                        //             : ''
                        //     }
                        // />
                        <Editor
                            {...field}
                            field="text"
                            html={values.desc}
                            classes="example-class"
                            saveCallback={(e) => setFieldValue('desc', e.target.value)}
                            placeholder="Description"
                        />
                    )}
                </Field>
            </Grid>

            {/*Max Order Qty */}
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                <Button variant="contained" className="Save__Btn float-right" sx={{ mr: 2 }} onClick={() => handleSetData("2", 'next')}>
                    Previous
                </Button>
                <Button variant="contained" className="Save__Btn float-right" type='submit'>
                    Save & Next
                </Button>
            </Grid>
        </Grid>
    )
}
