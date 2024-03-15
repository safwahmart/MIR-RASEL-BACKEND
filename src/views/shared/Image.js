import { CardMedia, CircularProgress, Fab, Grid, InputLabel, TextField, Typography } from '@mui/material';
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


const Image = ({ setFieldValue }) => {
    const theme = useTheme();
    const [selectedImage, setSelectedImage] = useState(null);
    // const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { t } = useTranslation();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setFieldValue("logo", file)
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
                    setSelectedImage(reader.result);
                    setUploadProgress(100);
                }, 1500);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setFieldValue("logo", null)
        setSelectedImage(null);
        setUploadProgress(0);
    };
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="subtitle1" align="left">
                    {t("Image") + "*"}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <div>
                    <TextField type="file" id="file-upload" fullWidth label="Enter SKU" onChange={handleImageUpload} sx={{ display: 'none' }} />
                    <InputLabel
                        htmlFor="file-upload"
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

                    <Grid item>
                        <ImageWrapper>
                            {selectedImage && (
                                <CardMedia component="img" image={selectedImage} title="Brands Logo" />

                            )}


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

                    {selectedImage && (
                        <Grid item>
                            <ImageWrapper>
                                <Fab color="secondary" size="small" onClick={handleDeleteImage}>
                                    <CloseIcon />
                                </Fab>
                            </ImageWrapper>
                        </Grid>

                    )}

                </Grid>
            </Grid>


        </>
    );
};

export default Image;