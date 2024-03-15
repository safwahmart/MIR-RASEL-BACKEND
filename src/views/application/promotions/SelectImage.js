import { Box, FormControl, FormHelperText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch } from 'store';
import { imageMimeType } from 'views/utilities/regex';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    image: {
        width: 300,
        display: 'block',
        margin: '15px auto'
    }
}));

export default function SelectImage({ setFieldValue, errors, prevImage, values }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(prevImage ? prevImage : null);

    useEffect(() => {
        let fileReader,
            isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result);
                }
            };
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        };
    }, [file]);

    return (
        <FormControl fullWidth>
            <img
                src={fileDataURL ? fileDataURL : null}
                alt=""
                className={classes.image}
                style={values.image ? { display: 'block' } : { display: 'none' }}
            />
            <label htmlFor="image">
                <input
                    hidden
                    accept="image/*"
                    id="image"
                    name="image"
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file.type.match(imageMimeType)) {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Image type is not valid',
                                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                    variant: 'alert',
                                    alert: {
                                        color: 'error'
                                    },
                                    close: true
                                })
                            );
                            return;
                        }
                        setFile(file);
                        setFieldValue('image', file);
                    }}
                />
                <Box sx={{ border: '1px solid', borderRadius: 2, textAlign: 'center', p: 1, cursor: 'pointer' }}> Upload Photo</Box>
            </label>
            <FormHelperText error id="standard-weight-helper-text-title">
                {errors.image}
            </FormHelperText>
        </FormControl>
    );
}
