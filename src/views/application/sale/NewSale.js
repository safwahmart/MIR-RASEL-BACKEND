import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import {
  Autocomplete,
  Button,
  CardContent,
  DialogActions,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';
import { baseUrl } from 'api/apiConfig';
import { headers } from 'api/auth';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useToast } from 'hooks/useToast';
import moment from 'moment';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'store';
import { openDrawer } from 'store/slices/menu';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
  // supplier_id: Yup.string().required('Supplier  is required'),
  // warehouse_id: Yup.string().required('Warehouse  is required'),
});

const NewSale = () => {
  const showToast = useToast();
  const { t } = useTranslation()
  const language = localStorage.getItem('i18nextLng');
  const dispatch = useDispatch();
  const [users, setUsers] = useState([])
  const [customers, setCustomers] = useState([])
  const [warehouses, setWareHouses] = useState([])
  const [products, setProducts] = useState([])
  const [rows, setRows] = useState([])
  const [productName, setProductName] = useState([])
  const [variation, setVariation] = useState([])
  const [stock, setStock] = useState([])
  const [unitCost, setUnitCost] = useState([])
  const [qty, setQty] = useState([])
  const [total, setTotal] = useState([])
  const [unit, setUnit] = useState([])
  const [sku, setSku] = useState([])
  const [districts, setDistricts] = useState([])
  const [timeSlots, setTimeSlots] = useState([])
  const [areas, setAreas] = useState([])
  const [variations, setVariations] = useState([[]])
  const [productIds, setProductIds] = useState([])
  const [selectedUser, setSelectedUser] = useState("")
  const [selectedWareHouse, setSelectedWareHouse] = useState("")
  const [selectedtimeSlot_id, setSelectedtimeSlot_id] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedArea, setSelectedArea] = useState("")
  const [selectedCustomerId, setSelectedCustomerId] = useState("")
  const [selectedPrintOption, setSelectedPrintOption] = useState(1)
  const [selectedData, setSelectedData] = useState({});
  const [customerSelectedData, setCustomerSelectedData] = useState({});
  const [selectedProductData, setSelectedProductData] = useState([]);
  const [selectedSubTotal, setSelectedSubTotal] = useState(0.00)
  const [selectedVat, setSelectedVat] = useState(0.00)
  const [vat, setVat] = useState([])
  const [totalVat, setTotalVat] = useState([])
  const [vatType, setVatType] = useState([])
  const [discount, setDiscount] = useState([])
  const [discountFlat, setDiscountFlat] = useState([])
  const [totalDiscount, setTotalDiscount] = useState([])
  const [selectedAccount, setSelectedAccount] = useState([])
  const [selectedAmount, setSelectedAmount] = useState([])
  const [rowsPayment, setRowsPayment] = useState(['rows'])
  const [selectedDiscount, setSelectedDiscount] = useState(0.00)
  const [selectedDiscountPercent, setSelectedDiscountPercent] = useState(0.00)
  const [selectedRounding, setSelectedRounding] = useState(0.00)
  const [selectedPaidAmount, setSelectedPaidAmount] = useState(0)
  const [selectedDueAmount, setSelectedDueAmount] = useState(0)
  const [selectedChange, setSelectedChange] = useState(0)
  const [selectedPayable, setSelectedPayable] = useState(0)
  const [selectedPaid, setSelectedPaid] = useState(0)
  const [openPayment, setOpenPayment] = useState(false)
  dispatch(openDrawer(false))

  const { id } = useParams();

  let navigate = useNavigate();

  const initialValues = {
    date: Object.keys(selectedData).length > 0 ? selectedData.date : moment().format('YYYY-MM-DD'),
    customer_id: selectedCustomerId,
    warehouse_id: Object.keys(selectedData).length > 0 ? selectedData.warehouse_id : selectedWareHouse,
    timeSlot_id: Object.keys(selectedData).length > 0 ? selectedData.time_slot_id : selectedtimeSlot_id,
    user_id: selectedUser,
    unit_cost: selectedProductData.length > 0 ? selectedProductData.map(item => { return item['unit_cost']; }) : '',
    qty: selectedProductData.length > 0 ? selectedProductData.map(item => { return item['qty']; }) : '',
    expire_date: selectedProductData.length > 0 ? selectedProductData.map(item => { return item['expire_date']; }) : '',
    comment: selectedProductData.length > 0 ? selectedProductData.map(item => { return item['comment']; }) : '',
    customer_name: Object.keys(selectedData).length > 0 ? selectedData.customer_name : customerSelectedData.name,
    customer_phone: Object.keys(selectedData).length > 0 ? selectedData.phone : customerSelectedData.phone,
    address: Object.keys(selectedData).length > 0 ? selectedData.address : customerSelectedData.address,
    district_id: selectedDistrict,
    area_id: selectedArea,
    zip_code: Object.keys(selectedData).length > 0 ? selectedData.zip_code : customerSelectedData.zip_code,
    sub_total: selectedSubTotal,
    vat: selectedVat,
    rounding: selectedRounding,
    payable: selectedPayable,
    paid_amount: selectedPaidAmount,
    due_amount: selectedDueAmount,
    change: selectedChange,
    delivery_date: moment().format('YYYY-MM-DD'),
    order_date: moment().format('YYYY-MM-DD'),
    discount: 0,
    special_discount: 0,
    total: total,
    order_note: Object.keys(selectedData).length > 0 ? selectedData.order_note : ''

  };
  console.log('customerData', customerSelectedData)
  useEffect(() => {
    getUsers()
    getCustomers()
    getWareshouses()
    getProducts();
    getDistricts();
    getTimeSlots();
  }, []);

  const setCustomerData = (id) => {
    const customerData = customers.find(res => res.id === id);
    setCustomerSelectedData(customerData)
    setSelectedDistrict(customerData.district)
    getArea(customerData.district);
    setSelectedArea(customerData.area)
  }

  const handleAddRow = () => {
    setRows([
      ...rows,
      'new-row'
    ]);
  }
  useEffect(() => {
    if (id) {
      getOrderInfo(id);
      getOrderProductInfo(id);
    }
  }, [id]);

  useEffect(() => {
    if (Object.keys(selectedData).length > 0) {
      setOrderInfo();
    }
  }, [selectedData]);

  useEffect(() => {
    if (selectedProductData.length > 0) {
      setOrderProductInfo();
    }
  }, [selectedProductData]);

  const getDistricts = async () => {
    const response = await axios.get(`${baseUrl}/districts`, {
      headers: headers
    });
    setDistricts(response.data.data);
  }
  const getTimeSlots = async () => {
    const response = await axios.get(`${baseUrl}/timeSlotes`, {
      headers: headers
    });
    setTimeSlots(response.data.data);
  }

  const getArea = async (id) => {
    const response = await axios.get(`${baseUrl}/getArea/${id}`, {
      headers: headers
    });
    setAreas(response.data.data);
  }

  const getOrderInfo = async (id) => {
    const response = await axios.get(`${baseUrl}/getOrder/${id}`, {
      headers: headers
    });
    setSelectedData(response.data);
  }
  const getOrderProductInfo = async (id) => {
    const response = await axios.get(`${baseUrl}/getOrderProduct/${id}`, {
      headers: headers
    });
    setSelectedProductData(response.data.data);
  }

  const setOrderInfo = () => {
    setSelectedWareHouse(selectedData.warehouse_id)
    setSelectedDistrict(selectedData.district)
    getArea(selectedData.district);
    setSelectedArea(selectedData.area);
    setSelectedtimeSlot_id(selectedData.time_slot_id)
    setSelectedCustomerId(selectedData.customer_id)
    setSelectedUser(selectedData.sale_by)
  }
  const setOrderProductInfo = async () => {
    setRows([
      ...selectedProductData
    ]);
    let sum = 0;
    for (let i = 0; i < selectedProductData.length; i++) {
      productIds[i] = selectedProductData[i].product_id;
      variation[i] = selectedProductData[i].variation_id;
      const variationData = await getVariation(productIds[i]);
      productName[i] = selectedProductData[i].product_name
      stock[i] = selectedProductData[i].stock_in - selectedProductData[i].stock_out;
      unit[i] = selectedProductData[i].unit_name
      sku[i] = selectedProductData[i].product_sku
      unitCost[i] = selectedProductData[i].unit_price
      qty[i] = selectedProductData[i].qty
      total[i] = selectedProductData[i].total_price
      variations[i] = variationData;
      sum += total[i];
    }
    setProductIds([
      ...productIds
    ])
    setVariations([
      ...variations
    ]);
    setVariation([
      ...variation
    ]);
    setSku([
      ...sku
    ]);
    setUnit([
      ...unit
    ]);
    setProductName([
      ...productName
    ]);
    setStock([
      ...stock
    ])
    setUnitCost([
      ...unitCost
    ])
    setQty([
      ...qty
    ]);
    setTotal([
      ...total
    ]);
    setSelectedSubTotal(sum);
    setSelectedPayable(sum);
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
    let sum = 0;
    selectedAmount.map(res => sum += parseInt(res));
    setSelectedPaid(sum);
  }

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
    setStock(
      stock.filter((a, i) =>
        i !== index
      ));
    setUnit(
      unit.filter((a, i) =>
        i !== index
      ));
    setSku(
      sku.filter((a, i) =>
        i !== index
      ));

    setProductIds(
      productIds.filter((a, i) =>
        i !== index
      ))
  }

  const handleVariation = (e, index) => {
    variation[index] = e.target.value
    setVariation([
      ...variation
    ])
  }

  const getUsers = async () => {
    const response = await axios.get(`${baseUrl}/users`, {
      headers: headers
    });
    setUsers(response.data.data);
  }
  const getCustomers = async () => {
    const response = await axios.get(`${baseUrl}/getCustomers`, {
      headers: headers
    });
    setCustomers(response.data.data);
  }
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
  const handleProduct = async (e, index) => {
    const product = e.target.value;
    discount[index] = 0
    discountFlat[index] = 0
    vat[index] = 0
    vatType[index] = 0
    setVat([
      ...vat
    ])
    setVatType([
      ...vatType
    ])
    setDiscount([
      ...discount
    ])
    setDiscountFlat([
      ...discountFlat
    ])
    const productData = products.find(res => res.id === product);

    productName[index] = productData.product_name
    stock[index] = productData.stock_in - productData.stock_out
    unit[index] = productData.unit_name
    sku[index] = productData.product_sku
    unitCost[index] = productData.sale_price
    discount[index] = productData.discount
    discountFlat[index] = productData.discount_flat
    vat[index] = productData.vat
    vatType[index] = productData.vat_type
    qty[index] = 0
    total[index] = 0
    productIds[index] = product
    setProductIds([
      ...productIds
    ])
    const variationData = await getVariation(product);
    variations[index] = variationData
    setVariations([
      ...variations
    ]);
    setSku([
      ...sku
    ]);
    setStock([
      ...stock
    ]);
    setUnit([
      ...unit
    ])
    setUnitCost([
      ...unitCost
    ])
    setQty([
      ...qty
    ])
    setTotal([
      ...total
    ])
    setDiscount([
      ...discount
    ])
    setDiscountFlat([
      ...discountFlat
    ])
    setVat([
      ...vat
    ])
    setVatType([
      ...vatType
    ])
    const afterDiscount = Math.round((unitCost[index] * 1 * discount[index]) / 100);
    let totVat = 0;
    if (vatType[index] === 10) {
      totVat = Math.round((unitCost[index] * vat[index]) / 100);
    }
    if (vatType[index] === 20) {
      totVat = vat[index];
    }
    totalDiscount[index] = afterDiscount;
    totalVat[index] = totVat;
    setTotalDiscount([
      ...totalDiscount
    ])
    setTotalVat([
      ...totalVat
    ])

  }
  const quantityCalculation = (value, index) => {
    console.log('vatType[index]', vatType[index], vat[index])
    const unitPrice = unitCost[index];
    const totalPrice = value * unitPrice;
    if (value <= stock[index]) {
      total[index] = totalPrice;
      qty[index] = value;
      setTotal([
        ...total
      ])
      setQty([
        ...qty
      ])
      let sum = 0;
      let sumDis = 0;
      let sumVat = 0;
      total.map(res => sum += res);
      const afterDiscount = Math.round((unitCost[index] * qty[index] * discount[index]) / 100);
      discountFlat[index] = afterDiscount
      setDiscount([...discount])
      discountFlat.map(res => sumDis += res);
      totalVat.map(res => sumVat += res);
      setSelectedVat(sumVat);
      setSelectedDiscount(sumDis)
      const percent = ((sumDis * 100) / unitPrice);
      setSelectedDiscountPercent(percent)
      setSelectedSubTotal(sum.toFixed(2));
      setSelectedPayable(sum + sumVat - sumDis);
      setSelectedDueAmount(sum + sumVat - sumDis);
    } else {
      total[index] = 0;
      qty[index] = 0;
      setTotal([
        ...total
      ])
      setQty([
        ...qty
      ])
      showToast('You cannot select more than stock', 'error');
    }

  }

  const discountPerCalculation = (value) => {
    setSelectedDiscountPercent(value);
    const discount = (selectedSubTotal * value) / 100;
    setSelectedDiscount(discount)
    setSelectedPayable(Math.round(selectedSubTotal) + selectedVat - discount);
    setSelectedDueAmount(Math.round(selectedSubTotal) + selectedVat - discount);

  }
  const getVariation = async (id) => {
    const response = await axios.get(`${baseUrl}/getVariation/${id}`, {
      headers: headers
    });
    return response.data.data;
  }
  const onSubmit = async (values) => {
    debugger
    try {
      const formData = new FormData();
      formData.append('customer_id', selectedCustomerId);
      formData.append('warehouse_id', selectedWareHouse);
      formData.append('sale_date', values.date);
      formData.append('sale_by', selectedUser);
      formData.append('discount_amount', selectedDiscount);
      formData.append('rounding', selectedRounding);
      formData.append('sub_total', selectedSubTotal);
      formData.append('vat', selectedVat);
      formData.append('payable', selectedPayable);
      formData.append('paid_amount', selectedPaid);
      formData.append('change', selectedPaid > selectedDueAmount ? selectedPaid - selectedDueAmount : selectedChange);
      formData.append('due', selectedPaid > selectedDueAmount ? 0 : selectedDueAmount - selectedPaid);
      formData.append('product_id', JSON.stringify(productIds));
      // formData.append('variation_id', JSON.stringify(variation));
      formData.append('qty', JSON.stringify(qty));
      formData.append('total_price', JSON.stringify(total));
      formData.append('payment_method', JSON.stringify(selectedAccount));
      formData.append('amount', JSON.stringify(selectedAmount));

      if (Object.keys(selectedData).length > 0) {
        formData.append('_method', 'PUT');
      }
      if (productIds.length > 0) {
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
      } else {
        showToast('Please Select Product', 'error');
      }

    } catch (error) {
      showToast(error.response.data.errors[0], 'error');
    }
  };

  const getScanData = async (e) => {
    debugger;
  }

  // search
	const handleProductChange = (newValue, index) => {
		if (newValue) {
			handleProduct({ target: { value: newValue.id } }, index);
		} else {
			// Handle clearing the selection if needed
		}
	};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ errors, touched, values, setFieldValue }) => {
        return (
          <Form>
            <MainCard title={t('Add New Sale')} content={false}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      {/* <InputLabel id="demo-simple-select-filled-label">{t('Select Customer')}</InputLabel> */}
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
                                label="Select Customer"
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
                      {touched.country && errors.country ? (
                        <FormHelperText
                          sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                        >
                          {touched.country && errors.country}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-filled-label">{t('Select Warehouse')}</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        fullWidth
                        value={selectedWareHouse}
                        name='warehouse_id'
                        label="Ware House"
                        onChange={(e) => setSelectedWareHouse(e.target.value)}
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
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>

                    <Field name={`date`}>
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Date") + '*'}
                          type='date'
                          value={values?.date}
                          error={errors.date && touched.date}
                          helperText={
                            errors.date && touched.date
                              ? errors.date
                              : ''
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      {/* <InputLabel id="demo-simple-select-filled-label">{t('Sale By')}</InputLabel> */}
                      <Autocomplete
                        fullWidth
                        options={users} // Assuming users is an array of options
                        autoHighlight
                        getOptionLabel={(option) => `${language === 'bn' ? option.name_bn : option.name}`}
                        value={selectedUser || null} // Ensure selectedUser is not undefined
                        onChange={(event, value) => setSelectedUser(value)}
                        renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t('Sale By')}
                          InputLabelProps={{
                          shrink: true,
                          }}
                          error={errors.user_id && touched.user_id}
                          helperText={touched.user_id && errors.user_id}
                        />
                        )}
                      />
                      {touched.country && errors.country ? (
                        <FormHelperText
                          sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                        >
                          {touched.country && errors.country}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                </Grid>
                <Box>
                  <Grid container spacing={2} mt={3}>
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel onChange={getScanData} id="demo-simple-select-filled-label">{t('Scan your Barcode')}</InputLabel>

                        <Field name="name">
                          {({ field }) => (
                            <TextField
                              {...field}
                              // onChange={(e) => disCalculationPer(e, index)}
                              fullWidth
                            />
                          )}
                        </Field>

                      </FormControl>
                    </Grid>
                    <Button variant="contained" padding="normal" style={{ height: '45px', marginTop: '18px' }} >Search</Button>

                    <Grid item xs></Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TableContainer>
                        <Table aria-labelledby="tableTitle">
                          <TableHead>
                            <TableRow>
                              <TableCell align='center'>Product</TableCell>
                              <TableCell component="th"
                                scope="row"
                                sx={{ cursor: 'pointer' }}>Variation</TableCell>
                              <TableCell>SKU</TableCell>
                              <TableCell>Stock</TableCell>
                              <TableCell>Unit</TableCell>
                              <TableCell>Unit Price</TableCell>
                              <TableCell>Qty</TableCell>
                              <TableCell>Total</TableCell>
                              <TableCell><Button variant="contained" padding="normal" onClick={handleAddRow} ><AddCircleRoundedIcon /></Button></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((value, index) => {
                              console.log('productIds', value)
                              return <TableRow>
                                <TableCell key={index}>
                                  <FormControl style={{ minWidth: 350 }}>
                                    {/* <InputLabel id="demo-simple-select-filled-label">{t('Select Product')}</InputLabel> */}
                                    <Autocomplete
																			options={products}
																			getOptionLabel={(option) => language === 'bn' ? option.product_name_bn : option.product_name}
																			value={products.find((product) => product.id === productIds[index]) || null}
																			onChange={(e, newValue) => handleProductChange(newValue, index)}
																			renderInput={(params) => <TextField {...params} label={t('Select Product')} required fullWidth />}
																		/>
                                  </FormControl>
                                </TableCell>
                                <TableCell key={index}>
                                  <FormControl style={{ minWidth: 140 }}>
                                    <InputLabel id="demo-simple-select-filled-label">{t('Select Variation')}</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-filled-label"
                                      id="demo-simple-select-filled"
                                      fullWidth
                                      value={variation[index]}
                                      required
                                      label="Variation"
                                      onChange={(e) => handleVariation(e, index)}
                                    >
                                      <MenuItem value="" selected>
                                        <em>None</em>
                                      </MenuItem>
                                      {variations[index]?.length > 0 && variations[index].map((option, index) => {
                                        return <MenuItem key={index} value={option.id}>
                                          {language === 'bn' ? option.name_bn : option.name}
                                        </MenuItem>
                                      })}
                                    </Select>
                                  </FormControl>
                                </TableCell>
                                <TableCell key={index}>
                                  <Field name="sku">
                                    {({ field }) => (
                                      <TextField
                                        {...field}
                                        style={{ width: '100px' }}
                                        value={sku[index]}
                                        disabled
                                      />
                                    )}
                                  </Field>
                                </TableCell>
                                <TableCell key={index}>
                                  <Field name="stock">
                                    {({ field }) => (
                                      <TextField
                                        {...field}
                                        style={{ width: '100px' }}
                                        value={stock[index]}
                                        disabled
                                      />
                                    )}
                                  </Field>
                                </TableCell>
                                <TableCell key={index}>
                                  <Field name="unit">
                                    {({ field }) => (
                                      <TextField
                                        {...field}
                                        style={{ width: '100px' }}
                                        value={unit[index]}
                                        disabled
                                      />
                                    )}
                                  </Field>
                                </TableCell>
                                <TableCell key={index}>
                                  <Field name={`unit_cost.${index}`}>
                                    {({ field }) => (
                                      <TextField
                                        {...field}
                                        fullWidth
                                        type='number'
                                        style={{ width: '100px' }}
                                        value={unitCost[index]}
                                        onChange={(e) => {
                                          unitCost[index] = e.target.value;
                                          setUnitCost([...unitCost])
                                        }}
                                        error={errors.unit_cost && touched.unit_cost}
                                        helperText={
                                          errors.unit_cost && touched.unit_cost
                                            ? errors.unit_cost
                                            : ''
                                        }
                                      />
                                    )}
                                  </Field>
                                </TableCell>
                                <TableCell key={index}>
                                  <Field name={`qty.${index}`}>
                                    {({ field }) => (
                                      <TextField
                                        {...field}
                                        fullWidth
                                        type='number'
                                        style={{ width: '100px' }}
                                        value={qty[index]}
                                        onChange={(e) => quantityCalculation(e.target.value, index)}
                                        error={errors.qty && touched.qty}
                                        helperText={
                                          errors.qty && touched.qty
                                            ? errors.qty
                                            : ''
                                        }
                                      />
                                    )}
                                  </Field>
                                </TableCell>
                                <TableCell key={index}>
                                  <Field name={`total_qty.${index}`}>
                                    {({ field }) => (
                                      <TextField
                                        {...field}
                                        fullWidth
                                        style={{ width: '100px' }}
                                        value={total[index]}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        error={errors.total_qty && touched.total_qty}
                                        helperText={
                                          errors.total_qty && touched.total_qty
                                            ? errors.total_qty
                                            : ''
                                        }
                                      />
                                    )}
                                  </Field>
                                </TableCell>
                                <TableCell>
                                  <Button variant="outlined" color="error" onClick={() => handleRemoveRow(index)}>
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
                  <Grid container spacing={2} mt={3}>
                    <Grid item xs={8}>
                      {openPayment && <Table aria-label="a dense table" >
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
                                <Field name={`amount.${index}`}>
                                  {({ field }) => (
                                    <TextField
                                      {...field}
                                      fullWidth
                                      label={t("Amount") + '*'}
                                      mt={3}
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
                      </Table>}
                    </Grid>

                    <Grid item xs={4} >
                      <Grid item mt={3} justify="flex-end">
                        <Field name={`sub_total`} >
                          {({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              type='text'
                              label="Subtotal"
                              defaultValue="Subtotal"
                              style={{ textAlign: 'right' }}
                              disabled
                              error={errors.sub_total && touched.sub_total}
                              helperText={
                                errors.sub_total && touched.sub_total
                                  ? errors.sub_total
                                  : ''
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item mt={3}>
                        <Field name={`vat`}>
                          {({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              type='text'
                              label="Vat"
                              defaultValue="Vat"
                              disabled
                              error={errors.vat && touched.vat}
                              helperText={
                                errors.vat && touched.vat
                                  ? errors.vat
                                  : ''
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item mt={3}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Field name={`discount`}>
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  type='text'
                                  label="Discount %"
                                  defaultValue="Discount"
                                  value={selectedDiscountPercent}
                                  onChange={(e) => discountPerCalculation(e.target.value)}
                                  error={errors.discount && touched.discount}
                                  helperText={
                                    errors.discount && touched.discount
                                      ? errors.discount
                                      : ''
                                  }
                                />
                              )}
                            </Field>
                          </Grid>
                          <Grid item xs={6}>
                            <Field name={`discount`}>
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  type='text'
                                  label="Discount"
                                  defaultValue="Discount"
                                  value={selectedDiscount}
                                  error={errors.discount && touched.discount}
                                  helperText={
                                    errors.discount && touched.discount
                                      ? errors.discount
                                      : ''
                                  }
                                />
                              )}
                            </Field>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item mt={3}>
                        <Field name={`rounding`}>
                          {({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              type='text'
                              disabled
                              label="Rounding"
                              defaultValue="Rounding"
                              error={errors.rounding && touched.rounding}
                              helperText={
                                errors.rounding && touched.rounding
                                  ? errors.rounding
                                  : ''
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item mt={3}>
                        <Field name={`payable`}>
                          {({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              type='text'
                              disabled
                              label="Payable"
                              defaultValue="Payable"
                              error={errors.payable && touched.payable}
                              helperText={
                                errors.payable && touched.payable
                                  ? errors.payable
                                  : ''
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item mt={3}>
                        <Field name={`paid_amount`}>
                          {({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              type='text'
                              InputProps={{
                                readOnly: openPayment,
                              }}
                              value={selectedPaid}
                              label="Paid Amount"
                              defaultValue="Paid Amount"
                              error={errors.paid_amount && touched.paid_amount}
                              onClick={() => setOpenPayment(true)}
                              helperText={
                                errors.paid_amount && touched.paid_amount
                                  ? errors.paid_amount
                                  : ''
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item mt={3}>
                        <Field name={`due_amount`}>
                          {({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              type='text'
                              disabled
                              label="Due Amount"
                              value={selectedDueAmount - selectedPaid <= 0 ? 0 : selectedDueAmount - selectedPaid}
                              defaultValue="Due Amount"
                              error={errors.due_amount && touched.due_amount}
                              helperText={
                                errors.due_amount && touched.due_amount
                                  ? errors.due_amount
                                  : ''
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item mt={3}>
                        <Field name={`change`}>
                          {({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              type='text'
                              disabled
                              label="Change"
                              defaultValue="Change"
                              value={selectedPaid > selectedDueAmount ? selectedPaid - selectedDueAmount : selectedChange}
                              error={errors.change && touched.change}
                              helperText={
                                errors.change && touched.change
                                  ? errors.change
                                  : ''
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item mt={3}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-filled-label">{t('Print Option')}</InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            fullWidth
                            value={selectedPrintOption}
                            name='customer_id'
                            label="Suppliers"
                            onChange={(e) => { setSelectedPrintOption(e.target.value); }}
                            error={errors.customer_id && touched.customer_id}
                          >
                            <MenuItem value="1" selected>
                              <em>POS Print</em>
                            </MenuItem>
                            <MenuItem value="2">
                              <em>Normal Print</em>
                            </MenuItem>

                          </Select>
                          {touched.country && errors.country ? (
                            <FormHelperText
                              sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                            >
                              {touched.country && errors.country}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      </Grid>

                    </Grid>
                  </Grid>
                  <Grid container spacing={2} mt={3}>

                  </Grid>
                  <DialogActions>
                    <AnimateButton>
                      <Button type="submit" variant="contained">
                        {Object.keys(selectedData).length > 0 ? t("Update") : t("Create")}
                      </Button>
                    </AnimateButton>
                  </DialogActions>
                </Box>
              </CardContent>
            </MainCard>
          </Form>
        )
      }}
    </Formik>

  );
};

NewSale.propTypes = {
  open: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};

export default NewSale;
