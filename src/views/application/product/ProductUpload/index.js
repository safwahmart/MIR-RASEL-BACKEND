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
  TextField,
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

import axios from 'axios';
import { baseUrl } from 'api/apiConfig';
import { headers } from 'api/auth';
import { useToast } from 'hooks/useToast';
import useConfirmationDialog from 'hooks/useConfirmationDialog';
import ProductUploadAdd from './ProductUploadAdd';
import Avatar from 'ui-component/extended/Avatar';
import { useNavigate } from 'react-router-dom';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
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
    id: 'thumbnailImage',
    numeric: false,
    label: 'Thumbnail Image',
    align: 'left'
  },
  {
    id: 'ProductName',
    numeric: false,
    label: 'Product Name',
    align: 'left'
  },
  {
    id: 'productSku',
    numeric: false,
    label: 'Product SKU',
    align: 'left'
  },
  {
    id: 'product_code',
    numeric: false,
    label: 'Product Code',
    align: 'left'
  },
  {
    id: 'product_slug',
    numeric: false,
    label: 'Product Slug',
    align: 'left'
  },
  {
    id: 'purchase_price',
    numeric: false,
    label: 'Purchase Price',
    align: 'left'
  },
  {
    id: 'sale_price',
    numeric: false,
    label: 'Sale Price',
    align: 'left'
  },
  {
    id: 'wholesale_price',
    numeric: false,
    label: 'Wholesale Price',
    align: 'left'
  }
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
  const { t } = useTranslation();
  const theme = useTheme();
  const showToast = useToast();
  const navigate = useNavigate();
  const language = localStorage.getItem('i18nextLng');
  const handleConfirmationDialog = useConfirmationDialog(
    language === 'en-US' ? "Delete Category?" : "ব্র্যান্ড মুছবেন?",
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
  const [selectedData, setSelectedData] = React.useState({});
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [categoriesTypeList, setCategoriesTypeList] = React.useState([]);
  const [fetch, setFetch] = React.useState(false);
  const { products } = useSelector((state) => state.customer);
  React.useEffect(() => {
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
        const data = await axios.get(`${baseUrl}/getproductUploads`, {
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



  const handelFatchProductUpload = () => {
    setFetch(true);
  }

  React.useEffect(() => {
    handleFetchCategoriesType();
  }, [handleFetchCategoriesType]);


  return (
    <MainCard title={t('Products List')} content={false}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
            {/* product add & dialog */}
            <Tooltip title={t('Add Products')}>
              <Fab
                color="primary"
                size="small"
                onClick={handleClickOpenDialog}
                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
              >
                <AddIcon fontSize="small" />
              </Fab>
            </Tooltip>
            <ProductUploadAdd handelFatchProductUpload={handelFatchProductUpload} open={open} handleCloseDialog={handleCloseDialog} selectedData={selectedData} />
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
                  <TableRow key={row.id}>
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
                      align="center"
                      component="th"
                      id={labelId}
                      scope="row"
                      // onClick={(event) => handleClick(event, row.name)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Avatar
                        alt="product images"
                        // src={'https://testapp.safwahltd.com/assets/images/icon/2022/Jul/11658894334-539673.webp'}
                        src={`https://safwahltd-frontend-sonjoy-biswas-projects.vercel.app/uploads/${row.logo}`}
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
                        {language === 'bn' ? row.product_name_bn : row.product_name}{' '}
                      </Typography>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      onClick={(event) => handleClick(event, row.slug)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                      >
                        {' '}
                        {language === 'bn' ? row.product_sku : row.product_sku}{' '}
                      </Typography>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      onClick={(event) => handleClick(event, row.title)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                      >
                        {' '}
                        {language === 'bn' ? row.product_code : row.product_code}{' '}
                      </Typography>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      onClick={(event) => handleClick(event, row.meta_title)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                      >
                        {' '}
                        {row.product_slug}{' '}
                      </Typography>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      onClick={(event) => handleClick(event, row.meta_title)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                      >
                        {' '}
                        {row.purchase_price}{' '}
                      </Typography>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      onClick={(event) => handleClick(event, row.meta_title)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                      >
                        {' '}
                        {row.sale_price}{' '}
                      </Typography>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      onClick={(event) => handleClick(event, row.meta_title)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                      >
                        {' '}
                        {row.wholesale_price}{' '}
                      </Typography>
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
