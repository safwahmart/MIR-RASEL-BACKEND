import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import {
    Box,
    Button,
    CardContent,
    Dialog,
    Fab,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    Menu,
    MenuItem,
    Select,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { toBengaliNumber } from 'bengali-number';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

// project imports

import { useDispatch, useSelector } from 'store';
import MainCard from 'ui-component/cards/MainCard';

// assets
import AddIcon from '@mui/icons-material/AddTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';

import { baseUrl } from 'api/apiConfig';
import { headers } from 'api/auth';
import axios from 'axios';
import useConfirmationDialog from 'hooks/useConfirmationDialog';
import { useToast } from 'hooks/useToast';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';


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
        id: 'invoice_no',
        numeric: false,
        label: 'Order No',
        align: 'left'
    },
    {
        id: 'invoice_no',
        numeric: false,
        label: 'Order At',
        align: 'left'
    },
    {
        id: 'invoice_no',
        numeric: false,
        label: 'Delivery At',
        align: 'left'
    },
    {
        id: 'supplier_name',
        numeric: false,
        label: 'Customer Name',
        align: 'left'
    },
    {
        id: 'warehouse',
        numeric: false,
        label: 'Total Amount',
        align: 'left'
    },
    {
        id: 'payment_type',
        numeric: false,
        label: 'Payment Type',
        align: 'left'
    },
    {
        id: 'total_qty',
        numeric: false,
        label: 'Source',
        align: 'left'
    },
    {
        id: 'status',
        numeric: false,
        label: 'Status',
        align: 'center'
    },
    {
        id: 'action',
        numeric: false,
        label: 'Action',
        align: 'center'
    },
    {
        id: 'log',
        numeric: false,
        label: 'Log',
        align: 'center'
    },

];

// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, theme, selected }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const { t } = useTranslation()
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
                            {t('View')}
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

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const CategoriesTypeList = () => {
    const theme = useTheme();
    const showToast = useToast();
    const navigate = useNavigate();
    const language = localStorage.getItem('i18nextLng');
    const handleConfirmationDialog = useConfirmationDialog(
        language === 'en-US' ? "Delete Attribute Purchase?" : "ট্যাগ মুছবেন?",
        language === 'en-US' ? "Are you sure you want to delete?" : "আপনি মুছে ফেলতে চান?",
        language === 'en-US' ? "Yes, delete" : "হ্যাঁ, মুছে দিন"
    );
    const handleConfirmationDialogParcel = useConfirmationDialog(
        language === 'en-US' ? "Are you want to select Redx?" : "ট্যাগ মুছবেন?",
        language === 'en-US' ? "" : "হ্যাঁ, মুছে দিন",
        language === 'en-US' ? "Yes" : "হ্যাঁ, মুছে দিন"
    );
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // show a right sidebar when clicked on new product
    const [open, setOpen] = React.useState(false);
    const [openTrack, setOpenTrack] = React.useState(false);
    const [trackingInfo, setTrackingInfo] = React.useState({});

    const handleClickOpenDialog = () => {
        navigate('/order-create')
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
    const [districts, setDistricts] = React.useState([])
    const [selectedStatusList, setSelectedStatusList] = React.useState([])
    const [areas, setAreas] = React.useState([])
    const [selectedDistrict, setSelectedDistrict] = React.useState("")
    const [selectedStatus, setSelectedStatus] = React.useState("")
    const [selectedArea, setSelectedArea] = React.useState("")
    const [selectedName, setSelectedName] = React.useState('');
    const [selectedStartDate, setSelectedStartDate] = React.useState('');
    const [selectedEndDate, setSelectedEndDate] = React.useState('');
    const [fetch, setFetch] = React.useState(false);
    const { products } = useSelector((state) => state.customer);
    React.useEffect(() => {
        // dispatch(getProducts());
    }, [dispatch]);
    React.useEffect(() => {
        setRows(products);
    }, [products]);

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
                const data = await axios.get(`${baseUrl}/orders`, {
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


    const printOrder = (data) => {
        // navigate(`/inventory/order/${data.id}`)
        window.open(`/inventory/order/${data.id}`, "_blank")
    }
    const printOrderA4 = (data, type) => {
        // navigate(`/inventory/order/${data.id}`)
        window.open(`/inventory/orderA4/${data.id}?type=${type}`, "_blank")
    }
    const orderStatus = (data) => {
        window.open(`/order-status/${data.id}`, "_blank")
    }
    const parcel = async (e, data) => {
        try {
            const confirmed = await handleConfirmationDialogParcel();
            if (confirmed) {
                // Show loading state here if necessary
                // setIsLoading(true);

                const result = await axios.post(`${baseUrl}/redxCreateOrder`, data, {
                    headers: headers,
                });

                if (result.data.status === true) {
                    // setRows((prevRows) => {
                    //     const filteredProducts = prevRows.filter((prod) => prod.id !== id);
                    //     return [...filteredProducts];
                    // });
                    showToast('Successfully Handover to REDX', 'success');
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
    }
    const tracking = async (data) => {
        try {

            const result = await axios.get(`${baseUrl}/redxTrackingById/${data.id}`, {
                headers: headers,
            });

            if (result.data.status === true) {
                setOpenTrack(true);
                setTrackingInfo(result.data.tracking)
                // showToast('Successfully Handover to REDX', 'success');
            } else {
                showToast('Something went wrong!', 'error');
            }
        } catch (error) {
            // setIsLoading(false);
            showToast('An error occurred while deleting the product.', 'error');
        }
    }


    const deletePurchase = async (id) => {
        try {
            const confirmed = await handleConfirmationDialog();
            if (confirmed) {
                // Show loading state here if necessary
                // setIsLoading(true);

                const result = await axios.delete(`${baseUrl}/orders/${id}`, {
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
        formData.append('id', row.id);
        formData.append('status', row.status === 0 ? 1 : 0);
        axios
            .post(
                `${baseUrl}/statusUpdate`, formData,

                {
                    headers: headers,
                }
            )
            .then(function (response) {
                showToast(
                    response.data.data.status == 1 ? "Purchase  enable" : "Purchase Disable ",
                    "success"
                );
                handelFatchPurchase()
            })
            .catch(function (error) {
                console.error('zError:', error);
                showToast('Something went wrong!', 'error');
            });
    };
    const handleStatusChange = (e, index, id) => {
        selectedStatusList[index] = e.target.value;
        setSelectedStatusList([...selectedStatusList]);
        const formData = new FormData();
        formData.append('id', id);
        formData.append('status', selectedStatusList[index]);
        axios
            .post(
                `${baseUrl}/statusUpdate`, formData,

                {
                    headers: headers,
                }
            )
            .then(function (response) {
                showToast(
                    "Status Updated",
                    "success"
                );
                handelFatchPurchase()
            })
            .catch(function (error) {
                console.error('zError:', error);
                showToast('Something went wrong!', 'error');
            });
    };

    const handelFatchPurchase = () => {
        setFetch(true);
    }

    const openEditModal = (data) => {
        setOpen(true);
        // setSelectedData(data)
        navigate(`/edit-order/${data.id}`)
    }
    React.useEffect(() => {
        handleFetchCategoriesType();
    }, [handleFetchCategoriesType]);

    React.useEffect(() => {
        getDistricts();
    }, []);

    const getDistricts = async () => {
        const response = await axios.get(`${baseUrl}/districts`, {
            headers: headers
        });
        setDistricts(response.data.data);
    }

    const getArea = async (id) => {
        const response = await axios.get(`${baseUrl}/getArea/${id}`, {
            headers: headers
        });
        setAreas(response.data.data);
    }

    const ResetProduct = async () => {
        setSelectedDistrict('')
        setSelectedArea('')
        setSelectedName('')
        setSelectedStartDate('')
        setSelectedEndDate('')
        handleFetchCategoriesType();
    }
    const SearchProduct = async () => {
        const response = await axios.post(`${baseUrl}/searchOrder`, {
            district_id: selectedDistrict,
            area_id: selectedArea,
            status: selectedStatus,
            start_date: selectedStartDate,
            end_date: selectedEndDate,
            name: selectedName
        }, {
            headers: headers
        });
        // setCategories(response.data.data);
        setCategoriesTypeList(response?.data?.data);
        setRows(response?.data?.data);
    }

    // status dropdown
    const [anchorElDropdown, setAnchorElDropdown] = React.useState([]);
    // const openDropdown = Boolean(anchorElDropdown);
    const handleClickDropdown = (event, id) => {
        setAnchorElDropdown([
            ...anchorElDropdown,
            { id: id, anchor: event.currentTarget }
        ]);
    };
    const handleCloseDropdown = (id) => {
        // setAnchorElDropdown(null);
        setAnchorElDropdown(
            anchorElDropdown.filter(a => a.id !== id)
        );
    };

    // printDropdown
    const [anchorElPrintDropdown, setAnchorElPrintDropdown] = React.useState([]);
    // const openPrintDropdown = Boolean(anchorElPrintDropdown);
    const handleClickPrintDropdown = (event, id) => {
        setAnchorElPrintDropdown([
            ...anchorElPrintDropdown,
            { id: id, anchor: event.currentTarget }
        ]);
    };
    const handleClosePrintDropdown = (id) => {
        setAnchorElPrintDropdown(
            anchorElDropdown.filter(a => a.id !== id)
        );
        // setAnchorElPrintDropdown(null);
    };

    // console.log('anchorElDropdown', anchorElDropdown, openDropdown)


    return (
        <MainCard title={t("Order List")} content={false}>
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
                    <Grid item xs={12} sm={2}>
                        <label>{('District')}</label>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">{t('District')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                fullWidth
                                value={selectedDistrict}
                                label="District"
                                onChange={(e) => { setSelectedDistrict(e.target.value); getArea(e.target.value) }}
                            >
                                <MenuItem value="" selected>
                                    <em>None</em>
                                </MenuItem>
                                {districts.length > 0 && districts.map((option, index) => {
                                    return <MenuItem key={index} value={option.id}>
                                        {language === 'bn' ? option.name_bn : option.name}
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <label>{t('Area')} </label>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">{t('Area')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                fullWidth
                                value={selectedArea}
                                label="Area"
                                onChange={(e) => setSelectedArea(e.target.value)}
                            >
                                <MenuItem value="" selected>
                                    <em>None</em>
                                </MenuItem>
                                {areas.length > 0 && areas.map((option, index) => {
                                    return <MenuItem key={index} value={option.id}>
                                        {language === 'bn' ? option.name_bn : option.name}
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label">{t('Name && SKU')}</InputLabel> */}
                            <DateRangePicker onChange={(date) => {
                                console.log(date);
                                if (date) {
                                    const startDate = moment(date[0]).format('YYYY-MM-DD');
                                    const endDate = moment(date[1]).format('YYYY-MM-DD');
                                    setSelectedStartDate(startDate);
                                    setSelectedEndDate(endDate);
                                } else {
                                    setSelectedStartDate('');
                                    setSelectedEndDate('');
                                }
                            }} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label">{t('Name && SKU')}</InputLabel> */}
                            <TextField
                                fullWidth
                                variant="outlined"
                                label={t("Name && Order Number")}
                                value={selectedName}
                                onChange={(e) => setSelectedName(e.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <label>{t('Status')}</label>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">{t('Status')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                fullWidth
                                value={selectedStatus}
                                label={t('Status')}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <MenuItem value="" selected>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="0">
                                    Pending
                                </MenuItem>
                                <MenuItem value="1">
                                    Accepted
                                </MenuItem>
                                <MenuItem value="2">
                                    Processing
                                </MenuItem>
                                <MenuItem value="3">
                                    On the way
                                </MenuItem>
                                <MenuItem value="4">
                                    Delivered
                                </MenuItem>
                                <MenuItem value="5">
                                    Return
                                </MenuItem>
                                <MenuItem value="6">
                                    Return On Process
                                </MenuItem>
                                <MenuItem value="7">
                                    Canceled
                                </MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button type='submit' variant="contained" className="Save__Btn float-right" onClick={SearchProduct}>
                            Search
                        </Button>
                        <Button type='button' className="Save__Btn float-right" onClick={ResetProduct}>
                            Reset
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>

                        {/* product add & dialog */}
                        <Tooltip title={t("Add Order")}>
                            <Fab
                                color="primary"
                                size="small"
                                onClick={handleClickOpenDialog}
                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                            >
                                <AddIcon fontSize="small" />
                            </Fab>
                        </Tooltip>
                        <Dialog
                            open={openTrack}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => setOpenTrack(false)}
                        // ... (existing sx styles)
                        >
                            <Table sx={{ minWidth: 450 }}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Customer Name</TableCell>
                                        <TableCell>{trackingInfo.customer_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Customer Phone</TableCell>
                                        <TableCell>{trackingInfo.customer_phone}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Customer Address</TableCell>
                                        <TableCell>{trackingInfo.customer_address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Tracking ID</TableCell>
                                        <TableCell>{trackingInfo.tracking_id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Status</TableCell>
                                        <TableCell>{trackingInfo.status}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Dialog>
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
                                console.log('product list', row);
                                /** Make sure no display bugs if row isn't an OrderData object */
                                // selectedStatusList[index] = row.status;
                                // setSelectedStatusList([...selectedStatusList]);
                                if (typeof row === 'number') return null;
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                const openDrop = anchorElDropdown?.filter(res => res.id === row.id)
                                const openDropPrint = anchorElPrintDropdown?.filter(res => res.id === row.id)
                                console.log('openDropPrint', selectedStatusList[index])
                                return (
                                    <TableRow
                                        key={row.id}
                                    >
                                        <TableCell
                                            align="left"
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // // onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {language === 'bn' ? toBengaliNumber(index + 1) : index + 1}{' '}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // // onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {language === 'bn' ? toBengaliNumber(row.invoice_no) : row.invoice_no}{' '}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // // onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {language === 'bn' ? toBengaliNumber(row.order_date) : row.order_date}{' '}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // // onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {language === 'bn' ? toBengaliNumber(row.delivery_date) : row.delivery_date}{' '}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // // onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {language === 'bn' ? row.customer_name_bn : row.customer_name}
                                                <br />
                                                {language === 'bn' ? row.customer_name_bn : row.phone}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // // onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {language === 'bn' ? toBengaliNumber(row.payable) : row.payable}{' '}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // // onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {/* {language === 'bn' ? toBengaliNumber(row.total_price) : row.total_price}{' '} */}
                                                {row.payment_type === "1" ? 'Online' : row.payment_type === "2" ? 'COD' : 'Not paid'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // // onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {/* {language === 'bn' ? toBengaliNumber(row.total_price) : row.total_price}{' '} */}
                                                {row.source === "1" ? 'Website' : 'CRM'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            {/* <Switch
                                                defaultChecked={row.status === 0 ? false : true}
                                                onChange={(e) => handleStatusUpdate(row)}
                                                color="primary" /> */}
                                            <Grid item xs={12} sm={2}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-filled-label">{t('Status')}</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-filled-label"
                                                        id="demo-simple-select-filled"
                                                        fullWidth
                                                        value={selectedStatusList[index] !== undefined ? selectedStatusList[index] : row.status}
                                                        label={t('Status')}
                                                        onChange={(e) => handleStatusChange(e, index, row.id)}
                                                    >
                                                        <MenuItem value="" selected>
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value="0">
                                                            Pending
                                                        </MenuItem>
                                                        <MenuItem value="1">
                                                            Accepted
                                                        </MenuItem>
                                                        <MenuItem value="2">
                                                            Processing
                                                        </MenuItem>
                                                        <MenuItem value="3">
                                                            On the way
                                                        </MenuItem>
                                                        <MenuItem value="4">
                                                            Delivered
                                                        </MenuItem>
                                                        <MenuItem value="5">
                                                            Return
                                                        </MenuItem>
                                                        <MenuItem value="6">
                                                            Return On Process
                                                        </MenuItem>

                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </TableCell>
                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            {/* <IconButton color="primary" size="large" aria-label="view">
                                                <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton> */}
                                            {/* <IconButton onClick={() =>
                                                openEditModal(row)} color="secondary" size="large" aria-label="edit">
                                                <EditTwoTone sx={{ fontSize: '1.3rem' }} />
                                            </IconButton> */}
                                            <IconButton onClick={() =>
                                                deletePurchase(row?.id)

                                            } color="primary" size="large" aria-label="delet" >
                                                <DeleteIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton>

                                            <Button
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={(e) => handleClickPrintDropdown(e, row.id)}
                                            >
                                                <PrintIcon sx={{ fontSize: '1.3rem' }} />
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                className='order__menu__list'
                                                anchorEl={openDropPrint.length > 0 ? openDropPrint[0]?.anchor : ''}
                                                open={openDropPrint.length > 0 ? true : false}
                                                onClose={() => handleClosePrintDropdown(row.id)}
                                            >
                                                {/* Customer Copy */}
                                                <MenuItem onClick={handleClosePrintDropdown}>

                                                    <IconButton className='print__button__orderList' onClick={() =>
                                                        printOrderA4(row, 'customer')

                                                    } color="primary" size="large" aria-label="delete" >
                                                        <PrintIcon sx={{ fontSize: '1.3rem' }} />
                                                        <p>Customer Copy</p>
                                                    </IconButton>
                                                </MenuItem>
                                                {/* Accounts Copy */}
                                                <MenuItem onClick={handleClosePrintDropdown}>
                                                    <IconButton className='print__button__orderList' onClick={() =>
                                                        printOrderA4(row, 'accounts')
                                                    } color="primary" size="large" aria-label="delete" >
                                                        <PrintIcon sx={{ fontSize: '1.3rem' }} />
                                                        <p>Accounts Copy</p>
                                                    </IconButton>
                                                </MenuItem>
                                                {/* Delivary Man Copy */}
                                                <MenuItem onClick={handleClosePrintDropdown}>
                                                    <IconButton className='print__button__orderList' onClick={() =>
                                                        printOrderA4(row, 'delivery')

                                                    } color="primary" size="large" aria-label="delete" >
                                                        <PrintIcon sx={{ fontSize: '1.3rem' }} />
                                                        <p>Delivery Man Copy</p>
                                                    </IconButton>
                                                </MenuItem>
                                                {/* Store Copy */}
                                                <MenuItem onClick={handleClosePrintDropdown}>
                                                    <IconButton className='print__button__orderList' onClick={() =>
                                                        printOrderA4(row, 'store')
                                                    } color="primary" size="large" aria-label="delete" >
                                                        <PrintIcon sx={{ fontSize: '1.3rem' }} />
                                                        <p>Store Copy</p>
                                                    </IconButton>
                                                </MenuItem>
                                                {/* POS Print */}
                                                <MenuItem onClick={handleClosePrintDropdown}>
                                                    <IconButton className='print__button__orderList' onClick={() => printOrder(row)} color="primary" size="large" aria-label="delet">
                                                        <PrintIcon sx={{ fontSize: '1.3rem' }} />
                                                        <p>POS Print</p>
                                                    </IconButton>
                                                </MenuItem>
                                            </Menu>
                                        </TableCell>

                                        <TableCell>
                                            <p>Created by: {row.created_user}</p>
                                            <p>Created at: {moment(row.created_at).format("d MMM YYYY h:mm:ss")}</p>
                                            {/* <p>Updated by: {row.updated_user}</p>
                                            <p>Updated at: {moment(row.updated_at).format("d MMM YYYY h:mm:ss")}</p> */}
                                        </TableCell>

                                        <TableCell align="center">
                                            <Button
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={(e) => handleClickDropdown(e, row.id)}
                                            >
                                                View
                                            </Button>

                                            <Menu
                                                id="basic-menu"
                                                className='order__menu__list'
                                                anchorEl={openDrop.length > 0 ? openDrop[0]?.anchor : ''}
                                                open={openDrop.length > 0 ? true : false}
                                                onClose={() => handleCloseDropdown(row.id)}
                                            >
                                                <MenuItem onClick={() => orderStatus(row)}>View</MenuItem>
                                                {/* {row.paid_amount === "0" && <MenuItem onClick={(e) => parcel(e, row)}>Parcel</MenuItem>} */}
                                                {/* <MenuItem onClick={() => tracking(row)}>Tracking</MenuItem> */}
                                                {row.tracking_id !== null && <MenuItem>
                                                    {/* <Link to={`https://merchant.pathao.com/tracking?consignment_id=${row.tracking_id}&phone=${row.phone}`} target='__blank'>Tracking Link</Link> */}
                                                    <Link to={`https://redx.com.bd/track-global-parcel/?trackingId=${row.tracking_id}`} target='__blank'>Redx Tracking Link</Link>
                                                </MenuItem>}
                                            </Menu>
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

        </MainCard >


    );
};

export default CategoriesTypeList;
