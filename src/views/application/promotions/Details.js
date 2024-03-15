import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { Box, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import promotionsModule from 'store/slices/promotionsModule';
import { gridSpacing } from 'store/constant';
import useConfig from 'hooks/useConfig';
import formatDate from 'utils/customFormates/formatDate';

const Details = (props) => {
    const dispatch = useDispatch();
    const params = useParams();
    const { borderRadius } = useConfig();
    let id = props?.rowData?.id;
    const singleLoading = useSelector(promotionsModule.selectors.singleLoading);
    const data = useSelector(promotionsModule.selectors.single);
    const getSinglePromotions = useCallback(async () => {
        await dispatch(promotionsModule.getSingle(id || params.id));
    }, [dispatch, id, params.id]);

    useEffect(() => {
        getSinglePromotions();
    }, [dispatch, getSinglePromotions]);

    if (singleLoading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '20vh' }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <MainCard>
            <Grid container spacing={gridSpacing} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CardMedia
                            component="img"
                            image={data?.image?.url}
                            sx={{ borderRadius: `${borderRadius}px`, overflow: 'hidden', maxWidth: '350px' }}
                            alt="product images"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
                            <Typography variant="caption">Promotion Title </Typography>
                            <Typography variant="h6">{data?.title}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption">Status </Typography>
                            <Typography variant="h6">{data?.status}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
                            <Typography variant="caption">Created At </Typography>
                            <Typography variant="h6">{data?.created_at && formatDate(data.created_at)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption">Updated At</Typography>
                            <Typography variant="h6">{data?.updated_at && formatDate(data.updated_at)}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Typography variant="caption">Promotion Description</Typography>
                            <Typography variant="h6">{data?.description}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Details;
