import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
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
    supplier_id: Yup.string().required('Supplier  is required'),
    warehouse_id: Yup.string().required('Warehouse  is required'),
});

const PurchaseAdd = () => {
    const showToast = useToast();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const language = localStorage.getItem('i18nextLng');
    const [offers, setOffers] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [warehouses, setWareHouses] = useState([]);
    const [products, setProducts] = useState([]);
    const [rows, setRows] = useState([]);
    const [productName, setProductName] = useState([]);
    const [variation, setVariation] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [unit, setUnit] = useState([]);
    const [sku, setSku] = useState([]);
    // const [lot, setLot] = useState([])
    // const [unitCost, setUnitCost] = useState([])
    const [variations, setVariations] = useState([[]]);
    // const [qty, setQty] = useState([])
    // const [expireDate, setExpireDate] = useState([])
    // const [comment, setComment] = useState([])
    const [productIds, setProductIds] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [selectedWareHouse, setSelectedWareHouse] = useState('');
    const [selectedData, setSelectedData] = useState({});
    const [selectedProductData, setSelectedProductData] = useState([]);
    // const [initialValues, setIntialValues] = useState({})

    const { id } = useParams();
    dispatch(openDrawer(false));

    let navigate = useNavigate();

    const initialValues = {
        date: Object.keys(selectedData).length > 0 ? selectedData.date : moment().format('YYYY-MM-DD'),
        warehouse_id: Object.keys(selectedData).length > 0 ? selectedData.warehouse_id : '',
        supplier_id: Object.keys(selectedData).length > 0 ? selectedData.supplier_id : '',
        lot:
            selectedProductData.length > 0
                ? selectedProductData.map((item) => {
                    return item['lot'];
                })
                : [],
        unit_cost:
            selectedProductData.length > 0
                ? selectedProductData.map((item) => {
                    return item['unit_cost'];
                })
                : [],
        qty:
            selectedProductData.length > 0
                ? selectedProductData.map((item) => {
                    return item['qty'];
                })
                : [],
        expire_date:
            selectedProductData.length > 0
                ? selectedProductData.map((item) => {
                    return item['expire_date'];
                })
                : [],
        comment:
            selectedProductData.length > 0
                ? selectedProductData.map((item) => {
                    return item['comment'];
                })
                : []
    };
    useEffect(() => {
        getOffers();
        getSuppliers();
        getWareshouses();
        getProducts();
    }, []);
    const handleAddRow = () => {
        setRows([...rows, 'new-row']);
    };
    useEffect(() => {
        if (id) {
            getPurchaseInfo(id);
            getPurchaseProductInfo(id);
        }
    }, [id]);

    useEffect(() => {
        if (Object.keys(selectedData).length > 0) {
            setPurchaseInfo();
        }
    }, [selectedData]);

    useEffect(() => {
        if (selectedProductData.length > 0) {
            setPurchaseProductInfo();
        }
    }, [selectedProductData]);

    const getPurchaseInfo = async (id) => {
        const response = await axios.get(`${baseUrl}/getPurchase/${id}`, {
            headers: headers
        });
        setSelectedData(response.data);
    };
    const getPurchaseProductInfo = async (id) => {
        const response = await axios.get(`${baseUrl}/getPurchaseProduct/${id}`, {
            headers: headers
        });
        setSelectedProductData(response.data.data);
    };

    const setPurchaseInfo = () => {
        setSelectedSupplier(selectedData.supplier_id);
        setSelectedWareHouse(selectedData.warehouse_id);
    };
    const setPurchaseProductInfo = async () => {
        setRows([...selectedProductData]);
        for (let i = 0; i < selectedProductData.length; i++) {
            productIds[i] = selectedProductData[i].product_id;
            variation[i] = selectedProductData[i].variation_id;
            const variationData = await getVariation(productIds[i]);
            productName[i] = selectedProductData[i].product_name;
            categoryName[i] = selectedProductData[i].category_name;
            unit[i] = selectedProductData[i].unit_name;
            sku[i] = selectedProductData[i].product_sku;
            variations[i] = variationData;
        }
        setProductIds([...productIds]);
        setVariations([...variations]);
        setVariation([...variation]);
        setSku([...sku]);
        setUnit([...unit]);
        setProductName([...productName]);
        setCategoryName([...categoryName]);
    };
    console.log('initialValues', productIds);

    const handleRemoveRow = (index) => {
        setRows(rows.filter((a, i) => i !== index));
        setProductName(productName.filter((a, i) => i !== index));
        setCategoryName(categoryName.filter((a, i) => i !== index));
        setUnit(unit.filter((a, i) => i !== index));
        setSku(sku.filter((a, i) => i !== index));

        setProductIds(productIds.filter((a, i) => i !== index));
    };

    const handleVariation = (e, index) => {
        variation[index] = e.target.value;
        setVariation([...variation]);
    };

    const getOffers = async () => {
        const response = await axios.get(`${baseUrl}/offerForPurchase`, {
            headers: headers
        });
        setOffers(response.data.data);
    };
    const getSuppliers = async () => {
        const response = await axios.get(`${baseUrl}/supplierForPurchase`, {
            headers: headers
        });
        setSuppliers(response.data.data);
    };
    const getWareshouses = async () => {
        const response = await axios.get(`${baseUrl}/warehouseForPurchase`, {
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
        const productData = products.find((res) => res.id === product);
        productName[index] = productData.product_name;
        categoryName[index] = productData.category_name;
        unit[index] = productData.unit_name;
        sku[index] = productData.product_sku;
        productIds[index] = product;
        setProductIds([...productIds]);
        const variationData = await getVariation(product);
        variations[index] = variationData;
        setVariations([...variations]);
        setSku([...sku]);
        setCategoryName([...categoryName]);
        setUnit([...unit]);
    };
    const getVariation = async (id) => {
        const response = await axios.get(`${baseUrl}/getVariation/${id}`, {
            headers: headers
        });
        return response.data.data;
    };
    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('supplier_id', values.supplier_id);
            formData.append('warehouse_id', values.warehouse_id);
            formData.append('date', values.date);
            formData.append('lot', JSON.stringify(values.lot));
            formData.append('unit_cost', JSON.stringify(values.unit_cost));
            formData.append('product_id', JSON.stringify(productIds));
            formData.append('variation_id', JSON.stringify(variation));
            formData.append('qty', JSON.stringify(values.qty));
            formData.append('expire_date', JSON.stringify(values.expire_date));
            formData.append('comment', JSON.stringify(values.comment));

            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            if (productIds.length > 0) {
                const response =
                    Object.keys(selectedData).length > 0
                        ? await axios.post(`${baseUrl}/purchases/${selectedData.id}`, formData, {
                            headers: headers
                        })
                        : await axios.post(`${baseUrl}/purchases`, formData, {
                            headers: headers
                        });
                if (response.status === 201) {
                    navigate(`/purchase-list`);
                }
                if (response.status === 200) {
                    navigate(`/purchase-list`);
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

     // search
	const handleProductChange = (newValue, index) => {
		if (newValue) {
			handleProduct({ target: { value: newValue.id } }, index);
		} else {
			// Handle clearing the selection if needed
		}
	};


    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
            {({ errors, touched, values, setFieldValue }) => {
                console.log('intial', values.lot);
                return (
                    <Form>
                        <MainCard title={t('Add Your Purchase')} content={false}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            {/* <InputLabel id="demo-simple-select-filled-label">{t('Select Supplier')}</InputLabel> */}
                                            <Autocomplete
                                                options={suppliers}
                                                getOptionLabel={(option) =>
                                                    language === 'bn'
                                                    ? option.supplier_name_bn
                                                    : option.supplier_name
                                                }
                                                value={
                                                    suppliers.find((supplier) => supplier.id === values.supplier_id) ||
                                                    null
                                                }
                                                onChange={(e, value) => setFieldValue('supplier_id', value ? value.id : '')}
                                                renderInput={(params) => (
                                                    <TextField
                                                    {...params}
                                                    label="Suppliers"
                                                    error={errors.supplier_id && touched.supplier_id}
                                                    />
                                                )}
                                            />
                                            {touched.supplier_id && errors.supplier_id ? (
                                                <FormHelperText sx={{ color: '#bf3333', marginLeft: '16px !important' }}>
                                                    {touched.supplier_id && errors.supplier_id}
                                                </FormHelperText>
                                            ) : null}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-filled-label">{t('Select Warehouse')}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                fullWidth
                                                value={values.warehouse_id}
                                                name="warehouse_id"
                                                label="Ware House"
                                                onChange={(e) => setFieldValue('warehouse_id', e.target.value)}
                                                error={errors.warehouse_id && touched.warehouse_id}
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
                                            {touched.warehouse_id && errors.warehouse_id ? (
                                                <FormHelperText sx={{ color: '#bf3333', marginLeft: '16px !important' }}>
                                                    {touched.warehouse_id && errors.warehouse_id}
                                                </FormHelperText>
                                            ) : null}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
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
                                                            <TableCell>Category</TableCell>
                                                            <TableCell>Unit</TableCell>
                                                            <TableCell>Lot</TableCell>
                                                            <TableCell>Unit Cost</TableCell>
                                                            <TableCell>Qty</TableCell>
                                                            <TableCell>Expired</TableCell>
                                                            <TableCell>Comment</TableCell>
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
                                                                    <TableCell key={index}>
                                                                        <FormControl style={{ minWidth: 350 }}>
                                                                            {/* <InputLabel id="demo-simple-select-filled-label">
                                                                                {t('Select Product')}
                                                                            </InputLabel> */}
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
                                                                            <InputLabel id="demo-simple-select-filled-label">
                                                                                {t('Select Variation')}
                                                                            </InputLabel>
                                                                            <Select
                                                                                labelId="demo-simple-select-filled-label"
                                                                                id="demo-simple-select-filled"
                                                                                fullWidth
                                                                                value={variation[index]}
                                                                                required={variations[index].length > 0 ? true : false}
                                                                                label="Variation"
                                                                                onChange={(e) => handleVariation(e, index)}
                                                                            >
                                                                                <MenuItem selected>
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
                                                                        <Field name="categoryName">
                                                                            {({ field }) => (
                                                                                <TextField
                                                                                    {...field}
                                                                                    style={{ width: '100px' }}
                                                                                    value={categoryName[index]}
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
                                                                    <TableCell key={`${index}`}>
                                                                        <Field name={`lot.${index}`}>
                                                                            {({ field }) => (
                                                                                <TextField
                                                                                    {...field}
                                                                                    fullWidth
                                                                                    style={{ width: '100px' }}
                                                                                    value={values.lot[index]}
                                                                                    required
                                                                                    error={errors.lot && touched.lot}
                                                                                    helperText={errors.lot && touched.lot ? errors.lot : ''}
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
                                                                                    style={{ width: '100px' }}
                                                                                    required
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
                                                                                    error={errors.qty && touched.qty}
                                                                                    helperText={errors.qty && touched.qty ? errors.qty : ''}
                                                                                />
                                                                            )}
                                                                        </Field>
                                                                    </TableCell>
                                                                    <TableCell key={index}>
                                                                        <Field name={`expire_date.${index}`}>
                                                                            {({ field }) => (
                                                                                <TextField
                                                                                    {...field}
                                                                                    fullWidth
                                                                                    style={{ width: '100px' }}
                                                                                    required
                                                                                    type="date"
                                                                                    error={errors.expire_date && touched.expire_date}
                                                                                    helperText={
                                                                                        errors.expire_date && touched.expire_date
                                                                                            ? errors.expire_date
                                                                                            : ''
                                                                                    }
                                                                                />
                                                                            )}
                                                                        </Field>
                                                                    </TableCell>
                                                                    <TableCell key={index}>
                                                                        <Field name={`comment.${index}`}>
                                                                            {({ field }) => (
                                                                                <TextField
                                                                                    {...field}
                                                                                    fullWidth
                                                                                    style={{ width: '100px' }}
                                                                                    error={errors.comment && touched.comment}
                                                                                    helperText={
                                                                                        errors.comment && touched.comment
                                                                                            ? errors.comment
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

PurchaseAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default PurchaseAdd;
