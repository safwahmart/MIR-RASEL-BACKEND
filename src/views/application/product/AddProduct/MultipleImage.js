import { CardMedia, CircularProgress, Fab, Grid, Input, InputLabel, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

const ImageWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '4px',
    cursor: 'pointer',
    width: 55,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    '& > svg': {
        verticalAlign: 'sub',
        marginRight: 6
    }
}));


const MultipleImage = ({ setFieldValue, values }) => {
    console.log('multi', values.product_multiple_images);
    const theme = useTheme();
    const [selectedImage, setSelectedImage] = useState([]);
    // const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { t } = useTranslation();

    const handleImageUpload = (event) => {
        const files = event.target.files;
        [...files].map((file, i) => {
            setFieldValue(`product_multiple_images[${i}]`, file)
            if (file) {
                const reader = new FileReader();
                reader.onloadstart = () => {
                    setUploadProgress(0);
                };
                reader.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const progress = Math.round((event.loaded / event.total) * 100);
                        setUploadProgress(progress);
                    }
                };
                reader.onload = () => {
                    // Simulating a delay for upload
                    setTimeout(() => {
                        selectedImage[i] = reader.result;
                        setSelectedImage([
                            ...selectedImage
                        ]);
                        setUploadProgress(100);
                    }, 1500);
                };
                reader.readAsDataURL(file);
            }
        })
    };

    const handleDeleteImage = (index) => {
        values.product_multiple_images.splice(index, 1)
        // setFieldValue(`product_multiple_images[${index}]`, null)
        setSelectedImage(
            selectedImage.filter((a, i) =>
                i !== index
            ));
        setUploadProgress(0);
    };
    console.log('selectedImage', selectedImage.length)
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="subtitle1" align="left">
                    {t("Product Multiple Images") + "*"}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <div>
                    <TextField type="file" id="file-upload-multiple" fullWidth label="Enter Images" onChange={handleImageUpload} sx={{ display: 'none' }} accept="image/*" inputProps={{
                        multiple: true
                    }} />
                    <InputLabel
                        htmlFor="file-upload-multiple"
                        sx={{
                            background: theme.palette.background.default,
                            py: 3.75,
                            px: 0,
                            textAlign: 'center',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            mb: 3,
                            '& > svg': {
                                verticalAlign: 'sub',
                                mr: 0.5
                            }
                        }}
                    >
                        <CloudUploadIcon /> Drop file here to upload
                    </InputLabel>
                </div>
                <Grid container spacing={1}>

                    {/* {selectedImage && (
                      <Grid item>
                      <ImageWrapper>
                          <CardMedia component="img" image={selectedImage} title="Product" />
                      </ImageWrapper>
                  </Grid>

            )} */}

                    {selectedImage.length > 0 && selectedImage.map((file, i) => {
                        return <>
                            <Grid item>

                                <ImageWrapper>
                                    <CardMedia component="img" image={file} title="Brands Logo" />




                                    {/* {uploadProgress > 0 && uploadProgress < 100 && ( */}
                                    <CircularProgress
                                        variant="determinate"
                                        value={uploadProgress}
                                        color="secondary"
                                        sx={{
                                            position: 'absolute',
                                            left: '0',
                                            top: '0',
                                            background: 'rgba(255, 255, 255, .8)',
                                            width: '100% !important',
                                            height: '100% !important',
                                            p: 1.5
                                        }}
                                    />
                                    {/* 
                        )} */}

                                </ImageWrapper>
                            </Grid>
                            <Grid item>
                                <ImageWrapper>
                                    <Fab color="secondary" size="small" onClick={() => handleDeleteImage(i)}>
                                        <CloseIcon />
                                    </Fab>
                                </ImageWrapper>
                            </Grid>
                        </>
                    })}


                </Grid>
            </Grid>


        </>
    );
};

export default MultipleImage;