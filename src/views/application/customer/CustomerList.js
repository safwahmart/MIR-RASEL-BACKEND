import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Typography, CardHeader, IconButton, Fab } from '@mui/material';

// project imports
import { useDispatch, useSelector } from 'store';

// assets
import MaterialTable from '@material-table/core';
import { useState } from 'react';
import customersModule from 'store/slices/customersModule';
import { shallowEqual } from 'react-redux';
import { useEffect } from 'react';
import { useCallback } from 'react';
import hasPermission from 'utils/adminPermission/hasPermission';
import permissions from 'utils/adminPermission/permissions';
import formatDate from 'utils/customFormates/formatDate';
import Details from './Details';
import BlockMessageDialog from './BlockMessageDialog';
import Customers from 'repositories/Customers';
import { openSnackbar } from 'store/slices/snackbar';
import { Link } from 'react-router-dom';
import Chip from 'ui-component/extended/Chip';

const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};
const CustomerList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const tableRef = React.useRef(null);
    let modals = {};
    const isLoading = useSelector(customersModule.selectors.isLoading, shallowEqual);
    const [modalsState, setModalsState] = useState(modals);
    const [pageSize, setPageSize] = useState(20);

    const handleOpen = (id) => {
        const modalsStateTmp = { ...modalsState };
        modalsStateTmp[`modal${id}`] = true;
        setModalsState(modalsStateTmp);
    };

    const handleClose = (id) => {
        const modalsStateTmp = { ...modalsState };
        modalsStateTmp[`modal${id}`] = false;
        setModalsState(modalsStateTmp);
    };

    const handleBlock = useCallback(async (id) => {
        handleOpen(id);
    }, []);

    const handleUnblock = useCallback(async (id) => {
        try {
            let res = await Customers.unblock(id, { _method: 'PATCH' });
            if (res.status === 200 && res.message) {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: res.message,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: true
                    })
                );
            }
            tableRef.current.onQueryChange();
        } catch (error) {
            console.log('error', error);
            dispatch(
                openSnackbar({
                    open: true,
                    message: error.message,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
        }
    }, []);
    return (
        <>
            <MaterialTable
                tableRef={tableRef}
                columns={[
                    { title: 'ID', field: 'id' },
                    {
                        title: 'CID',
                        field: 'cid',
                        sorting: false,
                        render: (rowData) => (
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to={`/customer/customer-list/${rowData.id}`}
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                # {rowData.cid}
                            </Typography>
                        )
                    },
                    {
                        title: 'Pro Pic',
                        field: 'selfie',
                        render: (rowdata) => <Avatar src={rowdata?.selfie_middle} />,
                        sorting: false
                    },
                    {
                        title: 'Name',
                        field: 'name',
                        sorting: false,
                        render: (rowData) => (
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to={`/customer/customer-list/${rowData.id}`}
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                {rowData.name}
                            </Typography>
                        )
                    },
                    {
                        title: 'Phone',
                        field: 'mobile',
                        sorting: false,
                        render: (rowData) => (
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to={`/customer/customer-list/${rowData.id}`}
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                {rowData.mobile}
                            </Typography>
                        )
                    },
                    { title: 'Email', field: 'email' },
                    {
                        title: 'Status',
                        field: 'status',
                        sorting: false,
                        render: (rowData) => (
                            <>
                                {rowData?.status === 'active' ? (
                                    <Chip label={rowData?.status} size="small" chipcolor="success" />
                                ) : (
                                    <Chip label={rowData?.status} size="small" chipcolor="orange" />
                                )}
                            </>
                        )
                    },

                    {
                        field: 'status',
                        title: 'Blocking',
                        hidden: !hasPermission(permissions.customers.update),
                        render: ({ status, id }) => {
                            if (status === 'active') {
                                return (
                                    <>
                                        <Button variant="outlined" color="secondary" onClick={() => handleBlock(id)}>
                                            Block
                                        </Button>
                                        <BlockMessageDialog
                                            open={modalsState[`modal${id}`] ?? false}
                                            handleClose={() => handleClose(id)}
                                            userId={id}
                                            tableRef={tableRef}
                                        />
                                    </>
                                );
                            } else {
                                return (
                                    <Button variant="outlined" color="primary" onClick={() => handleUnblock(id)}>
                                        Unblock
                                    </Button>
                                );
                            }
                        }
                    },

                    {
                        field: 'created_at',
                        title: 'Created',
                        render: (rowdata) => formatDate(rowdata.created_at)
                    }
                ]}
                detailPanel={(rowData) => {
                    return <Details {...rowData} />;
                }}
                data={async (query) => {
                    setPageSize(query.pageSize);
                    const res = await dispatch(
                        customersModule.getAll({
                            limit: query.pageSize,
                            page: query.page + 1,
                            sort: query.orderBy ? query.orderBy.field : 'id',
                            order: query.orderDirection || 'desc',
                            q: query.search
                        })
                    );
                    return JSON.parse(JSON.stringify(res));
                }}
                isLoading={isLoading}
                title={
                    <CardHeader
                        sx={headerSX}
                        title={
                            <Typography sx={{ fontWeight: 500 }} variant="h3">
                                Customer List
                            </Typography>
                        }
                    />
                }
                options={{
                    pageSize: pageSize,
                    pageSizeOptions: [20, 50, 100],
                    draggable: false,
                    actionsColumnIndex: -1,
                    debounceInterval: 400
                }}
            />
        </>
    );
};

export default CustomerList;
