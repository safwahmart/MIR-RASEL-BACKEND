import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    CardContent,
    Checkbox,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Switch,
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
import { visuallyHidden } from '@mui/utils';

// project imports

import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'store';
import { getProducts } from 'store/slices/customer';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

import axios from 'axios';
import { baseUrl } from 'api/apiConfig';
import { headers } from 'api/auth';
import { useToast } from 'hooks/useToast';
import useConfirmationDialog from 'hooks/useConfirmationDialog';
import Swal from 'sweetalert2';
import BrandsAdd from './CategoryAdd';
import Avatar from 'ui-component/extended/Avatar';
import { Link } from 'react-router-dom';
import BrandsUpdate from './BrandsUpdate';
import { useNavigate } from 'react-router-dom';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CategoryAdd from './CategoryAdd';

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
        label: 'Logo',
        align: 'left'
    },
    {
        id: 'category',
        numeric: false,
        label: 'Name',
        align: 'left'
    },
    {
        id: 'category',
        numeric: false,
        label: 'Title',
        align: 'left'
    },
    {
        id: 'status',
        numeric: false,
        label: 'Status',
        align: 'center'
    },
    // {
    //     id: 'price',
    //     numeric: true,
    //     label: 'Price',
    //     align: 'right'
    // },
    // {
    //     id: 'date',
    //     numeric: true,
    //     label: 'Date',
    //     align: 'center'
    // },
    // {
    //     id: 'qty',
    //     numeric: true,
    //     label: 'QTY',
    //     align: 'right'
    // }
];

// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, theme, selected }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

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
                                {headCell.label}
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
                            Action
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
    const handleConfirmationDialog = useConfirmationDialog(
        "Delete Brands?",
        "Are you sure you want to delete?",
        "Yes, delete"
    );

    // show a right sidebar when clicked on new product
    const [open, setOpen] = React.useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };


    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [search, setSearch] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const [categoriesTypeList, setCategoriesTypeList] = React.useState([]);
    const [fetch, setFetch] = React.useState(false);
    const { products } = useSelector((state) => state.customer);



    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event?.currentTarget);
        console.log(event.target.value);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                const properties = ['name', 'category', 'price', 'qty', 'id'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setRows(newRows);
        } else {
            setRows(products);
        }
    };

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


    const handleFetchCategories = React.useCallback(
        async () => {
            try {
                const data = await axios.get(`${baseUrl}/categories`, {
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





    const deleteBrands = async (id) => {
        try {
            const confirmed = await handleConfirmationDialog();
            if (confirmed) {
                // Show loading state here if necessary
                // setIsLoading(true);

                const result = await axios.delete(`${baseUrl}/categories/${id}`, {
                    headers: headers,
                });

                if (result.data.success) {
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

    const handleStatusUpdate = (event, id) => {
        axios
            .get(
                `${baseUrl}/category-type/status-update/` + id,

                {
                    headers: headers,
                }
            )
            .then(function (response) {
                showToast(
                    event.target.checked ? "Brands  enable" : "Brands Disable ",
                    "success"
                );
                handelFatchBrands()
            })
            .catch(function (error) {
                showToast('Something went wrong!', 'error');
            });
    };

    const handelFatchBrands = () => {
        setFetch(true);
    }

    const redirectToNewRoute = (id) => {
        console.log('Redirecting to', id);
        navigate(`/category/edit?id=${id}`);
    }
    React.useEffect(() => {
        handleFetchCategories();
    }, [handleFetchCategories]);

    return (
        <MainCard title="Category List" content={false}>
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        {/* <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                )
                            }}
                            onChange={handleSearch}
                            placeholder="Search Product"
                            value={search}
                            size="small"
                        /> */}
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                        {/* <Tooltip title="Copy">
                            <IconButton size="large">
                                <FileCopyIcon />
                            </IconButton>
                        </Tooltip> */}
                        {/* <Tooltip title="Print">
                            <IconButton size="large">
                                <PrintIcon />
                            </IconButton>
                        </Tooltip> */}
                        {/* <Tooltip title="Filter">
                            <IconButton size="large">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip> */}

                        {/* product add & dialog */}
                        <Tooltip title="Add Category">
                            <Fab
                                color="primary"
                                size="small"
                                onClick={handleClickOpenDialog}
                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                            >
                                <AddIcon fontSize="small" />
                            </Fab>
                        </Tooltip>
                        <CategoryAdd handelFatchBrands={handelFatchBrands} open={open} handleCloseDialog={handleCloseDialog} />
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
                                                #{index + 1}{' '}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Avatar
                                                alt="product images"
                                                src={'https://testapp.safwahltd.com/assets/images/icon/2022/Jul/11658894334-539673.webp'}
                                                size="md"
                                                variant="rounded"
                                            />
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
                                                {row.name}{' '}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{row.meta_title}</TableCell>
                                        <TableCell align="center">
                                            <Switch
                                                defaultChecked={row.status === "inactive" ? false : true}
                                                onChange={(e) => handleStatusUpdate(e, row.id)}

                                                color="primary" />
                                        </TableCell>
                                        {/* <TableCell align="center" sx={{ pr: 3 }} key={row.id}>
                                            <IconButton onClick={handleMenuClick} size="large" aria-label="more options">
                                                <MoreHorizOutlinedIcon
                                                    fontSize="small"
                                                    aria-controls="menu-popular-card-1"
                                                    aria-haspopup="true"
                                                    sx={{ color: 'grey.500' }}
                                                />
                                            </IconButton>
                                            <Menu
                                            key={row.id}
                                                id="menu-popular-card-1"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                                variant="selectedMenu"
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right'
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right'
                                                }}
                                                sx={{
                                                    '& .MuiMenu-paper': {
                                                        boxShadow: theme.customShadows.z1
                                                    }
                                                }}
                                            >
                                               
                                              
                                               
                                                <MenuItem
                                                    onClick={() => {
                                                        deleteBrands(row?.id);
                                                        handleClose();
                                                    }}
                                                > Delete</MenuItem>
                                                  <MenuItem 
                                                onClick={() => { 
                                                    redirectToNewRoute(row?.id);
                                                    
                                                     handleClose() 
                                                }}
                                                    >
                                                   Edit
                                                </MenuItem>

                                            </Menu>
                                        </TableCell> */}

                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            <IconButton color="primary" size="large" aria-label="view">
                                                <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton>
                                            <IconButton onClick={() =>
                                                redirectToNewRoute(row?.id)} color="secondary" size="large" aria-label="edit">
                                                <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton>
                                            <IconButton onClick={() =>
                                                deleteBrands(row?.id)

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
