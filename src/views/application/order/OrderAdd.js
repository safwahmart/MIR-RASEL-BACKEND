import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
	Button,
	CardContent,
	DialogActions,
	Fab,
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
	TextField,
	Tooltip
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useState } from 'react';

import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { Box } from '@mui/system';
import { baseUrl } from 'api/apiConfig';
import { headers } from 'api/auth';
import axios from 'axios';
import { useToast } from 'hooks/useToast';
import { round } from 'lodash';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'store';
import { openDrawer } from 'store/slices/menu';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
import CustomerAdd from '../product/Customer/CustomerAdd';
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
	// supplier_id: Yup.string().required('Supplier  is required'),
	// warehouse_id: Yup.string().required('Warehouse  is required'),
});

const OrderAdd = () => {
	const showToast = useToast();
	const { t } = useTranslation();
	const language = localStorage.getItem('i18nextLng');
	const dispatch = useDispatch();
	const [users, setUsers] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [warehouses, setWareHouses] = useState([]);
	const [products, setProducts] = useState([]);
	const [rows, setRows] = useState([]);
	const [productName, setProductName] = useState([]);
	const [variation, setVariation] = useState([]);
	const [stock, setStock] = useState([]);
	const [unitCost, setUnitCost] = useState([]);
	const [qty, setQty] = useState([]);
	const [total, setTotal] = useState([]);
	const [unit, setUnit] = useState([]);
	const [sku, setSku] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [deliveryDiscount, setDeliveryDiscount] = useState({});
	const [CustomerTypes, setCustomerTypes] = useState([]);
	const [timeSlots, setTimeSlots] = useState([]);
	const [areas, setAreas] = useState([]);
	const [variations, setVariations] = useState([[]]);
	const [productIds, setProductIds] = useState([]);
	const [vat, setVat] = useState([]);
	const [totalVat, setTotalVat] = useState([]);
	const [vatType, setVatType] = useState([]);
	const [discount, setDiscount] = useState([]);
	const [discountFlat, setDiscountFlat] = useState([]);
	const [totalDiscount, setTotalDiscount] = useState([]);
	const [selectedUser, setSelectedUser] = useState('');
	const [selectedWareHouse, setSelectedWareHouse] = useState('');
	const [selectedtimeSlot_id, setSelectedtimeSlot_id] = useState('');
	const [selectedDistrict, setSelectedDistrict] = useState('');
	const [selectedArea, setSelectedArea] = useState('');
	const [selectedCustomerId, setSelectedCustomerId] = useState('');
	const [selectedCustomerTypeId, setSelectedCustomerTypeId] = useState('');
	const [selectedData, setSelectedData] = useState({});
	const [customerSelectedData, setCustomerSelectedData] = useState({});
	const [selectedProductData, setSelectedProductData] = useState([]);
	const [selectedSubTotal, setSelectedSubTotal] = useState(0.0);
	const [selectedVat, setSelectedVat] = useState(0.0);
	const [selectedDiscount, setSelectedDiscount] = useState(0.0);
	const [selectedSpecialDiscount, setSelectedSpecialDiscount] = useState(0.0);
	const [selectedDiscountPercent, setSelectedDiscountPercent] = useState(0.0);
	const [selectedSpecialDiscountPercent, setSelectedSpecialDiscountPercent] = useState(0.0);
	const [selectedDueAmount, setSelectedDueAmount] = useState(0);
	const [selectedRounding, setSelectedRounding] = useState(0.0);
	const [selectedCodCharge, setSelectedCodCharge] = useState(0);
	const [selectedShippingCost, setSelectedShippingCost] = useState(0);
	const [selectedPayable, setSelectedPayable] = useState(0);
	const [fetch, setFetch] = React.useState(false);


	dispatch(openDrawer(false));

	const [open, setOpen] = React.useState(false);

	const handleClickOpenDialog = () => {
		setOpen(true);
	};
	const handleCloseDialog = () => {
		setOpen(false);
		setSelectedData({});
		getCustomers();
	};

	const handelFatchCustomer = () => {
		setFetch(true);
	}

	const { id } = useParams();

	let navigate = useNavigate();

	const initialValues = {
		date: Object.keys(selectedData).length > 0 ? selectedData.date : moment().format('YYYY-MM-DD'),
		customer_id: selectedCustomerId,
		warehouse_id: Object.keys(selectedData).length > 0 ? selectedData.warehouse_id : selectedWareHouse,
		timeSlot_id: Object.keys(selectedData).length > 0 ? selectedData.time_slot_id : selectedtimeSlot_id,
		user_id: selectedUser,
		unit_cost:
			selectedProductData.length > 0
				? selectedProductData.map((item) => {
					return item['unit_cost'];
				})
				: '',
		qty:
			selectedProductData.length > 0
				? selectedProductData.map((item) => {
					return item['qty'];
				})
				: '',
		expire_date:
			selectedProductData.length > 0
				? selectedProductData.map((item) => {
					return item['expire_date'];
				})
				: '',
		comment:
			selectedProductData.length > 0
				? selectedProductData.map((item) => {
					return item['comment'];
				})
				: '',
		customer_type_id:
			Object.keys(selectedData).length > 0
				? selectedData.customer_type_id
				: selectedCustomerId
					? customerSelectedData.customer_type_id
					: '',
		customer_name:
			Object.keys(selectedData).length > 0 ? selectedData.customer_name : selectedCustomerId ? customerSelectedData.name : '',
		customer_phone: Object.keys(selectedData).length > 0 ? selectedData.phone : selectedCustomerId ? customerSelectedData.phone : '',
		address: Object.keys(selectedData).length > 0 ? selectedData.address : selectedCustomerId ? customerSelectedData.address : '',
		district_id: selectedDistrict,
		area_id: selectedArea,
		zip_code: Object.keys(selectedData).length > 0 ? selectedData.zip_code : selectedCustomerId ? customerSelectedData.zip_code : '',
		sub_total: selectedSubTotal,
		vat: selectedVat,
		shipping_cost: selectedShippingCost,
		cod_charge: selectedCodCharge,
		rounding: selectedRounding,
		payable: selectedPayable,
		delivery_date: moment().format('YYYY-MM-DD'),
		order_date: moment().format('YYYY-MM-DD'),
		discount: selectedDiscount,
		special_discount: selectedSpecialDiscount,
		total: total,
		order_note: Object.keys(selectedData).length > 0 ? selectedData.order_note : ''
	};
	console.log('customerData', customerSelectedData);
	useEffect(() => {
		getUsers();
		getCustomers();
		getWareshouses();
		getProducts();
		getDistricts();
		getTimeSlots();
		getCustomerTypes();
		getDeliveryDiscount();
	}, []);

	const setCustomerData = (id) => {
		if (id !== '') {
			const customerData = customers.find((res) => res.id === id);
			setCustomerSelectedData(customerData);
			setSelectedDistrict(customerData.district);
			getArea(customerData.district);
			setSelectedArea(customerData.area);
			setSelectedCustomerTypeId(customerData.customer_type_id);
		} else {
			setCustomerSelectedData({});
			setSelectedDistrict('');
			getArea('');
			setSelectedArea('');
			setSelectedCustomerTypeId('');
		}
	};

	const handleAddRow = () => {
		setRows([...rows, 'new-row']);
	};
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
		if (selectedDistrict) {
			// setShippingCost(selectedDistrict);
			const district = districts.find(res => res.id === eval(selectedDistrict))
			setSelectedShippingCost(district.shipping_cost);
			if (selectedDistrict === "3") {
				debugger;
				if (deliveryDiscount.cod_inside_dhaka === 1) {
					setSelectedCodCharge(deliveryDiscount.inside_cod_dhaka)
				}
			} else {
				if (deliveryDiscount.cod_outside_dhaka === 1) {
					setSelectedCodCharge(deliveryDiscount.outside_cod_dhaka)
				}
			}
		}
	}, [selectedDistrict]);



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
	};
	const getDeliveryDiscount = async () => {
		const response = await axios.get(`${baseUrl}/deliveryDiscounts`, {
			headers: headers
		});
		setDeliveryDiscount(response.data.data[0]);
	};
	const getTimeSlots = async () => {
		const response = await axios.get(`${baseUrl}/timeSlotes`, {
			headers: headers
		});
		setTimeSlots(response.data.data);
	};
	const getCustomerTypes = async () => {
		const response = await axios.get(`${baseUrl}/customerTypes`, {
			headers: headers
		});
		setCustomerTypes(response.data.data);
	};

	const getArea = async (id) => {
		if (id !== '') {
			const response = await axios.get(`${baseUrl}/getArea/${id}`, {
				headers: headers
			});
			setAreas(response.data.data);
		}
	};

	const getOrderInfo = async (id) => {
		const response = await axios.get(`${baseUrl}/getOrder/${id}`, {
			headers: headers
		});
		setSelectedData(response.data);
	};
	const getOrderProductInfo = async (id) => {
		const response = await axios.get(`${baseUrl}/getOrderProduct/${id}`, {
			headers: headers
		});
		setSelectedProductData(response.data.data);
	};

	const setOrderInfo = () => {
		setSelectedWareHouse(selectedData.warehouse_id);
		setSelectedDistrict(selectedData.district);
		getArea(selectedData.district);
		setSelectedArea(selectedData.area);
		setSelectedtimeSlot_id(selectedData.time_slot_id);
		setSelectedCustomerId(selectedData.customer_id);
		setSelectedUser(selectedData.sale_by);
	};
	const setOrderProductInfo = async () => {
		setRows([...selectedProductData]);
		let sum = 0;
		for (let i = 0; i < selectedProductData.length; i++) {
			productIds[i] = selectedProductData[i].product_id;
			variation[i] = selectedProductData[i].variation_id;
			const variationData = await getVariation(productIds[i]);
			productName[i] = selectedProductData[i].product_name;
			stock[i] = selectedProductData[i].stock_in - selectedProductData[i].stock_out;
			unit[i] = selectedProductData[i].unit_name;
			sku[i] = selectedProductData[i].product_sku;
			unitCost[i] = selectedProductData[i].unit_price;
			qty[i] = selectedProductData[i].qty;
			total[i] = selectedProductData[i].total_price;
			variations[i] = variationData;
			sum += total[i];
		}
		setProductIds([...productIds]);
		setVariations([...variations]);
		setVariation([...variation]);
		setSku([...sku]);
		setUnit([...unit]);
		setProductName([...productName]);
		setStock([...stock]);
		setUnitCost([...unitCost]);
		setQty([...qty]);
		setTotal([...total]);
		setSelectedSubTotal(sum);
		setSelectedPayable(sum + parseInt(selectedShippingCost) + parseInt(selectedCodCharge));
	};

	const handleRemoveRow = (index) => {
		setRows(rows.filter((a, i) => i !== index));
		setProductName(productName.filter((a, i) => i !== index));
		setStock(stock.filter((a, i) => i !== index));
		setUnit(unit.filter((a, i) => i !== index));
		setSku(sku.filter((a, i) => i !== index));

		setProductIds(productIds.filter((a, i) => i !== index));
	};

	const handleVariation = (e, index) => {
		variation[index] = e.target.value;
		setVariation([...variation]);
	};

	const getUsers = async () => {
		const response = await axios.get(`${baseUrl}/users`, {
			headers: headers
		});
		setUsers(response.data.data);
	};
	const getCustomers = async () => {
		const response = await axios.get(`${baseUrl}/getCustomers`, {
			headers: headers
		});
		setCustomers(response.data.data);
	};
	const getWareshouses = async () => {
		const response = await axios.get(`${baseUrl}/wareHouses`, {
			headers: headers
		});
		setWareHouses(response.data.data);
	};
	const getProducts = async () => {
		const response = await axios.get(`${baseUrl}/allProduct`, {
			headers: headers
		});
		setProducts(response.data.data);
	};
	const handleProduct = async (e, index) => {
		const product = e.target.value;
		discount[index] = 0;
		discountFlat[index] = 0;
		vat[index] = 0;
		vatType[index] = 0;
		setVat([...vat]);
		setVatType([...vatType]);
		setDiscount([...discount]);
		setDiscountFlat([...discountFlat]);
		const productData = products.find((res) => res.id === product);
		productName[index] = productData.product_name;
		stock[index] = productData.stock_in - productData.stock_out;
		unit[index] = productData.unit_name;
		sku[index] = productData.product_sku;
		unitCost[index] = productData.sale_price;
		discount[index] = productData.discount_percent;
		discountFlat[index] = productData.discount_flat;
		vat[index] = productData.vat;
		vatType[index] = productData.vat_type;
		qty[index] = 0;
		total[index] = 0;
		productIds[index] = product;
		setProductIds([...productIds]);
		const variationData = await getVariation(product);
		variations[index] = variationData;
		setVariations([...variations]);
		setSku([...sku]);
		setStock([...stock]);
		setUnit([...unit]);
		setUnitCost([...unitCost]);
		setQty([...qty]);
		setTotal([...total]);
		setDiscount([...discount]);
		setDiscountFlat([...discountFlat]);
		setVat([...vat]);
		setVatType([...vatType]);
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
		setTotalDiscount([...totalDiscount]);
		setTotalVat([...totalVat]);
	};
	const quantityCalculation = (value, index) => {
		const unitPrice = unitCost[index];
		const totalPrice = value * unitPrice;
		if (value <= stock[index]) {
			total[index] = totalPrice;
			qty[index] = value;
			setTotal([...total]);
			setQty([...qty]);
			let sum = 0;
			let sumDis = 0;
			let sumVat = 0;
			total.map((res) => (sum += res));
			const afterDiscount = Math.round((unitCost[index] * qty[index] * discount[index]) / 100);
			discountFlat[index] = afterDiscount;
			setDiscount([...discount]);
			discountFlat.map((res) => (sumDis += res));
			totalVat.map((res) => (sumVat += res));
			setSelectedVat(sumVat);
			setSelectedDiscount(sumDis);
			const percent = (sumDis * 100) / sum;
			setSelectedDiscountPercent(percent);
			setSelectedSubTotal(sum.toFixed(2));
			console.log('sum + sumVat - sumDis');
			const totalCalculation = (sum + sumVat + parseInt(selectedShippingCost) + parseInt(selectedCodCharge)) - sumDis;
			setSelectedPayable(totalCalculation);
			setSelectedDueAmount(totalCalculation);
		} else {
			total[index] = 0;
			qty[index] = 0;
			setTotal([...total]);
			setQty([...qty]);
			showToast('You cannot select more than stock', 'error');
		}
		// let sum = 0;
		// total.map(res => sum += res);
		// setSelectedSubTotal(sum.toFixed(2));
		// setSelectedPayable(sum)
		// console.log('sum total', sum)
	};
	const getVariation = async (id) => {
		const response = await axios.get(`${baseUrl}/getVariation/${id}`, {
			headers: headers
		});
		return response.data.data;
	};
	const onSubmit = async (values) => {
		// debugger;
		try {
			const formData = new FormData();
			if (selectedCustomerId) {
				formData.append('customer_id', selectedCustomerId);
			} else {
				formData.append('customer_type_id', selectedCustomerTypeId);
				formData.append('name', values.customer_name);
				formData.append('phone', values.customer_phone);
				formData.append('address', values.address);
				formData.append('district', values.district_id);
				formData.append('area', values.area_id);
				formData.append('zip_code', values.zip_code);
			}
			formData.append('warehouse_id', selectedWareHouse);
			formData.append('date', values.date);
			formData.append('sale_by', selectedUser);
			formData.append('order_date', values.order_date);
			formData.append('delivery_date', values.delivery_date);
			formData.append('time_slot_id', selectedtimeSlot_id);
			formData.append('discount_amount', selectedDiscount);
			formData.append('discount_per', selectedDiscountPercent);
			formData.append('special_discount', selectedSpecialDiscount);
			formData.append('special_dis_per', selectedSpecialDiscountPercent);
			formData.append('order_note', values.order_note);
			formData.append('rounding', selectedRounding);
			formData.append('cod_charge', selectedCodCharge);
			formData.append('shipping_cost', selectedShippingCost);
			formData.append('sub_total', selectedSubTotal);
			formData.append('vat', selectedVat);
			formData.append('payable', selectedPayable);
			formData.append('unit_price', JSON.stringify(unitCost));
			formData.append('product_id', JSON.stringify(productIds));
			formData.append('variation_id', JSON.stringify(variation));
			formData.append('qty', JSON.stringify(qty));
			formData.append('total_price', JSON.stringify(values.total));

			if (Object.keys(selectedData).length > 0) {
				formData.append('_method', 'PUT');
			}
			if (productIds.length > 0) {
				const response =
					Object.keys(selectedData).length > 0
						? await axios.post(`${baseUrl}/orders/${selectedData.id}`, formData, {
							headers: headers
						})
						: await axios.post(`${baseUrl}/orders`, formData, {
							headers: headers
						});
				if (response.status === 201) {
					navigate(`/order-list`);
				}
				if (response.status === 200) {
					navigate(`/order-list`);
				}
				if (response?.errors?.length > 0) {
					showToast(response.errors[0], 'error');
				}
			} else {
				showToast('Please select Product', 'error')
			}
		} catch (error) {
			showToast(error.response.data.errors[0], 'error');
		}
	};


	// search
	const handleProductChange = (newValue, index) => {
		if (newValue) {
			handleProduct({ target: { value: newValue.id } }, index);
		} else {
			// Handle clearing the selection if needed
		}
	};

	const discountPerCalculation = (value) => {
		setSelectedDiscountPercent(value)
		const total = parseInt(selectedSubTotal) + selectedVat + parseInt(selectedShippingCost) + parseInt(selectedCodCharge);
		const dis = (total * value) / 100;
		setSelectedDiscount(dis);
		const payable = total - dis;
		const roundData = round(total - dis)
		const difference = roundData > payable ? roundData - payable : payable - roundData;
		setSelectedRounding(difference);
		setSelectedPayable(roundData);
	}
	const specialDiscountPerCalculation = (value) => {
		setSelectedSpecialDiscountPercent(value)
		const total = (parseInt(selectedSubTotal) + selectedVat + parseInt(selectedShippingCost) + parseInt(selectedCodCharge)) - selectedDiscount;
		const dis = (total * value) / 100;
		setSelectedSpecialDiscount(dis);
		const payable = total - dis;
		const roundData = round(total - dis)
		const difference = roundData > payable ? roundData - payable : payable - roundData;
		setSelectedRounding(difference);
		setSelectedPayable(roundData);
	}
	const discountCalculation = (value) => {
		setSelectedDiscount(value)
		const total = parseInt(selectedSubTotal) + selectedVat + parseInt(selectedShippingCost) + parseInt(selectedCodCharge);
		const dis = 100 * value / total;
		setSelectedDiscountPercent(dis);
		const payable = total - value;
		const roundData = round(total - value)
		const difference = roundData > payable ? roundData - payable : payable - roundData;
		setSelectedRounding(difference);
		setSelectedPayable(roundData);
	}
	const specialDiscountCalculation = (value) => {
		setSelectedSpecialDiscount(value)
		const total = (parseInt(selectedSubTotal) + selectedVat + parseInt(selectedShippingCost) + parseInt(selectedCodCharge)) - selectedDiscount;
		const dis = 100 * value / total;
		setSelectedSpecialDiscountPercent(dis);
		const payable = total - value;
		const roundData = round(total - value)
		const difference = roundData > payable ? roundData - payable : payable - roundData;
		setSelectedRounding(difference);
		setSelectedPayable(roundData);
	}

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
			{({ errors, touched, values, setFieldValue }) => {
				return (
					<Form>
						<MainCard title={t('Add Your Order')} content={false}>
							<CardContent>
								<Grid container spacing={2}>
									{/* <Grid item xs={1} sm={1} sx={{ textAlign: 'right' }}> */}
									{/* product add & dialog */}
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
									{/* </Grid> */}
									<Grid item xs={3}>
										<Autocomplete
											fullWidth
											options={customers} // Assuming customers is an array of options
											autoHighlight
											getOptionLabel={(option) => `${language === 'bn' ? option.name_bn : option.name} - ${option.phone}`}
											onChange={(event, value) => {
												if (value) {
													setSelectedCustomerId(value.id);
													setCustomerData(value.id);
												}
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													label={t('Select Customer')}
													InputLabelProps={{
														shrink: true,
													}}
													error={errors.customer_id && touched.customer_id}
													helperText={touched.customer_id && errors.customer_id}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={3}>
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-filled-label">{t('Select Warehouse')}</InputLabel>
											<Select
												labelId="demo-simple-select-filled-label"
												id="demo-simple-select-filled"
												fullWidth
												value={selectedWareHouse}
												name="warehouse_id"
												label="Ware House"
												onChange={(e) => setSelectedWareHouse(e.target.value)}
												error={errors.warehouse_id && touched.warehouse_id}
												required
											>
												<MenuItem value="" selected>
													<em>None</em>
												</MenuItem>
												{warehouses.length > 0 &&
													warehouses.map((option, index) => {
														return (
															<MenuItem key={index} value={option.id}>
																{language === 'bn' ? option.name_bn : option.name}
															</MenuItem>
														);
													})}
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={2}>
										<Field name={`date`}>
											{({ field }) => (
												<TextField
													{...field}
													fullWidth
													label={t('Date') + '*'}
													type="date"
													value={values?.date}
													error={errors.date && touched.date}
													helperText={errors.date && touched.date ? errors.date : ''}
												/>
											)}
										</Field>
									</Grid>
									<Grid item xs={3}>
										<FormControl fullWidth>
											{/* <InputLabel id="demo-simple-select-filled-label">{t('Sale By')}</InputLabel> */}
											<Autocomplete
												options={users}
												getOptionLabel={(option) =>
													language === 'bn' ? option.name : option.name
												}
												value={users.find((user) => user.id === selectedUser) || null}
												onChange={(e, value) => setSelectedUser(value ? value.id : '')}
												renderInput={(params) => (
													<TextField
													{...params}
													label="UsSale By"
													error={errors.user_id && touched.user_id}
													fullWidth
													/>
												)}
												/>
											{touched.country && errors.country ? (
												<FormHelperText sx={{ color: '#bf3333', marginLeft: '16px !important' }}>
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
												<InputLabel id="demo-simple-select-filled-label">{t('Scan your Barcode')}</InputLabel>

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
										<Button variant="contained" padding="normal" style={{ height: '45px', marginTop: '18px' }}>
											Search
										</Button>

										<Grid item xs></Grid>
									</Grid>
									<Grid container spacing={2}>
										<Grid item xs={12}>
											<TableContainer>
												<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
													<TableHead>
														<TableRow>
															<TableCell align="center">Product</TableCell>
															<TableCell component="th" scope="row" sx={{ cursor: 'pointer' }}>
																Variation
															</TableCell>
															<TableCell>SKU</TableCell>
															<TableCell>Stock</TableCell>
															<TableCell>Unit</TableCell>
															<TableCell>Unit Price</TableCell>
															<TableCell>Qty</TableCell>
															<TableCell>Total</TableCell>
															<TableCell>
																<Button variant="contained" padding="normal" onClick={handleAddRow}>
																	<AddCircleRoundedIcon />
																</Button>
															</TableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{rows.map((value, index) => {
															console.log('productIds', productIds[index]);
															return (
																<TableRow>
																	<TableCell key={index} style={{ minWidth: 350 }}>
																		<Autocomplete
																			options={products}
																			getOptionLabel={(option) => language === 'bn' ? option.product_name_bn : option.product_name}
																			value={products.find((product) => product.id === productIds[index]) || null}
																			onChange={(e, newValue) => handleProductChange(newValue, index)}
																			renderInput={(params) => <TextField {...params} label={t('Select Product')} required fullWidth />}
																		/>
																	</TableCell>
																	<TableCell key={index} >
																		<FormControl style={{ minWidth: 140 }}>
																			<InputLabel id="demo-simple-select-filled-label">
																				{t('Select Variation')}
																			</InputLabel>
																			<Select
																				labelId="demo-simple-select-filled-label"
																				id="demo-simple-select-filled"
																				fullWidth
																				value={variation[index]}
																				// required
																				label="Variation"
																				onChange={(e) => handleVariation(e, index)}
																			>
																				<MenuItem value="" selected>
																					<em>None</em>
																				</MenuItem>
																				{variations[index]?.length > 0 &&
																					variations[index].map((option, index) => {
																						return (
																							<MenuItem key={index} value={option.id}>
																								{language === 'bn'
																									? option.name_bn
																									: option.name}
																							</MenuItem>
																						);
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
																					type="number"
																					required
																					style={{ width: '100px' }}
																					value={unitCost[index]}
																					onChange={(e) => {
																						unitCost[index] = e.target.value;
																						setUnitCost([...unitCost]);
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
																					type="number"
																					style={{ width: '100px' }}
																					required
																					value={qty[index]}
																					onChange={(e) =>
																						quantityCalculation(e.target.value, index)
																					}
																					error={errors.qty && touched.qty}
																					helperText={errors.qty && touched.qty ? errors.qty : ''}
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
																						readOnly: true
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
																		<Button
																			variant="outlined"
																			color="error"
																			onClick={() => handleRemoveRow(index)}
																		>
																			<RemoveCircleOutlinedIcon />
																		</Button>
																	</TableCell>
																</TableRow>
															);
														})}
													</TableBody>
												</Table>
											</TableContainer>
										</Grid>
									</Grid>
									<Grid container spacing={2} mt={3}>
										<Grid item xs={4}>
											<Grid item mt={3}>
												<FormControl fullWidth>
													<InputLabel id="demo-simple-select-filled-label">{t('Customer Type Id')}</InputLabel>
													<Select
														labelId="demo-simple-select-filled-label"
														id="demo-simple-select-filled"
														fullWidth
														value={selectedCustomerTypeId}
														disabled={selectedCustomerId ? true : false}
														label="District"
														onChange={(e) => {
															setSelectedCustomerTypeId(e.target.value);
														}}
														error={errors.customer_type_id && touched.customer_type_id}
														required
													>
														<MenuItem value="" selected>
															<em>None</em>
														</MenuItem>
														{CustomerTypes.length > 0 &&
															CustomerTypes.map((option, index) => {
																return (
																	<MenuItem key={index} value={option.id}>
																		{language === 'bn' ? option.name_bn : option.name}
																	</MenuItem>
																);
															})}
													</Select>
												</FormControl>
											</Grid>
											<Grid item mt={3}>
												<Field name={`customer_name`}>
													{({ field }) => (
														<TextField
															{...field}
															fullWidth
															type="text"
															disabled={selectedCustomerId ? true : false}
															value={values.customer_name}
															onChange={(e) => setFieldValue('customer_name', e.target.value)}
															label="Customer Name"
															defaultValue={'Customer Name'}
															error={errors.customer_name && touched.customer_name}
															helperText={
																errors.customer_name && touched.customer_name ? errors.customer_name : ''
															}
														/>
													)}
												</Field>
											</Grid>
											<Grid item mt={3}>
												<Field name={`customer_phone`}>
													{({ field }) => (
														<TextField
															{...field}
															fullWidth
															type="text"
															disabled={selectedCustomerId ? true : false}
															value={values.customer_phone}
															label="Customer Phone"
															defaultValue="Customer Phone"
															onChange={(e) => setFieldValue('customer_phone', e.target.value)}
															error={errors.customer_phone && touched.customer_phone}
															helperText={
																errors.customer_phone && touched.customer_phone ? errors.customer_phone : ''
															}
														/>
													)}
												</Field>
											</Grid>
											<Grid item mt={3}>
												<Field name={`address`}>
													{({ field }) => (
														<TextField
															{...field}
															fullWidth
															type="text"
															disabled={selectedCustomerId ? true : false}
															value={values.address}
															onChange={(e) => setFieldValue('address', e.target.value)}
															label="Delivery Address"
															defaultValue="Delivery Address"
															error={errors.address && touched.address}
															helperText={errors.address && touched.address ? errors.address : ''}
														/>
													)}
												</Field>
											</Grid>
											<Grid item mt={3}>
												<FormControl fullWidth>
													<InputLabel id="demo-simple-select-filled-label">{t('District')}</InputLabel>
													<Select
														labelId="demo-simple-select-filled-label"
														id="demo-simple-select-filled"
														fullWidth
														value={selectedDistrict}
														disabled={selectedCustomerId ? true : false}
														label="District"
														onChange={(e) => {
															setSelectedDistrict(e.target.value);
															getArea(e.target.value);
														}}
													>
														<MenuItem value="" selected>
															<em>None</em>
														</MenuItem>
														{districts.length > 0 &&
															districts.map((option, index) => {
																return (
																	<MenuItem key={index} value={option.id}>
																		{language === 'bn' ? option.name_bn : option.name}
																	</MenuItem>
																);
															})}
													</Select>
												</FormControl>
											</Grid>
											<Grid item mt={3}>
												<FormControl fullWidth>
													<InputLabel id="demo-simple-select-filled-label">{t('Area')}</InputLabel>
													<Select
														labelId="demo-simple-select-filled-label"
														id="demo-simple-select-filled"
														fullWidth
														disabled={selectedCustomerId ? true : false}
														value={selectedArea}
														label="Area"
														onChange={(e) => setSelectedArea(e.target.value)}
													>
														<MenuItem value="" selected>
															<em>None</em>
														</MenuItem>
														{areas.length > 0 &&
															areas.map((option, index) => {
																return (
																	<MenuItem key={index} value={option.id}>
																		{language === 'bn' ? option.name_bn : option.name}
																	</MenuItem>
																);
															})}
													</Select>
												</FormControl>
											</Grid>
											<Grid item mt={3}>
												<Field name={`zip_code`}>
													{({ field }) => (
														<TextField
															{...field}
															fullWidth
															type="text"
															disabled={selectedCustomerId ? true : false}
															value={values.zip_code}
															label="Zip Code"
															defaultValue="Zip Code"
															error={errors.zip_code && touched.zip_code}
															helperText={errors.zip_code && touched.zip_code ? errors.zip_code : ''}
														/>
													)}
												</Field>
											</Grid>
											<Grid item mt={3}>
												<Field name={`order_date`}>
													{({ field }) => (
														<TextField
															{...field}
															fullWidth
															type="datetime-local" // Change type to include date and time
															value={values.order_date}
															onChange={(e) => setFieldValue('order_date', e.target.value)}
															label="Order Date"
															defaultValue={moment().format('YYYY-MM-DDTHH:mm')} // Set default value including date and time
															error={errors.order_date && touched.order_date}
															helperText={
																errors.order_date && touched.order_date ? errors.order_date : ''
															}
														/>
													)}
												</Field>
											</Grid>

											<Grid item mt={3}>
												<Field name={`delivery_date`}>
													{({ field }) => (
														<TextField
															{...field}
															fullWidth
															type="datetime-local" // Change type to include date and time
															value={values.delivery_date}
															onChange={(e) => setFieldValue('delivery_date', e.target.value)}
															label="Delivery Date"
															defaultValue={moment().format('YYYY-MM-DDTHH:mm')} // Set default value including date and time
															error={errors.delivery_date && touched.delivery_date}
															helperText={
																errors.delivery_date && touched.delivery_date ? errors.delivery_date : ''
															}
														/>
													)}
												</Field>
											</Grid>

											<Grid item mt={3}>
												<FormControl fullWidth>
													<InputLabel id="demo-simple-select-filled-label">{t('TimeSlot')}</InputLabel>
													<Select
														labelId="demo-simple-select-filled-label"
														id="demo-simple-select-filled"
														fullWidth
														value={selectedtimeSlot_id}
														label="Area"
														onChange={(e) => setSelectedtimeSlot_id(e.target.value)}
													>
														<MenuItem value="" selected>
															<em>None</em>
														</MenuItem>
														{timeSlots.length > 0 &&
															timeSlots.map((option, index) => {
																return (
																	<MenuItem key={index} value={option.id}>
																		{language === 'bn'
																			? option.starting_time
																			: `${option.starting_time} - ${option.ending_time}`}
																	</MenuItem>
																);
															})}
													</Select>
												</FormControl>
											</Grid>
										</Grid>
										<Grid item xs={4}>
											<Grid item mt={3}>
												<Field name={`order_note`}>
													{({ field }) => (
														<TextField
															{...field}
															fullWidth
															type="text"
															defaultValue={'Order Note'}
															rows={4}
															multiline
															label="Order Note"
															error={errors.order_note && touched.order_note}
															helperText={errors.order_note && touched.order_note ? errors.order_note : ''}
														/>
													)}
												</Field>
											</Grid>
										</Grid>

										<Grid item xs={4}>
											<Grid item mt={3} justify="flex-end">
												<Field name={`sub_total`}>
													{({ field }) => (
														<TextField
															{...field}
															fullWidth
															type="text"
															label="Sub Total"
															defaultValue="Sub Total"
															style={{ textAlign: 'right' }}
															disabled
															error={errors.sub_total && touched.sub_total}
															helperText={errors.sub_total && touched.sub_total ? errors.sub_total : ''}
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
															type="text"
															label="Vat"
															defaultValue="Vat"
															disabled
															error={errors.vat && touched.vat}
															helperText={errors.vat && touched.vat ? errors.vat : ''}
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
																	type="text"
																	label="Discount %"
																	defaultValue="Discount"
																	value={selectedDiscountPercent}
																	onChange={(e) => discountPerCalculation(e.target.value)}
																	error={errors.discount && touched.discount}
																	helperText={errors.discount && touched.discount ? errors.discount : ''}
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
																	type="text"
																	label="Discount"
																	defaultValue="Discount"
																	value={selectedDiscount}
																	onChange={(e) => discountCalculation(e.target.value)}
																	helperText={errors.discount && touched.discount ? errors.discount : ''}
																/>
															)}
														</Field>
													</Grid>
												</Grid>
											</Grid>
											<Grid item mt={3}>
												<Grid container spacing={2}>
													<Grid item xs={6}>
														<Field name={`special_discount`}>
															{({ field }) => (
																<TextField
																	{...field}
																	fullWidth
																	type="text"
																	label="Special Discount %"
																	defaultValue="Special Discount"
																	value={selectedSpecialDiscountPercent}
																	onChange={(e) => specialDiscountPerCalculation(e.target.value)}
																	error={errors.special_discount && touched.special_discount}
																	helperText={
																		errors.special_discount && touched.special_discount
																			? errors.special_discount
																			: ''
																	}
																/>
															)}
														</Field>
													</Grid>
													<Grid item xs={6}>
														<Field name={`special_discount`}>
															{({ field }) => (
																<TextField
																	{...field}
																	fullWidth
																	type="text"
																	label="Special Discount"
																	defaultValue="Special Discount"
																	value={selectedSpecialDiscount}
																	onChange={(e) => specialDiscountCalculation(e.target.value)}
																	error={errors.special_discount && touched.special_discount}
																	helperText={
																		errors.special_discount && touched.special_discount
																			? errors.special_discount
																			: ''
																	}
																/>
															)}
														</Field>
													</Grid>
												</Grid>
											</Grid>
											<Grid item mt={3}>
												<Field name={`shipping_cost`}>
													{({ field }) => (
														<TextField
															{...field}
															fullWidth
															type="text"
															label="Shipping Cost"
															disabled
															defaultValue="Shipping Cost"
															error={errors.shipping_cost && touched.shipping_cost}
															helperText={
																errors.shipping_cost && touched.shipping_cost ? errors.shipping_cost : ''
															}
														/>
													)}
												</Field>
											</Grid>
											<Grid item mt={3}>
												<Field name={`cod_charge`}>
													{({ field }) => (
														<TextField
															{...field}
															fullWidth
															type="text"
															disabled
															label="COD charge"
															defaultValue="COD charge"
															error={errors.cod_charge && touched.cod_charge}
															helperText={errors.cod_charge && touched.cod_charge ? errors.cod_charge : ''}
														/>
													)}
												</Field>
											</Grid>
											<Grid item mt={3}>
												<Field name={`rounding`}>
													{({ field }) => (
														<TextField
															{...field}
															fullWidth
															type="text"
															disabled
															label="Rounding"
															defaultValue="Rounding"
															error={errors.rounding && touched.rounding}
															helperText={errors.rounding && touched.rounding ? errors.rounding : ''}
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
															type="text"
															disabled
															label="Payable"
															defaultValue="Payable"
															error={errors.payable && touched.payable}
															helperText={errors.payable && touched.payable ? errors.payable : ''}
														/>
													)}
												</Field>
											</Grid>
										</Grid>
									</Grid>
									<Grid container spacing={2} mt={3}></Grid>
									<DialogActions>
										<AnimateButton>
											<Button type="submit" variant="contained">
												{Object.keys(selectedData).length > 0 ? t('Update') : t('Create')}
											</Button>
										</AnimateButton>
									</DialogActions>
								</Box>
							</CardContent>
						</MainCard>
					</Form>
				);
			}}
		</Formik>
	);
};

OrderAdd.propTypes = {
	open: PropTypes.bool,
	handleCloseDialog: PropTypes.func
};

export default OrderAdd;
