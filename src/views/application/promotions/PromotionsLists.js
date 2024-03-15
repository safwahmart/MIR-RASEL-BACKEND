import React, { useRef } from 'react';

import { useTheme } from '@mui/material/styles';
import { Avatar, Typography, CardHeader, Button, Modal, Fade, Backdrop, Box } from '@mui/material';

import MaterialTable from '@material-table/core';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import formatDate from 'utils/customFormates/formatDate';
import Chip from 'ui-component/extended/Chip';
import promotionsModule from 'store/slices/promotionsModule';
import { AddCircleRounded, Delete, DeleteOutline, EditTwoTone } from '@mui/icons-material';
import UpdatePromotionsDrawer from './UpdatePromotionsDrawer';
import CreatePromotions from './CreatePromotions';
import PromotionsRepo from 'repositories/PromotionsRepo';
import { openSnackbar } from 'store/slices/snackbar';
import AlertColumnDelete from '../kanban/Board/AlertColumnDelete';
import { makeStyles } from '@mui/styles';
import CustomAlert from 'ui-component/CustomAlert';
import { Link } from 'react-router-dom';
import Details from './Details';
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTableCell-body': {
            '& .MuiTypography-root': {
                wordBreak: 'break-all',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                '-webkit-line-clamp': 2,
                '-webkit-box-orient': 'vertical'
            },
            '& .MuiCollapse-root': {
                '& .MuiTypography-root': {
                    display: 'block'
                }
            }
        }
    },
    paymentBtn: {
        marginLeft: theme.spacing(2)
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

const PromotionsLists = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const tableRef = useRef();
    const [pageSize, setPageSize] = useState(20);
    const [createOpen, setCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [forUpdateSelectedPromotion, setForUpdateSelectedPromotion] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [selectedPromotions, setSelectedPromotions] = useState('');
    const isLoading = useSelector(promotionsModule.selectors.isLoading, shallowEqual);

    const pushPromotionHandler = async () => {
        try {
            let res = await dispatch(promotionsModule.pushPromotions(selectedPromotions));
        } catch (err) {
            console.log(err);
        }
    };
    const updateHandleOnClose = (res) => {
        setIsUpdateOpen(false);
        if (res.status === 200) {
            tableRef.current.onQueryChange();
        }
    };
    const handleOnClose = (res) => {
        setCreateOpen(false);
        if (res.status === 200) {
            tableRef.current.onQueryChange();
        }
    };

    const handleOpenAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    return (
        <>
            <CreatePromotions tableRef={tableRef} open={createOpen} onClose={handleOnClose} />
            <UpdatePromotionsDrawer open={isUpdateOpen} onClose={updateHandleOnClose} itemData={forUpdateSelectedPromotion} />
            <CustomAlert title="Are you sure?" handleClose={handleCloseAlert} open={openAlert} apiHandler={pushPromotionHandler} />
            <Box className={classes.root}>
                <MaterialTable
                    tableRef={tableRef}
                    columns={[
                        { title: 'ID', field: 'id' },
                        {
                            title: 'Image',
                            field: 'image',
                            render: (rowdata) => <Avatar src={rowdata?.image?.url} />,
                            sorting: false
                        },
                        {
                            title: 'Title',
                            field: 'title',
                            sorting: false,
                            render: (rowData) => (
                                <Typography
                                    variant="subtitle1"
                                    component={Link}
                                    to={`/promotions/promtions-lists/${rowData.id}`}
                                    color="secondary"
                                    sx={{ textDecoration: 'none' }}
                                >
                                    {rowData.title}
                                </Typography>
                            )
                        },

                        {
                            title: 'Description',
                            field: 'description',
                            sorting: false,
                            render: (rowData) => (
                                <Typography
                                    variant="subtitle1"
                                    component={Link}
                                    to={`/promotions/promtions-lists/${rowData.id}`}
                                    color="secondary"
                                    sx={{
                                        textDecoration: 'none'
                                    }}
                                >
                                    {rowData.description}
                                </Typography>
                            )
                        },
                        {
                            title: 'Status',
                            field: 'status',
                            sorting: false,
                            render: (rowData) => (
                                <>
                                    {rowData?.status === 'active' ? (
                                        <Chip label={rowData?.status} size="small" chipcolor="success" />
                                    ) : rowData?.status === 'draft' ? (
                                        <Chip label={rowData?.status} size="small" chipcolor="warning" />
                                    ) : (
                                        <Chip label={rowData?.status} size="small" chipcolor="orange" />
                                    )}
                                </>
                            )
                        },
                        {
                            title: 'Push',
                            field: 'push',
                            editable: 'never',
                            align: 'center',
                            render: (rowData) => (
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => {
                                        setSelectedPromotions(rowData.id);
                                        handleOpenAlert();
                                    }}
                                >
                                    Push
                                </Button>
                            )
                        },

                        {
                            field: 'created_at',
                            title: 'Created',
                            render: (rowdata) => formatDate(rowdata.created_at)
                        }
                    ]}
                    data={async (query) => {
                        setPageSize(query.pageSize);
                        const res = await dispatch(
                            promotionsModule.getAll({
                                limit: query.pageSize,
                                page: query.page + 1,
                                sort: query.orderBy ? query.orderBy.field : 'id',
                                order: query.orderDirection || 'desc',
                                q: query.search
                            })
                        );
                        return JSON.parse(JSON.stringify(res));
                    }}
                    detailPanel={(rowData) => {
                        return <Details {...rowData} />;
                    }}
                    editable={{
                        onRowDelete: async (rowData) => {
                            try {
                                let res = await dispatch(promotionsModule.deletePromotions(rowData.id));
                                return res;
                            } catch (err) {
                                console.log(err);
                            }
                            tableRef.current.onQueryChange();
                        }
                    }}
                    icons={{ Delete: () => <DeleteOutline fontSize="small" color="error" size="large" aria-label="delete" /> }}
                    actions={[
                        {
                            icon: () => <EditTwoTone fontSize="small" color="secondary" size="large" aria-label="edit" />,
                            tooltip: 'Edit Promotions',
                            isFreeAction: false,
                            onClick: (event, rowData) => {
                                setIsUpdateOpen(true);
                                setForUpdateSelectedPromotion(rowData);
                            }
                        },
                        {
                            icon: () => <AddCircleRounded fontSize="large" color="secondary" size="small" aria-label="view" />,
                            tooltip: 'Create Promotions',
                            isFreeAction: true,
                            onClick: () => {
                                setCreateOpen(true);
                            }
                        }
                    ]}
                    isLoading={isLoading}
                    title={
                        <CardHeader
                            sx={headerSX}
                            title={
                                <Typography sx={{ fontWeight: 500 }} variant="h3">
                                    Promotions Lists
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
            </Box>
        </>
    );
};

export default PromotionsLists;
