import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { toBengaliNumber } from 'bengali-number'
import {
    Box,
    CardContent,
    Fab,
    Grid,
    IconButton,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// project imports

import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'store';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/AddTwoTone';
import EditTwoTone from '@mui/icons-material/EditTwoTone';

import axios from 'axios';
import { baseUrl } from 'api/apiConfig';
import { headers } from 'api/auth';
import { useToast } from 'hooks/useToast';
import useConfirmationDialog from 'hooks/useConfirmationDialog';
import WareHouseAdd from './CouponAdd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const prodImage = require.context('assets/images/e-commerce', true);

// table sort
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// table header options
const headCells = [
    {
        id: 'id',
        numeric: true,
        label: 'SL',
        align: 'left'
    },
    {
        id: 'name',
        numeric: false,
        label: 'Name',
        align: 'left'
    },
    {
        id: 'start_date',
        numeric: false,
        label: 'Start Date',
        align: 'left'
    },
    {
        id: 'end_date',
        numeric: false,
        label: 'End Date',
        align: 'left'
    },
    {
        id: 'amount',
        numeric: false,
        label: 'Amount',
        align: 'left'
    },
    {
        id: 'max_discount_amount',
        numeric: false,
        label: 'Max Discount Amount',
        align: 'left'
    },
    {
        id: 'use_type_id',
        numeric: false,
        label: 'Use Type',
        align: 'left'
    },
    {
        id: 'highlight',
        numeric: false,
        label: 'Highlight',
        align: 'center'
    },
    {
        id: 'coupon_apply_status',
        numeric: false,
        label: 'Apply Status',
        align: 'center'
    },
    {
        id: 'status',
        numeric: false,
        label: 'Status',
        align: 'center'
    },
];

// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, theme, selected }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const { t } = useTranslation();

    return (
        <TableHead>
            <TableRow>
                {/* <TableCell padding="checkbox" sx={{ pl: 3 }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell> */}
                {numSelected > 0 && (
                    <TableCell padding="none" colSpan={7}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                    </TableCell>
                )}
                {numSelected <= 0 &&
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {t(headCell.label)}
                                {orderBy === headCell?.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                {numSelected <= 0 && (
                    <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                        <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}>
                            {t('action')}
                        </Typography>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    theme: PropTypes.object,
    selected: PropTypes.array,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }) => (
    <Toolbar
        sx={{
            p: 0,
            pl: 1,
            pr: 1,
            ...(numSelected > 0 && {
                color: (theme) => theme.palette.secondary.main
            })
        }}
    >
        {numSelected > 0 ? (
            <Typography color="inherit" variant="h4">
                {numSelected} Selected
            </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
                Nutrition
            </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {numSelected > 0 && (
            <Tooltip title="Delete">
                <IconButton size="large">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        )}
    </Toolbar>
);

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

// ==============================|| PRODUCT LIST ||============================== //

const CategoriesTypeList = () => {
    const theme = useTheme();
    const showToast = useToast();
    const navigate = useNavigate();
    const language = localStorage.getItem('i18nextLng');
    const handleConfirmationDialog = useConfirmationDialog(
        language === 'en-US' ? "Delete Coupon?" : "অ্যাট্রিবিউট মুছবেন?",
        language === 'en-US' ? "Are you sure you want to delete?" : "আপনি মুছে ফেলতে চান?",
        language === 'en-US' ? "Yes, delete" : "হ্যাঁ, মুছে দিন"
    );
    const dispatch = useDispatch();

    // show a right sidebar when clicked on new product
    const [open, setOpen] = React.useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedData({})
    };


    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [selectedData, setSelectedData] = React.useState({});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [rows, setRows] = React.useState([]);
    const [categoriesTypeList, setCategoriesTypeList] = React.useState([]);
    const [fetch, setFetch] = React.useState(false);
    const { products } = useSelector((state) => state.customer);
    React.useEffect(() => {
        // dispatch(getProducts());
    }, [dispatch]);
    React.useEffect(() => {
        setRows(products);
    }, [products]);


    // const [anchorEl, setAnchorEl] = React.useState(null);

    // const handleSearch = (event) => {
    //     const newString = event?.target.value;
    //     setSearch(newString || '');

    //     if (newString) {
    //         const newRows = rows.filter((row) => {
    //             let matches = true;

    //             const properties = ['name', 'category', 'price', 'qty', 'id'];
    //             let containsQuery = false;

    //             properties.forEach((property) => {
    //                 if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
    //                     containsQuery = true;
    //                 }
    //             });

    //             if (!containsQuery) {
    //                 matches = false;
    //             }
    //             return matches;
    //         });
    //         setRows(newRows);
    //     } else {
    //         setRows(products);
    //     }
    // };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            if (selected.length > 0) {
                setSelected([]);
            } else {
                const newSelectedId = rows.map((n) => n.name);
                setSelected(newSelectedId);
            }
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    const handleFetchCategoriesType = React.useCallback(
        async () => {
            try {
                const data = await axios.get(`${baseUrl}/coupons`, {
                    headers: headers
                });
                setCategoriesTypeList(data?.data?.data);
                setRows(data?.data?.data)

            } catch (err) {
                console.error(err);
            }
            setFetch(false);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [fetch])





    const deleteWareHouses = async (id) => {
        try {
            const confirmed = await handleConfirmationDialog();
            if (confirmed) {
                // Show loading state here if necessary
                // setIsLoading(true);

                const result = await axios.delete(`${baseUrl}/coupons/${id}`, {
                    headers: headers,
                });

                if (result.data.status === true) {
                    setRows((prevRows) => {
                        const filteredProducts = prevRows.filter((prod) => prod.id !== id);
                        return [...filteredProducts];
                    });
                    showToast(result.data.message, 'success');
                } else {
                    showToast('Something went wrong!', 'error');
                }
                // Hide loading state here
                // setIsLoading(false);
            }
        } catch (error) {
            // setIsLoading(false);
            showToast('An error occurred while deleting the product.', 'error');
        }
    };

    const handleStatusUpdate = (row) => {
        const formData = new FormData();
        formData.append('use_type_id', row.use_type_id);
        formData.append('status', row.status === 0 ? 1 : 0);
        formData.append('_method', 'PUT');
        axios
            .post(
                `${baseUrl}/coupons/` + row.id, formData,

                {
                    headers: headers,
                }
            )
            .then(function (response) {
                showToast(
                    response.data.data.status == 1 ? "Coupon  enable" : "Coupon Disable ",
                    "success"
                );
                handelFatchWareHouses()
            })
            .catch(function (error) {
                showToast('Something went wrong!', 'error');
            });
    };

    const handleHighlightUpdate = (row) => {
        const formData = new FormData();
        formData.append('use_type_id', row.use_type_id);
        formData.append('highlight', row.highlight === "0" ? "1" : "0");
        formData.append('_method', 'PUT');
        axios
            .post(
                `${baseUrl}/coupons/` + row.id, formData,

                {
                    headers: headers,
                }
            )
            .then(function (response) {
                showToast(
                    response.data.data.status === "1" ? "Coupon Highlight  enable" : "Coupon Highlight Disable ",
                    "success"
                );
                handelFatchWareHouses()
            })
            .catch(function (error) {
                showToast('Something went wrong!', 'error');
            });
    };

    const handleApplyStatusUpdate = (row) => {
        const formData = new FormData();
        formData.append('use_type_id', row.use_type_id);
        formData.append('coupon_apply_status', row.coupon_apply_status === "0" ? "1" : "0");
        formData.append('_method', 'PUT');
        axios
            .post(
                `${baseUrl}/coupons/` + row.id, formData,

                {
                    headers: headers,
                }
            )
            .then(function (response) {
                showToast(
                    response.data.data.status === "1" ? "Coupon Apply Status  enable" : "Coupon Apply Status Disable ",
                    "success"
                );
                handelFatchWareHouses()
            })
            .catch(function (error) {
                showToast('Something went wrong!', 'error');
            });
    };

    const handelFatchWareHouses = () => {
        setFetch(true);
    }

    const openEditModal = (data) => {
        setOpen(true);
        setSelectedData(data)
    }
    React.useEffect(() => {
        handleFetchCategoriesType();
    }, [handleFetchCategoriesType]);
    const { t } = useTranslation();

    return (
        <MainCard title={t("Coupon List")} content={false}>
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>

                        {/* product add & dialog */}
                        <Tooltip title={t("Add Coupon")}>
                            <Fab
                                color="primary"
                                size="small"
                                onClick={handleClickOpenDialog}
                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                            >
                                <AddIcon fontSize="small" />
                            </Fab>
                        </Tooltip>
                        <WareHouseAdd handelFatchWareHouses={handelFatchWareHouses} open={open} handleCloseDialog={handleCloseDialog} selectedData={selectedData} />
                    </Grid>
                </Grid>
            </CardContent>

            {/* table */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        theme={theme}
                        selected={selected}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                console.log('coupons', row);
                                /** Make sure no display bugs if row isn't an OrderData object */
                                if (typeof row === 'number') return null;
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        key={row.id}

                                    >

                                        <TableCell
                                            align="left"
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                #{language === 'bn' ? toBengaliNumber(index + 1) : index + 1}{' '}
                                            </Typography>
                                        </TableCell>


                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {language === 'bn' ? row.name_bn : row.name}{' '}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {language === 'bn' ? row.start_date_bn : row.start_date}{' '}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {language === 'bn' ? row.end_date_bn : row.end_date}{' '}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {language === 'bn' ? row.amount : row.amount}{' '}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {language === 'bn' ? row.max_discount_amount : row.max_discount_amount}{' '}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {language === 'bn' ? row.use_type_id : row.use_type_id}{' '}
                                            </Typography>
                                        </TableCell>


                                        <TableCell align="center">
                                            <Switch
                                                defaultChecked={row.highlight === "0" ? false : true}
                                                onChange={(e) => handleHighlightUpdate(row)}

                                                color="primary" />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Switch
                                                defaultChecked={row.coupon_apply_status === "0" ? false : true}
                                                onChange={(e) => handleApplyStatusUpdate(row)}

                                                color="primary" />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Switch
                                                defaultChecked={row.status === 0 ? false : true}
                                                onChange={(e) => handleStatusUpdate(row)}

                                                color="primary" />
                                        </TableCell>

                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            {/* <IconButton color="primary" size="large" aria-label="view">
                                                <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton> */}
                                            <IconButton onClick={() =>
                                                openEditModal(row)} color="secondary" size="large" aria-label="edit">
                                                <EditTwoTone sx={{ fontSize: '1.3rem' }} />
                                            </IconButton>
                                            <IconButton onClick={() =>
                                                deleteWareHouses(row?.id)

                                            } color="primary" size="large" aria-label="delet" >
                                                <DeleteIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </MainCard>


    );
};

export default CategoriesTypeList;
