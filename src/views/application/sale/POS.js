import { Autocomplete, Button, ButtonGroup, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';

import Select from '@mui/material/Select';
import { TbCurrencyTaka } from 'react-icons/tb';

import { CiCircleMinus, CiSquarePlus } from 'react-icons/ci';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { baseUrl } from 'api/apiConfig';
import { headers } from 'api/auth';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useToast } from 'hooks/useToast';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'store';
import { openDrawer } from 'store/slices/menu';
import * as Yup from 'yup';
import CustomerAdd from '../product/Customer/CustomerAdd';
import usePagination from "./Pagination";
import './sale.css';

const validationSchema = Yup.object().shape({
  // supplier_id: Yup.string().required('Supplier  is required'),
  // warehouse_id: Yup.string().required('Warehouse  is required'),
});


const POS = () => {
  const showToast = useToast();
  const dispatch = useDispatch();
  const { t } = useTranslation()
  const language = localStorage.getItem('i18nextLng');
  const [age, setAge] = useState('');
  let [page, setPage] = useState(1);
  const PER_PAGE = 9;
  const [customers, setCustomers] = useState([])
  const [warehouses, setWareHouses] = useState([])
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [rows, setRows] = useState([])
  const [rowsPayment, setRowsPayment] = useState(['rows'])
  const [productName, setProductName] = useState([])
  const [unitCost, setUnitCost] = useState([])
  const [qty, setQty] = useState([])
  const [total, setTotal] = useState([])
  const [unit, setUnit] = useState([])
  const [productIds, setProductIds] = useState([])
  const [selectedAccount, setSelectedAccount] = useState([])
  const [selectedAmount, setSelectedAmount] = useState([])
  const [selectedCustomerId, setSelectedCustomerId] = useState("")
  const [selectedWareHouse, setSelectedWareHouse] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const count = Math.ceil(products.length / PER_PAGE);
  const _DATA = usePagination(products, PER_PAGE);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedSubTotal, setSelectedSubTotal] = useState(0.00)
  const [selectedVat, setSelectedVat] = useState(0.00)
  const [selectedDiscount, setSelectedDiscount] = useState(0.00)
  const [selectedRounding, setSelectedRounding] = useState(0.00)
  const [selectedPayable, setSelectedPayable] = useState(0)
  const [selectedPaid, setSelectedPaid] = useState(0)
  const [selectedChange, setSelectedChange] = useState(0)
  const [selectedDue, setSelectedDue] = useState(0)
  const [openPayment, setOpenPayment] = useState(false)
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  dispatch(openDrawer(false))


  const initialValues = {
    date: moment().format('YYYY-MM-DD'),
    // customer_id: selectedCustomerId,
    // warehouse_id: Object.keys(selectedData).length > 0 ? selectedData.warehouse_id : selectedWareHouse,
    // timeSlot_id: Object.keys(selectedData).length > 0 ? selectedData.time_slot_id : selectedtimeSlot_id,
    // user_id: selectedUser,
    // unit_cost: selectedProductData.length > 0 ? selectedProductData.map(item => { return item['unit_cost']; }) : '',
    // qty: selectedProductData.length > 0 ? selectedProductData.map(item => { return item['qty']; }) : '',
    // expire_date: selectedProductData.length > 0 ? selectedProductData.map(item => { return item['expire_date']; }) : '',
    // comment: selectedProductData.length > 0 ? selectedProductData.map(item => { return item['comment']; }) : '',
    // customer_name: Object.keys(selectedData).length > 0 ? selectedData.customer_name : customerSelectedData.name,
    // customer_phone: Object.keys(selectedData).length > 0 ? selectedData.phone : customerSelectedData.phone,
    // address: Object.keys(selectedData).length > 0 ? selectedData.address : customerSelectedData.address,
    // district_id: selectedDistrict,
    // area_id: selectedArea,
    // zip_code: Object.keys(selectedData).length > 0 ? selectedData.zip_code : customerSelectedData.zip_code,
    // sub_total: selectedSubTotal,
    // vat: selectedVat,
    // shipping_cost: selectedShippingCost,
    // cod_charge: selectedCodCharge,
    // rounding: selectedRounding,
    // payable: selectedPayable,
    // delivery_date: moment().format('YYYY-MM-DD'),
    // order_date: moment().format('YYYY-MM-DD'),
    // discount: 0,
    // special_discount: 0,
    // total: total,
    // order_note: Object.keys(selectedData).length > 0 ? selectedData.order_note : ''

  };

  const handleChange1 = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getCustomers();
    getWareshouses();
    getCategories();
    getProducts();
  }, [])

  const getCategories = async () => {
    const response = await axios.get(`${baseUrl}/categories`, {
      headers: headers
    });
    setCategories(response.data.data);
  }
  const getCustomers = async () => {
    const response = await axios.get(`${baseUrl}/getCustomers`, {
      headers: headers
    });
    setCustomers(response.data.data);
  }

  const handleClickOpenDialog = () => {
		setOpen(true);
	};

  const handelFatchCustomer = () => {
		setFetch(true);
	}

  const handleCloseDialog = () => {
		setOpen(false);
		setSelectedData({});
		getCustomers();
	};

  const getWareshouses = async () => {
    const response = await axios.get(`${baseUrl}/wareHouses`, {
      headers: headers
    });
    setWareHouses(response.data.data);
  }
  const getProducts = async () => {
    const response = await axios.get(`${baseUrl}/allProduct`, {
      headers: headers
    });
    setProducts(response.data.data);
  }
  const setProdutInfo = (productInfo) => {
    const stockLimit = productInfo.stock_in - productInfo.stock_out;
    let totalVat = 0;
    if (productInfo.vat_type === 10) {
      totalVat = Math.round((productInfo.sale_price * productInfo.vat) / 100);
    }
    if (productInfo.vat_type === 20) {
      totalVat = productInfo.vat;
    }
    const afterDiscount = Math.round((productInfo.sale_price * productInfo.discount) / 100);
    const isObjectPresent = productIds.find(res => res === productInfo.id);
    if (!isObjectPresent) {
      setRows([
        ...rows,
        productInfo
      ]);

      setProductIds([
        ...productIds,
        productInfo.id
      ])
      setUnit([
        ...unit,
        productInfo.unit + ` ` + productInfo.unit_name
      ]);
      setProductName([
        ...productName,
        productInfo.product_name
      ]);
      setUnitCost([
        ...unitCost,
        productInfo.discount > 0 ? productInfo.sale_price - afterDiscount : productInfo.sale_price
      ])
      setQty([
        ...qty,
        1
      ]);
      setTotal([
        ...total,
        productInfo.discount > 0 ? (productInfo.sale_price - afterDiscount) * 1 : productInfo.sale_price * 1
      ]);
      const SubTotal = productInfo.discount > 0 ? (productInfo.sale_price - afterDiscount) * 1 : productInfo.sale_price * 1
      console.log('total', selectedPayable, totalVat, SubTotal, SubTotal + afterDiscount + totalVat + selectedPayable)
      setSelectedSubTotal(SubTotal + selectedSubTotal)
      setSelectedVat(selectedVat + totalVat);
      setSelectedDiscount(selectedDiscount + afterDiscount)
      setSelectedPayable(SubTotal + totalVat + selectedPayable - afterDiscount)
      setSelectedDue(SubTotal + totalVat + selectedPayable - afterDiscount)
      showToast('Add Successfully ', 'success');
    } else {
      const findIndex = productIds.findIndex(res => res === productInfo.id);
      if (stockLimit <= qty[findIndex]) {
        showToast('Stock Limit is over ', 'error');
      } else {
        qty[findIndex] = qty[findIndex] + 1
        setQty([
          ...qty
        ]);
        setTotal([
          ...total,
          productInfo.discount > 0 ? (productInfo.sale_price - afterDiscount) * qty[findIndex] : productInfo.sale_price * qty[findIndex]
        ]);
        const SubTotal = productInfo.discount > 0 ? (productInfo.sale_price - afterDiscount) * qty[findIndex] : productInfo.sale_price * qty[findIndex]
        setSelectedSubTotal(SubTotal + selectedSubTotal)
        setSelectedVat(selectedVat + totalVat);
        setSelectedDiscount(selectedDiscount + afterDiscount)
        setSelectedPayable(SubTotal + totalVat - afterDiscount)
        setSelectedDue(SubTotal + totalVat - afterDiscount)
        showToast('Add Successfully ', 'success');
      }
    }

  }

  const increment = (index) => {
    qty[index] = qty[index] + 1;
    total[index] = unitCost[index] * qty[index];

    setQty([
      ...qty,
    ]);
    setTotal([
      ...total,
    ]);
    let totalVat = 0;
    let subTotal = 0;
    if (rows[index].vat_type === 10) {
      totalVat = Math.round((total[index] * rows[index].vat) / 100);
    }
    if (rows[index].vat_type === 20) {
      totalVat = rows[index].vat;
    }
    const afterDiscount = Math.round((rows[index].sale_price * rows[index].discount) / 100);
    total.map(res => subTotal += res);
    // const SubTotal = rows[index].discount > 0 ? (rows[index].sale_price - afterDiscount) * 1 : rows[index].sale_price * 1
    const SubTotal = subTotal;

    setSelectedSubTotal(SubTotal)
    setSelectedVat(totalVat);
    setSelectedDiscount(selectedDiscount + afterDiscount)
    const totalPayable = (SubTotal + totalVat) - (selectedDiscount + afterDiscount);
    setSelectedPayable(totalPayable)
    setSelectedDue(totalPayable)
  }
  const decrement = (index) => {
    const prevDiscount = Math.round((rows[index].sale_price * rows[index].discount) / 100);
    qty[index] = qty[index] > 0 ? qty[index] - 1 : 0;
    total[index] = unitCost[index] * qty[index];

    setQty([
      ...qty,
    ]);
    setTotal([
      ...total,
    ]);
    let totalVat = 0;
    let subTotal = 0;
    if (rows[index].vat_type === 10) {
      totalVat = Math.round((total[index] * rows[index].vat) / 100);
    }
    if (rows[index].vat_type === 20) {
      totalVat = rows[index].vat;
    }
    const afterDiscount = Math.round((rows[index].sale_price * rows[index].discount) / 100);
    total.map(res => subTotal += res);
    // const SubTotal = rows[index].discount > 0 ? (rows[index].sale_price - afterDiscount) * 1 : rows[index].sale_price * 1
    const SubTotal = subTotal;

    setSelectedSubTotal(SubTotal)
    setSelectedVat(totalVat);
    setSelectedDiscount(selectedDiscount + afterDiscount)
    const totalPayable = (SubTotal + totalVat) - (selectedDiscount + afterDiscount);
    setSelectedPayable(totalPayable)
    setSelectedDue(totalPayable)
  }

  const handleAccount = (e, index) => {
    selectedAccount[index] = e.target.value
    setSelectedAccount([
      ...selectedAccount
    ])
  }
  const handleAmount = (e, index) => {
    selectedAmount[index] = e.target.value
    setSelectedAmount([
      ...selectedAmount
    ])
    console.log('selectedAmount', selectedAmount)
    let sum = 0;
    selectedAmount.map(res => sum += parseInt(res));
    setSelectedPaid(sum);
  }

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('customer_id', selectedCustomerId);
      formData.append('warehouse_id', selectedWareHouse);
      formData.append('sale_date', values.date);
      formData.append('category_id', selectedCategory);
      formData.append('discount_amount', selectedDiscount);
      formData.append('rounding', selectedRounding);
      formData.append('sub_total', selectedSubTotal);
      formData.append('vat', selectedVat);
      formData.append('payable', selectedPayable);
      formData.append('paid_amount', selectedPaid);
      formData.append('change', selectedPaid > selectedDue ? selectedPaid - selectedDue : selectedChange);
      // formData.append('unit_price', JSON.stringify(unitCost));
      formData.append('product_id', JSON.stringify(productIds));
      formData.append('qty', JSON.stringify(qty));
      formData.append('total_price', JSON.stringify(total));
      formData.append('payment_method', JSON.stringify(selectedAccount));
      formData.append('amount', JSON.stringify(selectedAmount));

      // if (Object.keys(selectedData).length > 0) {
      //   formData.append('_method', 'PUT');
      // }

      const response = await axios.post(`${baseUrl}/sales`, formData, {
        headers: headers
      });
      if (response.status === 201) {
        showToast('Add Successfully ', 'success');
        navigate(`/inventory/sale/${response.data.data.id}`);
      }
      if (response.status === 200) {
        showToast('Add Successfully ', 'success');
        navigate(`/inventory/sale/${response.data.data.id}`);
      }
      if (response?.errors?.length > 0) {
        showToast(response.errors[0], 'error');
      }
    } catch (error) {
      showToast(error.response.data.errors[0], 'error');
    }
  };

  const handleRemoveRowPayment = (index) => {
    setRowsPayment(
      rowsPayment.filter((a, i) =>
        i !== index
      )
    );
    setSelectedAccount(
      selectedAccount.filter((a, i) =>
        i !== index
      ));
    setSelectedAmount(
      selectedAmount.filter((a, i) =>
        i !== index
      ));
  }
  const handleRemoveRow = (index) => {
    setRows(
      rows.filter((a, i) =>
        i !== index
      )
    );
    setProductName(
      productName.filter((a, i) =>
        i !== index
      ));
    setUnit(
      unit.filter((a, i) =>
        i !== index
      ));

    setProductIds(
      productIds.filter((a, i) =>
        i !== index
      ))
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ errors, touched, values, setFieldValue }) => {
        return <>
          <div className="pos__page">
            <Form>
              <MainCard content={false}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} className="border__right">
                      <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                        <Grid item xs={12}>
                          <div className="post__add__edit">
                          <div style={{ marginTop: "18px", position: "relative", left: "10px" }}>
                            <Tooltip title={t('Add Customer')}>
                              <Fab
                                color="primary"
                                size="small"
                                onClick={handleClickOpenDialog}
                                sx={{ boxShadow: 'none', ml: 1, width: 45, height: 46, minHeight: 32, borderRadius: "10%" }}
                              >
                                <PersonAddIcon fontSize="medium" />
                              </Fab>
                            </Tooltip>
                            <CustomerAdd handelFatchCustomer={handelFatchCustomer} open={open} handleCloseDialog={handleCloseDialog} selectedData={selectedData} />
                          </div>
                          </div>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <label>Customer Name</label>
                          <Autocomplete
                            fullWidth
                            options={customers} // Assuming customers is an array of options
                            autoHighlight
                            getOptionLabel={(option) => `${language === 'bn' ? option.name_bn : option.name} - ${option.phone}`}
                            value={customers.find((customer) => customer.id === selectedCustomerId) || null} // Find the customer object with the selectedCustomerId
                            onChange={(event, value) => setSelectedCustomerId(value ? value.id : '')} // Set the selectedCustomerId to the ID of the selected customer
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                error={errors.customer_id && touched.customer_id}
                                helperText={touched.customer_id && errors.customer_id}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRight: 'none', // Remove right border
                                  },
                                }}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <label>Enter Date</label>
                          <Field name="date">
                            {({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                name='date'
                                type='date'
                              />
                            )}
                          </Field>
                        </Grid>
                        <Grid container spacing={2} mt={3}>
                          <Grid item xs></Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-filled-label">{t('Scan your Barcode')}</InputLabel>

                              {/* <Field name="name">
                          {({ field }) => (
                            <TextField
                              {...field}
                              // onChange={(e) => disCalculationPer(e, index)}
                              fullWidth
                            />
                          )}
                        </Field> */}

                            </FormControl>
                          </Grid>

                          <Grid item xs></Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TableContainer>
                              <Table aria-labelledby="tableTitle">
                                <TableHead>
                                  <TableRow>
                                    <TableCell align='center'>Product</TableCell>
                                    <TableCell>Unit</TableCell>
                                    <TableCell>U. Price</TableCell>
                                    <TableCell>Qty</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell><ClearIcon /></TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {rows.map((value, index) => {
                                    console.log('productIds', productIds[index])
                                    return <TableRow>
                                      <TableCell key={index}>
                                        {productName[index]}
                                      </TableCell>
                                      <TableCell key={index}>
                                        {unit[index]}
                                      </TableCell>
                                      <TableCell key={index}>
                                        {unitCost[index]}
                                      </TableCell>
                                      <TableCell key={index}>
                                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                                          <Button onClick={() => decrement(index)}><RemoveCircleOutlineIcon /></Button>
                                          <Button>{qty[index]}</Button>
                                          <Button onClick={() => increment(index)}><AddCircleOutlineIcon /></Button>
                                        </ButtonGroup>
                                      </TableCell>
                                      <TableCell key={index}>
                                        {total[index]}
                                      </TableCell>
                                      <TableCell>
                                        <Button variant="outlined" color="error"
                                          onClick={() => handleRemoveRow(index)}
                                        >
                                          <RemoveCircleOutlinedIcon />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={7} className="pos__list">
                      <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <label>{t('Select Category')}</label>
                        <FormControl fullWidth>
                          <Autocomplete
                            options={categories}
                            autoHighlight
                            getOptionLabel={(option) => language === 'bn' ? option.name_bn : option.name}
                            value={categories.find((category) => category.id === selectedCategory) || null}
                            onChange={(event, value) => setSelectedCategory(value ? value.id : '')}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                error={errors.category_id && touched.category_id}
                                helperText={touched.category_id && errors.category_id}
                              />
                            )}
                          />
                        </FormControl>
                      </Grid>

                        <Grid item xs={12} sm={6}>
                          <label>{t('Select Warehouse')}</label>
                          <FormControl fullWidth>
                            <Select
                              labelId="demo-simple-select-filled-label"
                              id="demo-simple-select-filled"
                              fullWidth
                              value={selectedWareHouse}
                              name='warehouse_id'
                              required
                              label="Ware House"
                              onChange={(e) => setSelectedWareHouse(e.target.value)}
                              // error={errors.warehouse_id && touched.warehouse_id}
                              error={
                                touched.governorates &&
                                Boolean(errors.governorates)
                              }
                              helperText={
                                touched.governorates && errors.governorates
                              }
                            // helperText={
                            //   errors.warehouse_id && touched.warehouse_id
                            //     ? errors.warehouse_id
                            //     : ''
                            // }
                            >
                              <MenuItem value="" selected>
                                <em>None</em>
                              </MenuItem>
                              {warehouses.length > 0 && warehouses.map((option, index) => {
                                return <MenuItem key={index} value={option.id}>
                                  {language === 'bn' ? option.name_bn : option.name}
                                </MenuItem>
                              })}
                            </Select>
                            {touched.warehouse_id && errors.warehouse_id ? (
                              <FormHelperText
                                sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                              >
                                {touched.warehouse_id && errors.warehouse_id}
                              </FormHelperText>
                            ) : null}
                          </FormControl>
                        </Grid>
                      </Grid>

                      <div className="pos__content">
                        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                          {/* item */}

                          {_DATA.currentData().map(res => {
                            const afterDiscount = Math.round((res.sale_price * res.discount) / 100);
                            return <Grid item xs={12} sm={4}>
                              <div className="pos__content__item">
                                <h4>{res.product_name}</h4>
                                <div className="pos__content__item__bottom">
                                  <h5>
                                    {res.discount > 0 && <del style={{ marginRight: '5px' }}>{res.sale_price}<TbCurrencyTaka /></del>}
                                    {res.discount > 0 ? res.sale_price - afterDiscount : res.sale_price} <TbCurrencyTaka />
                                  </h5>
                                  <h6 className={res.stock_in - res.stock_out > 0 ? '' : "red"}>{res.stock_in - res.stock_out > 0 ? res.stock_in - res.stock_out : 'Stock Out'}</h6>
                                </div>
                                <div className="overlay">
                                  {(res.stock_in - res.stock_out) > 0 ?
                                    <Button>
                                      <CiSquarePlus onClick={() => setProdutInfo(res)} />
                                    </Button>
                                    : <Button>
                                      <CiCircleMinus className='red' />
                                    </Button>}
                                </div>
                              </div>
                            </Grid>
                          })}
                          <Stack alignItems="center">
                            <Pagination
                              count={count}
                              size="large"
                              page={page}
                              variant="outlined"
                              shape="rounded"
                              onChange={handleChange1}
                            />
                          </Stack>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>

                  <div className="pos__payment">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <div className="pos__payment__item">
                              <h4>Subtotal : {selectedSubTotal}</h4>
                              <h4>VAT : {selectedVat}</h4>
                              <h4>Discount : {selectedDiscount}</h4>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <div className="pos__payment__item">
                              <h4>Rounding : {selectedRounding}</h4>
                              <h4>Payable : {selectedPayable}</h4>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <div className="pos__payment__item">
                              <h4>Paid : {selectedPaid}</h4>
                              <h4>Due : {selectedDue - selectedPaid <= 0 ? 0 : selectedDue - selectedPaid}</h4>
                              <h4>Change : {selectedPaid > selectedDue ? selectedPaid - selectedDue : selectedChange}</h4>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={1}></Grid>

                      <Grid item xs={12} sm={3}>
                        <div className="pos__payment__item__button">
                          <Button>Recent Trans.</Button>
                          <Button onClick={() => setOpenPayment(!openPayment)}>Payment</Button>
                          <Dialog
                            open={openPayment}
                            onClose={() => setOpenPayment(false)}
                            maxWidth={'md'}
                            fullWidth={true}
                          >
                            <DialogTitle id="alert-dialog-title" center>
                              Payment
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                <span><b>Payable: </b>{selectedPayable}</span>
                                <span style={{ float: 'right' }}><b>Paid : </b>{selectedPaid}</span>

                              </DialogContentText>
                              <Table aria-label="a dense table">
                                <TableBody>
                                  {rowsPayment.length > 0 && rowsPayment.map((res, index) => {
                                    return <TableRow>
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell key={index}>
                                        <InputLabel id="demo-simple-select-filled-label">{t('Account')}</InputLabel>
                                        <Select
                                          labelId="demo-simple-select-filled-label"
                                          id="demo-simple-select-filled"
                                          fullWidth
                                          value={selectedAccount[index]}
                                          label="Account"
                                          onChange={(e) => handleAccount(e, index)}
                                        >
                                          <MenuItem value="">
                                            <em>Select</em>
                                          </MenuItem>
                                          <MenuItem value="1">Bank Name</MenuItem>
                                          <MenuItem value="2">Petty Cash</MenuItem>
                                          <MenuItem value="3">Cash</MenuItem>
                                          <MenuItem value="4">Petty Cash Opening Balance</MenuItem>
                                        </Select>
                                      </TableCell>
                                      <TableCell>
                                      <label htmlFor="">Amount</label>
                                        <Field name={`amount.${index}`}>
                                          {({ field }) => (
                                            <TextField
                                              {...field}
                                              fullWidth
                                              label={t("Amount") + '*'}
                                              value={selectedAmount[index]}
                                              error={errors.amount && touched.amount}
                                              onChange={(e) => handleAmount(e, index)}
                                              helperText={
                                                errors.amount && touched.amount
                                                  ? errors.amount
                                                  : ''
                                              }
                                            />
                                          )}
                                        </Field>
                                      </TableCell>
                                      <TableCell>
                                        {index > 0 ? <Button variant="outlined" color="error" onClick={() => handleRemoveRowPayment(index)}><RemoveCircleOutlineIcon /></Button> : <Button variant="contained" onClick={() => setRowsPayment([...rowsPayment, 'rows'])}><AddCircleOutlineIcon /></Button>}
                                      </TableCell>
                                    </TableRow>
                                  })}
                                </TableBody>
                              </Table>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={() => setOpenPayment(false)}>Close</Button>
                            </DialogActions>
                          </Dialog>
                          <Button>Draft</Button>
                          <Button type='submit'>Submit</Button>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </CardContent>
              </MainCard>
            </Form>
          </div>
        </>
      }}
    </Formik>
  );
};

export default POS;
