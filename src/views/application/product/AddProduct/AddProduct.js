import { CardContent, Grid, Tab } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';

import './addProduct.css';
import { Box } from '@mui/system';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { FaRegCircleCheck } from 'react-icons/fa6';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useToast } from 'hooks/useToast';
import Basic from './Basic';
import Price from './Price';
import Description from './Description';
import File from './File';
import Advance from './Advance';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useParams, useSearchParams } from "react-router-dom";

const validationSchema = Yup.object().shape({
  product_name: Yup.string().required('Product Name  is required'),
  product_name_bn: Yup.string().required('Product Name  is required'),
  unit_id: Yup.string().required('Unit Type is required'),
  category_id: Yup.string().required('Category is required'),
  unit: Yup.string().required('Unit  is required'),
});

const AddProduct = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedHighlightId, setSelectedHighlightId] = useState('');
  const [selectedTagId, setSelectedTagId] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState('');
  const [selectedVatTypeId, setSelectedVatTypeId] = useState('');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState('');
  const [barcode, setBarcode] = useState('');
  const [productSku, setProductSku] = useState('');
  let navigate = useNavigate();
  const showToast = useToast();
  const { id } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();


  const [value, setValue] = useState('1');
  const initialValues = useMemo(() => ({
    assign_user_id: Object.keys(selectedData).length > 0 ? selectedData.assign_user_id : '',
    hightlight_type_id: Object.keys(selectedData).length > 0 ? selectedData.hightlight_type_id : '',
    product_tag: Object.keys(selectedData).length > 0 ? selectedData.product_tag : [],
    category_id: Object.keys(selectedData).length > 0 ? selectedData.category_id : '',
    brand_id: Object.keys(selectedData).length > 0 ? selectedData.brand_id : '',
    unit_id: Object.keys(selectedData).length > 0 ? selectedData.unit_id : '',
    unit: Object.keys(selectedData).length > 0 ? selectedData.unit : '',
    country_id: Object.keys(selectedData).length > 0 ? selectedData.country_id : '',
    product_name: Object.keys(selectedData).length > 0 ? selectedData.product_name : '',
    product_name_bn: Object.keys(selectedData).length > 0 ? selectedData.product_name_bn : '',
    product_slug: Object.keys(selectedData).length > 0 ? selectedData.product_slug : '',
    product_code: Object.keys(selectedData).length > 0 ? selectedData.product_code : '',
    product_sku: Object.keys(selectedData).length > 0 ? selectedData.product_sku : '',
    mfg_model_no: Object.keys(selectedData).length > 0 ? selectedData.mfg_model_no : '',
    barcode: Object.keys(selectedData).length > 0 ? selectedData.barcode : '',
    weight: Object.keys(selectedData).length > 0 ? selectedData.weight : '',
    alert_quantity: Object.keys(selectedData).length > 0 ? selectedData.alert_quantity : '',
    max_order_quantity: Object.keys(selectedData).length > 0 ? selectedData.max_order_quantity : '',
    purchase_price: Object.keys(selectedData).length > 0 ? selectedData.purchase_price : '',
    wholesale_price: Object.keys(selectedData).length > 0 ? selectedData.wholesale_price : '',
    sale_price: Object.keys(selectedData).length > 0 ? selectedData.sale_price : '',
    app_price: Object.keys(selectedData).length > 0 ? selectedData.app_price : '',
    discount: Object.keys(selectedData).length > 0 ? selectedData.discount : '',
    vat: Object.keys(selectedData).length > 0 ? selectedData.vat : '',
    discount_flat: Object.keys(selectedData).length > 0 ? selectedData.discount_flat : '',
    short_desc: Object.keys(selectedData).length > 0 ? selectedData.short_desc : '',
    meta_title: Object.keys(selectedData).length > 0 ? selectedData.meta_title : '',
    meta_desc: Object.keys(selectedData).length > 0 ? selectedData.meta_desc : '',
    alt_text: Object.keys(selectedData).length > 0 ? selectedData.alt_text : '',
    desc: Object.keys(selectedData).length > 0 ? selectedData.desc : '',
    video_link: Object.keys(selectedData).length > 0 ? selectedData.video_link : '',
    expire_date: Object.keys(selectedData).length > 0 ? selectedData.expire_date : '',
    opening_qty: Object.keys(selectedData).length > 0 ? selectedData.opening_qty : '',
    expire_note: Object.keys(selectedData).length > 0 ? selectedData.expire_note : '',
    lot: Object.keys(selectedData).length > 0 ? selectedData.lot : '',
  }));

  const generateRandomString = (length) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      result += alphabet.charAt(randomIndex);
    }

    return result;
  }
  const generateRandomNumber = (length) => {
    const alphabet = '1234567890';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      result += alphabet.charAt(randomIndex);
    }

    return result;
  }
  const generateBarcode = () => {
    const random = generateRandomString(12);
    setBarcode(random);
  }
  const generateSku = () => {
    const random = generateRandomNumber(8);
    setProductSku(random);
  }

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (id) {
      getProductInfo(id);
    }
  }, [id]);
  useEffect(() => {
    if (searchParams.get('tab') === 'price') {
      setValue("2")
    }
  }, []);
  useEffect(() => {
    if (Object.keys(selectedData).length > 0) {
      setProductInfo();
    }
  }, [selectedData]);

  const setProductInfo = () => {
    // console.log('tags', selectedData.product_tag.split(','))
    setSelectedBrandId(selectedData.brand_id)
    setSelectedUserId(selectedData.assign_user_id)
    setSelectedCategoryId(selectedData.category_id);
    setSelectedHighlightId(selectedData.hightlight_type_id);
    setBarcode(selectedData.barcode);
    setProductSku(selectedData.product_sku);
    setSelectedVatTypeId(selectedData.vat_type);
    setSelectedCountryId(selectedData.country_id);
    setSelectedWarehouseId(selectedData.warehouse_id);
    if (selectedData.product_tag) {
      setSelectedTagId(selectedData.product_tag?.split(','));
    }
    setSelectedUnitId(selectedData.unit_id)
  }

  const getProductInfo = async (id) => {
    const response = await axios.get(`${baseUrl}/getProduct/${id}`, {
      headers: headers
    });
    setSelectedData(response.data.data);
  }

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('assign_user_id', selectedUserId ?? '');
      formData.append('hightlight_type_id', selectedHighlightId ?? '');
      formData.append('category_id', values.category_id ?? '');
      formData.append('brand_id', selectedBrandId ?? '');
      formData.append('warehouse_id', selectedWarehouseId ?? '');
      formData.append('unit_id', values.unit_id ?? '');
      formData.append('unit', values.unit);
      formData.append('country_id', selectedCountryId ?? '');
      formData.append('product_tag', selectedTagId ?? '');
      formData.append('product_name', values.product_name ?? '');
      formData.append('product_name_bn', values.product_name_bn ?? '');
      formData.append('product_slug', values.product_slug ?? '');
      formData.append('product_code', values.product_code ?? '');
      formData.append('product_sku', productSku ?? '');
      formData.append('mfg_model_no', values.mfg_model_no ?? '');
      formData.append('barcode', barcode ?? '');
      formData.append('weight', values.weight ?? '');
      formData.append('alert_quantity', values.alert_quantity ?? '');
      formData.append('max_order_quantity', values.max_order_qty ?? '');
      formData.append('purchase_price', values.purchase_price ?? '');
      formData.append('wholesale_price', values.wholesale_price ?? '');
      formData.append('sale_price', values.sale_price ?? '');
      formData.append('app_price', values.app_price ?? '');
      formData.append('discount', values.discount ?? '');
      formData.append('vat', values.vat ?? '');
      formData.append('vat_type', selectedVatTypeId ?? '');
      formData.append('discount_flat', values.discount_flat ?? '');
      formData.append('short_desc', values.short_desc ?? '');
      formData.append('meta_title', values.meta_title ?? '');
      formData.append('meta_desc', values.meta_desc ?? '');
      formData.append('alt_text', values.alt_text ?? '');
      formData.append('desc', values.desc ?? '');
      formData.append('video_link', values.video_link ?? '');
      formData.append('opening_qty', values.opening_qty ?? '');
      formData.append('expire_note', values.expire_note ?? '');
      formData.append('lot', values.lot ?? '');
      formData.append('expire_date', values.expire_date ?? '');

      if (Object.keys(selectedData).length > 0) {
        formData.append('_method', 'PUT');
      }
      if (values.product_thumbnail) {
        formData.append('product_thumbnail', values.product_thumbnail);
      }
      if (values.product_multiple_images) {
        values.product_multiple_images.map(file => {
          formData.append('product_multiple_images[]', file);
        })
      }
      if (values.video_thumbnail) {
        formData.append('video_thumbnail', values.video_thumbnail);
      }
      const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/products/${selectedData.id}`, formData, {
        headers: headers
      }) : await axios.post(`${baseUrl}/products`, formData, {
        headers: headers
      });
      // const response = await axios.post(`${baseUrl}/products`, formData, {
      //   headers: headers
      // });
      setValue((Number(value) + 1).toString())
      if (response.status === 201) {
        showToast('Save Successfully ', 'success');
        navigate(`/edit-product/${response.data.data.id}?tab=price`);
        // handelFatchCustomer()
        // handleCloseDialog();
      }
      if (response.status === 200) {
        // showToast('Updated Successfully ', 'success');
        //     handelFatchCustomer()
        //     handleCloseDialog();
      }
      if (response?.errors?.length > 0) {
        showToast(response.errors[0], 'error');
      }
      // handleCloseDialog()
    } catch (error) {
      showToast(error.response.data.errors[0], 'error');
    }
  };

  const handleSetData = (value, name) => {
    switch (name) {
      case 'user_id':
        setSelectedUserId(value);
        break;
      case 'highlight_id':
        setSelectedHighlightId(value);
        break;
      case 'tag_id':
        setSelectedTagId(value);
        break;
      case 'category_id':
        setSelectedCategoryId(value);
        break;
      case 'brand_id':
        setSelectedBrandId(value)
        break;
      case 'unit_id':
        setSelectedUnitId(value)
        break;
      case 'vat_type':
        setSelectedVatTypeId(value)
        break;
      case 'warehouse_id':
        setSelectedWarehouseId(value)
        break;
      case 'country_id':
        setSelectedCountryId(value)
        break;
      default:
        setValue(value)
    }
  }
  return (
    <>
      <div className="add__product__page">
        <MainCard content={false}>
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                      <Tab label="Basic Information" value="1" disabled />
                      <Tab label="Price" value="2" disabled />
                      <Tab label="Description" value="3" disabled />
                      <Tab label="File" value="4" disabled />
                      <Tab label="Advance" value="5" disabled />
                      <Tab label="Finish" value="6" disabled />
                    </TabList>
                  </Box>
                  <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {({ errors, touched, values, setFieldValue, handleChange }) => (
                      <Form>
                        <TabPanel value="1">
                          <Basic errors={errors} touched={touched} Field={Field} handleSetData={handleSetData} selectedBrandId={selectedBrandId} selectedCategoryId={selectedCategoryId}
                            selectedHighlightId={selectedHighlightId}
                            selectedTagId={selectedTagId}
                            selectedUnitId={selectedUnitId}
                            selectedCountryId={selectedCountryId}
                            barcode={barcode}
                            generateBarcode={generateBarcode}
                            generateSku={generateSku}
                            productSku={productSku}
                            selectedUserId={selectedUserId}
                            values={values}
                            handleChange={handleChange} />
                        </TabPanel>

                        <TabPanel value="2">
                          <Price errors={errors} touched={touched} Field={Field}
                            handleSetData={handleSetData} selectedVatTypeId={selectedVatTypeId} />
                        </TabPanel>

                        <TabPanel value="3">
                          <Description errors={errors} touched={touched} Field={Field}
                            handleSetData={handleSetData} setFieldValue={setFieldValue} values={values} />
                        </TabPanel>

                        <TabPanel value="4">
                          <File errors={errors} touched={touched} Field={Field}
                            handleSetData={handleSetData} setFieldValue={setFieldValue} values={values} />
                        </TabPanel>

                        <TabPanel value="5">
                          <Advance errors={errors} touched={touched} Field={Field}
                            handleSetData={handleSetData} selectedWarehouseId={selectedWarehouseId} />
                        </TabPanel>

                        <TabPanel value="6">
                          <div className="" style={{ textAlign: 'center', color: '#2196f3' }}>
                            <FaRegCircleCheck style={{ fontSize: '50px' }} />
                            <h2>Finished Successfully</h2>
                            <Link to="/products">Go to Product List</Link>
                          </div>
                        </TabPanel>
                      </Form>
                    )}
                  </Formik>
                </TabContext>

              </Box>
            </Grid>
          </CardContent>
        </MainCard>
      </div>
    </>
  );
};

export default AddProduct;
