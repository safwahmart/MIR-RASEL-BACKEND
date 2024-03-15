import PropTypes from 'prop-types';
import React from 'react';
// material-ui
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
// third-party
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
// assets

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&>div': {
        position: 'relative',
        zIndex: 5
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background:
            theme.palette.mode === 'dark'
                ? `linear-gradient(210.04deg, ${theme.palette.primary.dark} -50.94%, rgba(144, 202, 249, 0) 95.49%)`
                : theme.palette.primary[800],
        borderRadius: '50%',
        zIndex: 1,
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: 1,
        width: 210,
        height: 210,
        background:
            theme.palette.mode === 'dark'
                ? `linear-gradient(140.9deg, ${theme.palette.primary.dark} -14.02%, rgba(144, 202, 249, 0) 82.50%)`
                : theme.palette.primary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const StockOutDashboard = ({ isLoading, products }) => {
    const theme = useTheme();

    const [timeValue, setTimeValue] = React.useState(false);
    const handleChangeTime = (event, newValue) => {
        setTimeValue(newValue);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        {/* <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor:
                                                    theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary[800],
                                                color: '#fff',
                                                mt: 1
                                            }}
                                        >
                                            <LocalMallOutlinedIcon fontSize="inherit" />
                                        </Avatar> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 0.75 }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={6}>
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                <h4>Stock Out</h4>
                                                <TableContainer>
                                                    <Table aria-label="simple table" sx={{ width: '413px' }}>
                                                        <TableHead >
                                                            <TableRow>
                                                                <TableCell sx={{ color: '#fff!important' }} align="left">Product Name</TableCell>
                                                                <TableCell sx={{ color: '#fff!important' }} align="left">Status</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {products.map((row) => {
                                                                const stock = parseInt(row.stock_in ?? 0) - parseInt(row.stock_out ?? 0);
                                                                // console.log('first', stock, alertQuantity)
                                                                if (stock <= 0) {
                                                                    return (
                                                                        <TableRow
                                                                            key={row.name}
                                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                        >
                                                                            <TableCell sx={{ color: '#fff!important' }} component="th" scope="row">
                                                                                {row.product_name}
                                                                            </TableCell>
                                                                            <TableCell sx={{ color: '#fff!important' }} align="left">Stock Out</TableCell>
                                                                        </TableRow>
                                                                    )
                                                                }
                                                            })}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

StockOutDashboard.propTypes = {
    isLoading: PropTypes.bool
};

export default StockOutDashboard;
