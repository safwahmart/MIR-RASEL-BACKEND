import React from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Image from 'views/shared/Image'
import { useTranslation } from 'react-i18next';
import ThumbnailImage from './ThumbnailImage';
import MultipleImage from './MultipleImage';
import VideoThumbnail from './VideoThumbnail';

export default function File({ errors, touched, Field, handleSetData, setFieldValue, values }) {
    const { t } = useTranslation()
    const language = localStorage.getItem('i18nextLng');
    return (
        <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
            {/* Thumbnail Image*/}
            <Grid item xs={12} sm={12}>
                <Grid item xs={12}>
                    <ThumbnailImage setFieldValue={setFieldValue}></ThumbnailImage>
                </Grid>
            </Grid>
            {/* Multiple Image*/}
            <Grid item xs={12}>
                <MultipleImage setFieldValue={setFieldValue} values={values}></MultipleImage>
            </Grid>

            {/* Video Link */}
            <Grid item xs={12} sm={12}>
                <label>Video Link</label>
                <Field name="video_link">
                    {({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            label={t("Video Link")}
                            error={errors.video_link && touched.video_link}
                            helperText={
                                errors.video_link && touched.video_link
                                    ? errors.video_link
                                    : ''
                            }
                        />
                    )}
                </Field>
                <VideoThumbnail setFieldValue={setFieldValue}></VideoThumbnail>
            </Grid>

            {/*Max Order Qty */}
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                <Button variant="contained" className="Save__Btn float-right" sx={{ mr: 2 }} onClick={() => handleSetData("3", 'next')}>
                    Previous
                </Button>
                <Button variant="contained" className="Save__Btn float-right" type='submit'>
                    Save & Next
                </Button>
            </Grid>
        </Grid>
    )
}
