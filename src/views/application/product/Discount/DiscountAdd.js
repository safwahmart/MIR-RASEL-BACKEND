import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import {
    Button,
    CardContent,
    DialogActions,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Slide,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';
import { useTranslation } from 'react-i18next';
import MainCard from 'ui-component/cards/MainCard';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
    // name: Yup.string().required('Discount  is required'),
});

const DiscountAdd = () => {
    const showToast = useToast();
    const { t } = useTranslation()
    const language = localStorage.getItem('i18nextLng');
    const [offers, setOffers] = useState([])
    const [products, setProducts] = useState([])
    const [rows, setRows] = useState([])
    const [productName, setProductName] = useState([])
    const [categoryName, setCategoryName] = useState([])
    const [unit, setUnit] = useState([])
    const [mrp, setMrp] = useState([])
    const [discountPercent, setDiscountPercent] = useState([])
    const [discountFlat, setDiscountFlat] = useState([])
    const [productIds, setProductIds] = useState([])
    const [discountEndDate, setDiscountEndDate] = useState([])
    const [areas, setAreas] = useState([])
    const [selectedOffer, setSelectedOffer] = useState("")
    const [selectedProductId, setSelectedProductId] = useState("")
    const [selectedProductName, setSelectedProductName] = useState("")
    const [selectedProductNameBn, setSelectedProductNameBn] = useState("")
    const [selectedCategoryName, setSelectedCategoryName] = useState("")
    const [showInOffer, setShowInOffer] = useState([])
    const [offerName, setOfferName] = useState("")
    const [displayOption, setDisplayOption] = useState(0)
    // const [selectedGender, setSelectedGender] = useState(Object.keys(selectedData).length > 0 ? selectedData.gender : "")
    // const [selectedDistrict, setSelectedDistrict] = useState(Object.keys(selectedData).length > 0 ? selectedData.district : "")

    let navigate = useNavigate();
    const initialValues = {
        // name: Object.keys(selectedData).length > 0 ? selectedData.name : '',
        // name_bn: Object.keys(selectedData).length > 0 ? selectedData.name_bn : '',
        // address: Object.keys(selectedData).length > 0 ? selectedData.address : '',
        // gender: Object.keys(selectedData).length > 0 ? selectedData.gender : '',
        // customer_type_id: Object.keys(selectedData).length > 0 ? selectedData.customer_type_id : '',
        // phone: Object.keys(selectedData).length > 0 ? selectedData.phone : '',
        // email: Object.keys(selectedData).length > 0 ? selectedData.email : '',
        // zip_code: Object.keys(selectedData).length > 0 ? selectedData.zip_code : '',
        // district: Object.keys(selectedData).length > 0 ? selectedData.district : '',
        // area: Object.keys(selectedData).length > 0 ? selectedData.area : '',
        offer_id: '',
        product_id: [],
        discount_percent: [],
        discount_flat: [],
        start_date: '',
        end_date: '',
        offer_status: [],
    };
    useEffect(() => {
        getOffers()
        getProducts();
    }, []);
    const handleAddRow = () => {
        const productData = products.find(res => res.id === selectedProductId);
        const index = rows.length;
        productName[index] = productData.product_name
        categoryName[index] = productData.category_name
        unit[index] = productData.unit_name
        mrp[index] = productData.sale_price
        productIds[index] = selectedProductId
        showInOffer[index] = true;
        setProductIds([
            ...productIds
        ])
        setShowInOffer([
            ...showInOffer
        ])
        setRows([
            ...rows,
            'new-row'
        ]);
        setProductName([
            ...productName
        ]);
        setCategoryName([
            ...categoryName
        ]);
        setUnit([
            ...unit
        ]);
        setMrp([
            ...mrp
        ]);
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
        setCategoryName(
            categoryName.filter((a, i) =>
                i !== index
            ));
        setUnit(
            unit.filter((a, i) =>
                i !== index
            ));
        setMrp(
            mrp.filter((a, i) =>
                i !== index
            ));

        setProductIds(
            productIds.filter((a, i) =>
                i !== index
            ))
        setShowInOffer(
            showInOffer.filter((a, i) =>
                i !== index
            ))
    }

    const changeShowInOffer = (index) => {
        showInOffer[index] = !showInOffer[index]
        setShowInOffer([
            ...showInOffer
        ])
    }

    const getOffers = async () => {
        const response = await axios.get(`${baseUrl}/offers`, {
            headers: headers
        });
        setOffers(response.data.data);
    }
    const getProducts = async () => {
        const response = await axios.get(`${baseUrl}/allProduct`, {
            headers: headers
        });
        setProducts(response.data.data);
    }
    const handleOffer = (e) => {
        setSelectedOffer(e.target.value);
        if (e.target.value > 0) {
            setDisplayOption(1)
            const offer = offers.find(res => res.id === e.target.value);
            setOfferName(offer.name);
        } else {
            setDisplayOption(0);
        }
    }
    const handleProduct = (e) => {
        const product = e.target.value;
        setSelectedProductId(product)
    }

    const disCalculationPer = (e, index) => {
        const price = mrp[index];
        const flatCalculation = price * (e.target.value / 100);
        discountFlat[index] = flatCalculation.toFixed(2);
        discountPercent[index] = e.target.value;
        setDiscountFlat([
            ...discountFlat
        ])
        setDiscountPercent([
            ...discountPercent
        ])
    }
    const disCalculationFlat = (e, index) => {
        const price = mrp[index];
        const PerCalculation = (100 * e.target.value) / price;
        discountPercent[index] = PerCalculation.toFixed(2);
        discountFlat[index] = e.target.value;
        setDiscountFlat([
            ...discountFlat
        ])
        setDiscountPercent([
            ...discountPercent
        ])
    }
    console.log('discountFlat', products);
    const onSubmit = async (values) => {
        // debugger;
        try {
            const formData = new FormData();
            formData.append('offer_id', JSON.stringify(selectedOffer));
            formData.append('product_id', JSON.stringify(productIds));
            formData.append('discount_percent', JSON.stringify(discountPercent) ?? '');
            formData.append('discount_flat', JSON.stringify(discountFlat) ?? '');
            formData.append('start_date', JSON.stringify(values.start_date) ?? '');
            formData.append('end_date', JSON.stringify(values.end_date) ?? '');
            formData.append('offer_status', JSON.stringify(showInOffer) ?? '');
            const response = await axios.post(`${baseUrl}/discounts`, formData, {
                headers: headers
            });
            // debugger;
            if (response.status === 201) {
                navigate(`/dicounts`);
            }
            if (response.status === 200) {
                navigate(`/dicounts`);
            }
            if (response?.errors?.length > 0) {
                showToast(response.errors[0], 'error');
            }
        } catch (error) {
            showToast(error.response.data.errors[0], 'error');
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <Form>
                    <MainCard title={t('Add Your Discount')} content={false}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs></Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-filled-label">{t('Select Offer')}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            fullWidth
                                            value={selectedOffer}
                                            label="Product Type"
                                            onChange={handleOffer}
                                        >
                                            <MenuItem value="" selected>
                                                <em>None</em>
                                            </MenuItem>
                                            {offers.length > 0 && offers.map((option, index) => {
                                                return <MenuItem key={index} value={option.id}>
                                                    {language === 'bn' ? option.name_bn : option.name}
                                                </MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs></Grid>
                            </Grid>
                            <Box display={displayOption > 0 ? "block" : "none"}>
                                <Typography variant="h1" gutterBottom align='center' mt={2}>
                                    {offerName}
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs></Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-filled-label">{t('Select Product')}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                fullWidth
                                                value={selectedProductId}
                                                label="Product Type"
                                                onChange={handleProduct}
                                            >
                                                <MenuItem value="" selected>
                                                    <em>None</em>
                                                </MenuItem>
                                                {products.length > 0 && products.map((option, index) => {
                                                    return <MenuItem key={index} value={option.id}>
                                                        {language === 'bn' ? option.product_name_bn : option.product_name}
                                                    </MenuItem>
                                                })}
                                            </Select>

                                        </FormControl>
                                    </Grid>
                                    <Button variant="contained" padding="normal" style={{ height: '45px', marginTop: '18px' }} onClick={handleAddRow}>Add</Button>

                                    <Grid item xs></Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TableContainer>
                                            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align='center'>SN</TableCell>
                                                        <TableCell component="th"
                                                            scope="row"
                                                            sx={{ cursor: 'pointer' }}>Product</TableCell>
                                                        <TableCell>Category</TableCell>
                                                        <TableCell>Unit</TableCell>
                                                        <TableCell>MRP</TableCell>
                                                        <TableCell>Discount(%)</TableCell>
                                                        <TableCell>Discount(Flat)</TableCell>
                                                        <TableCell>Start Date</TableCell>
                                                        <TableCell>End Date</TableCell>
                                                        <TableCell>Show in Offer</TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows.map((value, index) => {
                                                        return <TableRow>
                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell>
                                                                <Field name="name">
                                                                    {({ field }) => (
                                                                        <TextField
                                                                            {...field}
                                                                            style={{ width: '200px' }}
                                                                            value={productName[index]}
                                                                            disabled
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Field name="name">
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
                                                            <TableCell>
                                                                <Field name="name">
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
                                                            <TableCell>
                                                                <Field name="name">
                                                                    {({ field }) => (
                                                                        <TextField
                                                                            {...field}
                                                                            style={{ width: '100px' }}
                                                                            value={mrp[index]}
                                                                            disabled
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </TableCell>
                                                            <TableCell key={`discount_percent_${index}`}>
                                                                <Field name={`discount_percent.${index}`}>
                                                                    {({ field }) => (
                                                                        <TextField
                                                                            {...field}
                                                                            onChange={(e) => disCalculationPer(e, index)}
                                                                            fullWidth
                                                                            value={discountPercent[index]}
                                                                            error={errors.discount_percent && touched.discount_percent}
                                                                            helperText={
                                                                                errors.discount_percent && touched.discount_percent
                                                                                    ? errors.discount_percent
                                                                                    : ''
                                                                            }
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </TableCell>
                                                            <TableCell key={index}>
                                                                <Field name={`discount_flat.${index}`}>
                                                                    {({ field }) => (
                                                                        <TextField
                                                                            {...field}
                                                                            fullWidth
                                                                            onChange={(e) => disCalculationFlat(e, index)}
                                                                            value={discountFlat[index]}
                                                                            error={errors.discount_flat && touched.discount_flat}
                                                                            helperText={
                                                                                errors.discount_flat && touched.discount_flat
                                                                                    ? errors.discount_flat
                                                                                    : ''
                                                                            }
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </TableCell>
                                                            <TableCell key={index}>
                                                                <Field name={`start_date.${index}`}>
                                                                    {({ field }) => (
                                                                        <TextField
                                                                            {...field}
                                                                            fullWidth
                                                                            type='date'
                                                                            error={errors.start_date && touched.start_date}
                                                                            helperText={
                                                                                errors.start_date && touched.start_date
                                                                                    ? errors.start_date
                                                                                    : ''
                                                                            }
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </TableCell>
                                                            <TableCell key={index}>
                                                                <Field name={`end_date.${index}`}>
                                                                    {({ field }) => (
                                                                        <TextField
                                                                            {...field}
                                                                            fullWidth
                                                                            type='date'
                                                                            error={errors.end_date && touched.end_date}
                                                                            helperText={
                                                                                errors.end_date && touched.end_date
                                                                                    ? errors.end_date
                                                                                    : ''
                                                                            }
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </TableCell>
                                                            <TableCell key={index} align="center">
                                                                <Switch
                                                                    defaultChecked={
                                                                        showInOffer[index] === false ? false :
                                                                            true}
                                                                    onChange={(e) => changeShowInOffer(index)}

                                                                    color="primary" />
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
                                <DialogActions>
                                    <AnimateButton>
                                        <Button type="submit" variant="contained">
                                            {t("Create")}
                                        </Button>
                                    </AnimateButton>
                                </DialogActions>
                            </Box>
                        </CardContent>
                    </MainCard>
                </Form>
            )}
        </Formik>

    );
};

DiscountAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
};

export default DiscountAdd;
