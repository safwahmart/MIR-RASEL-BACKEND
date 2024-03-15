import { Avatar, AvatarGroup, Badge, Card, CardContent, Chip, Grid, Typography, badgeClasses } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import formatDate from 'utils/customFormates/formatDate';
import { makeStyles, withStyles } from '@mui/styles';
import { useTheme, styled } from '@mui/material/styles';
import clsx from 'clsx';
import Lightbox from 'react-awesome-lightbox';
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        width: '100%',
        position: 'relative',
        marginBottom: 35
    },
    media: {
        height: 0,
        cursor: 'pointer',
        paddingTop: '56.25%' // 16:9
    },
    mediaExpanded: {
        height: 0,
        cursor: 'pointer',
        paddingTop: '200%' // 16:9
    },
    showSelfieButton: {
        marginLeft: 'auto'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    avatar: {
        backgroundColor: theme.palette.error.light
    },
    rejected: {
        backgroundColor: theme.palette.error.light,
        color: 'black',
        border: `2px solid ${theme.palette.error.main}`
    },
    accepted: {
        backgroundColor: theme.palette.success.light,
        color: 'black',
        border: `2px solid ${theme.palette.success.main}`
    },
    waiting: {
        backgroundColor: theme.palette.warning.light,
        color: 'black',
        border: `2px solid ${theme.palette.warning.main}`
    },
    cardBadge: {
        width: '100%'
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    }
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
        left: '50%',
        top: 0,
        padding: 15,
        fontWeight: 'bold'
    }
}))(Badge);

export default function ClaimCard({ data, forCustomer }) {
    const classes = useStyles();
    const theme = useTheme();
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const generateImages = () => {
        let images = [];
        images.unshift({
            title: 'Bill Image',
            url: data?.image
        });
        const selfies = data?.selfies?.map((selfie, index) => {
            return {
                title: `Selfie-${index}`,
                url: selfie
            };
        });
        images.unshift(...selfies);
        return images;
    };
    const images = generateImages();

    const customerFullName = () => {
        return `${data?.customer?.first_name} ${data?.customer?.last_name}`;
    };

    return (
        <StyledBadge
            badgeContent={data?.status?.toUpperCase()}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
            }}
            classes={{
                root: classes.cardBadge,
                badge: clsx({
                    [classes.accepted]: data?.status === 'accepted',
                    [classes.rejected]: data?.status === 'rejected',
                    [classes.waiting]: data?.status === 'waiting'
                })
            }}
            color="primary"
        >
            <Card
                className={classes.root}
                sx={{
                    border: theme.palette.mode === 'dark' ? 'none' : '1px solid',
                    borderColor: theme.palette.grey[100],
                    boxShadow: theme.shadows[2],
                    borderRadius: '12px'
                }}
            >
                <Grid container style={{ alignItems: 'center', padding: '24px 8px', paddingBottom: 0 }}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item md={6} style={{ paddingLeft: '5rem', justifyContent: 'flex-end' }}>
                                <Grid item>
                                    <Avatar src={data?.merchant?.profile_picture} aria-label="recipe" className={classes.avatar}>
                                        {data?.merchant?.name[0]}
                                    </Avatar>
                                </Grid>
                                <Grid item style={{ textAlign: 'left' }}>
                                    <Typography style={{ fontWeight: 'bold' }} textAlign="right" variant="subtitle1">
                                        {/* <Link className={classes.link} to={`/merchants/${data?.merchant?.id}`}> */}
                                        {data?.merchant?.name}
                                        {/* </Link> */}
                                    </Typography>

                                    {
                                        <Chip
                                            color={data?.merchant?.is_partner ? 'primary' : 'secondary'}
                                            label={data?.merchant?.is_partner ? 'Partner' : 'Non Partner'}
                                        />
                                    }
                                </Grid>
                            </Grid>

                            {forCustomer ? null : (
                                <Grid
                                    item
                                    md={6}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'end',
                                        alignItems: 'flex-end',
                                        paddingRight: '5rem'
                                    }}
                                >
                                    <Grid item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Avatar src={data?.customer?.profile_picture} aria-label="recipe" className={classes.avatar}>
                                            {customerFullName()}
                                        </Avatar>
                                        <Typography style={{ fontWeight: 'bold' }} textAlign="right" variant="subtitle1">
                                            {/* <Link className={classes.link} to={`/customers/${data?.customer?.id}`}> */}
                                                {customerFullName()}
                                            {/* </Link> */}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>

                <CardContent>
                    <div style={{ marginTop: 10 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4} lg={3}>
                                <Typography variant="body1">
                                    <strong>Claim ID:</strong> {data?.id}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Bill ID:</strong> {data?.bill_no}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Reclaim Count:</strong> {data?.reclaim_count}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                <Typography variant="body1">
                                    <strong>Amount:</strong> {data?.amount}৳
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Cashback:</strong> {data?.discount}৳
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Commission:</strong> {data?.commission_amount}৳
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                <Typography variant="body1">
                                    <strong>Products Count:</strong> {data?.products_count}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Claim Date:</strong> {formatDate(data?.created_at)}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                {lightboxOpen ? <Lightbox images={images} onClose={() => setLightboxOpen(false)} /> : null}
                                <AvatarGroup max={4} onClick={() => setLightboxOpen(!lightboxOpen)}>
                                    {images.map((img) => (
                                        <Avatar alt={img?.title} src={img?.url} />
                                    ))}
                                </AvatarGroup>
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        {data?.message?.split('<br>')?.[1] ? (
                            <Typography variant="body1">
                                <strong>Custom Message:</strong> {data?.message?.split('<br>')?.[1]}
                            </Typography>
                        ) : null}
                    </div>
                </CardContent>
            </Card>
        </StyledBadge>
    );
}
