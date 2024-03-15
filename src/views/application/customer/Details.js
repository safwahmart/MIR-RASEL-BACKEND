import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import Lightbox from 'react-awesome-lightbox';
import { useParams } from 'react-router-dom';

import {
    Avatar,
    AvatarGroup,
    Box,
    CircularProgress,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from '@mui/material';
import customersModule from 'store/slices/customersModule';
import MainCard from 'ui-component/cards/MainCard';
import UserProfileCard from 'ui-component/cards/UserProfileCard';
const Details = (props) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const params = useParams();
    let id = props?.rowData?.id;
    const [selfieLightboxOpen, setSelfieLightboxOpen] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [signLightboxOpen, setSignLightboxOpen] = useState(false);
    const singleLoading = useSelector(customersModule.selectors.singleLoading);
    const data = useSelector(customersModule.selectors.single);
    const getSingleCustomer = useCallback(async () => {
        await dispatch(customersModule.getSingle(id || params.id));
    }, [dispatch, id, params.id]);

    useEffect(() => {
        getSingleCustomer();
    }, [dispatch, getSingleCustomer]);

    if (singleLoading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '20vh' }}>
                <CircularProgress />
            </div>
        );
    }

    const generateSelfieImages = () => {
        let images = [];
        images.unshift(
            { title: 'Selfie Left Image', url: data?.selfie_left?.url },
            { title: 'Selfie Middle Image', url: data?.selfie_middle?.url },
            { title: 'Selfie Right Image', url: data?.selfie_right?.url }
        );
        return images;
    };
    const generateImages = () => {
        let images = [];
        images.unshift({
            title: 'Nid Back Image',
            url: data?.account?.nid_back?.url
        });

        images.unshift({ title: 'Nid Front Image', url: data?.account?.nid_front?.url });
        return images;
    };

    const generateSignImages = () => {
        let images = [];
        images.unshift({
            title: 'Signature Image',
            url: data?.account?.signature?.url
        });
        return images;
    };
    const selfieImages = generateSelfieImages();
    const images = generateImages();
    const signImages = generateSignImages();

    return (
        <MainCard>
            <UserProfileCard name={data?.name} profile={data?.selfie_middle?.url} phone={data?.mobile} email={data?.email} />
            <TableContainer>
                <Table
                    sx={{
                        '& td': {
                            whiteSpace: 'nowrap'
                        },
                        '& td:first-of-type': {
                            pl: 0
                        },
                        '& td:last-of-type': {
                            pr: 0,
                            minWidth: 260
                        },
                        '& tbody tr:last-of-type  td': {
                            borderBottom: 'none'
                        },
                        '& .MuiAvatar-root': {
                            width: '200px',
                            height: '100px',
                            borderRadius: '12px'
                        },
                        [theme.breakpoints.down('xl')]: {
                            '& tr:not(:last-of-type)': {
                                borderBottom: '1px solid',
                                borderBottomColor: theme.palette.mode === 'dark' ? 'rgb(132, 146, 196, .2)' : 'rgba(224, 224, 224, 1)'
                            },
                            '& td': {
                                display: 'inline-block',
                                borderBottom: 'none',
                                pl: 0
                            },
                            '& td:first-of-type': {
                                display: 'block'
                            }
                        }
                    }}
                >
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Full Name (Bangla): &nbsp;</Typography>
                                            <Typography variant="caption">{data?.account?.full_name_bn}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Full Name (English): &nbsp;</Typography>
                                            <Typography variant="caption">{data?.account?.full_name_en}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Date of Birth: &nbsp;</Typography>
                                            <Typography variant="caption">{data?.account?.dob}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Gender: &nbsp;</Typography>
                                            <Typography variant="caption">{data?.account?.gender}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Father Name (Bangla): &nbsp;</Typography>
                                            <Typography variant="caption">{data?.account?.father_name_bn}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Father Name (English): &nbsp;</Typography>
                                            <Typography variant="caption">{data?.account?.father_name_en} </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Mother Name (Bangla): &nbsp;</Typography>
                                            <Typography variant="caption">{data?.account?.mother_name_bn}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Mother Name (English): &nbsp;</Typography>
                                            <Typography variant="caption">{data?.account?.mother_name_en} </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Guardian Name: &nbsp;</Typography>
                                            <Typography variant="caption">{data?.account?.guardian_name} </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Religion: &nbsp;</Typography>
                                            <Typography variant="caption">{data?.account?.religion} </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Permanent Address (Bangla): &nbsp;</Typography>
                                            <Typography variant="caption">{data?.account?.permanent_address?.BN} </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Permanent Address (English): &nbsp;</Typography>
                                            <Typography variant="caption">{data?.account?.permanent_address?.EN} </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Present Address (Bangla): &nbsp;</Typography>
                                            <Typography variant="caption">{data?.account?.present_address?.BN} </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Present Address (English): &nbsp;</Typography>
                                            <Typography variant="caption">{data?.account?.present_address?.EN} </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Operator: &nbsp;</Typography>
                                            <Typography variant="caption">{data?.operator} </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Status: &nbsp;</Typography>
                                            <Typography variant="caption">{data?.status} </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">TIN: &nbsp;</Typography>
                                            <Typography variant="caption">{data?.account?.tin} </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">National ID: &nbsp;</Typography>
                                            <Typography variant="caption">{data?.account?.nid} </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Selfie Images : &nbsp;</Typography>

                                            {selfieImages[0]?.url && selfieLightboxOpen ? (
                                                <Lightbox images={selfieImages} onClose={() => setSelfieLightboxOpen(false)} />
                                            ) : null}
                                            <AvatarGroup
                                                max={4}
                                                onClick={() => selfieImages[0]?.url && setSelfieLightboxOpen(!selfieLightboxOpen)}
                                            >
                                                {selfieImages &&
                                                    selfieImages?.map((img, index) => (
                                                        <Avatar alt={img?.title} key={index} src={img?.url} />
                                                    ))}
                                            </AvatarGroup>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">National ID Images: &nbsp;</Typography>

                                            {images[0]?.url && lightboxOpen ? (
                                                <Lightbox images={images} onClose={() => setLightboxOpen(false)} />
                                            ) : null}
                                            <AvatarGroup max={4} onClick={() => images[0]?.url && setLightboxOpen(!lightboxOpen)}>
                                                {images &&
                                                    images?.map((img, index) => <Avatar alt={img?.title} key={index} src={img?.url} />)}
                                            </AvatarGroup>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} lg={6}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h6">Signature Images: &nbsp;</Typography>
                                            {signImages[0].url && signLightboxOpen ? (
                                                <Lightbox images={signImages} onClose={() => setSignLightboxOpen(false)} />
                                            ) : null}
                                            <AvatarGroup max={4} onClick={() => signImages[0].url && setSignLightboxOpen(!lightboxOpen)}>
                                                {signImages.map((img, index) => (
                                                    <Avatar alt={img?.title} key={index} src={img?.url} />
                                                ))}
                                            </AvatarGroup>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {data.professional_info && (
                <>
                    <Typography align="left" variant="subtitle1">
                        Professional Information
                    </Typography>
                </>
            )}
            {data.nominee && (
                <>
                    <Typography align="left" variant="subtitle1">
                        Nominee Information
                    </Typography>

                    <TableContainer>
                        <Table
                            sx={{
                                '& td': {
                                    whiteSpace: 'nowrap'
                                },
                                '& td:first-of-type': {
                                    pl: 0
                                },
                                '& td:last-of-type': {
                                    pr: 0,
                                    minWidth: 260
                                },
                                '& tbody tr:last-of-type  td': {
                                    borderBottom: 'none'
                                },
                                [theme.breakpoints.down('xl')]: {
                                    '& tr:not(:last-of-type)': {
                                        borderBottom: '1px solid',
                                        borderBottomColor:
                                            theme.palette.mode === 'dark' ? 'rgb(132, 146, 196, .2)' : 'rgba(224, 224, 224, 1)'
                                    },
                                    '& td': {
                                        display: 'inline-block',
                                        borderBottom: 'none',
                                        pl: 0
                                    },
                                    '& td:first-of-type': {
                                        display: 'block'
                                    }
                                }
                            }}
                        >
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <Avatar alt="User 1" src={data?.profile_picture} sx={{ width: 60, height: 60 }} />
                                            </Grid>
                                            <Grid item sm zeroMinWidth>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Typography align="left" variant="subtitle1">
                                                            Name: {data?.nominee?.name}
                                                        </Typography>
                                                        <Typography align="left" variant="subtitle2" sx={{ whiteSpace: 'break-spaces' }}>
                                                            Phone: {data?.nominee?.mobile}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} lg={6}>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Typography variant="h6">Relation: &nbsp;</Typography>
                                                    <Typography variant="caption">{data?.nominee?.relation}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} lg={6}>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Typography variant="h6">Date of Birth: &nbsp;</Typography>
                                                    <Typography variant="caption">{data?.nominee?.dob}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} lg={6}>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Typography variant="h6">Address: &nbsp;</Typography>
                                                    <Typography variant="caption">{data?.nominee?.address}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} lg={6}>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Typography variant="h6">Identity: &nbsp;</Typography>
                                                    <Typography variant="caption">{data?.nominee?.identity}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} lg={6}>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Typography variant="h6">Identity Type: &nbsp;</Typography>
                                                    <Typography variant="caption">{data?.nominee?.identity_type}</Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}

            {/* <Typography align="left" variant="subtitle1">
                Claim History
            </Typography> */}

            {/* {!!claims.length && (
                <Paper
                    sx={{
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                        border: theme.palette.mode === 'dark' ? 'none' : '1px solid',
                        borderColor: theme.palette.grey[100],
                        p: 3,
                        mt: 3
                    }}
                >
                    {claims?.map((item, index) => (
                        <ClaimCard data={item} key={index} forCustomer={true} />
                    ))}
                </Paper>
            )} */}
        </MainCard>
    );
};

export default Details;
