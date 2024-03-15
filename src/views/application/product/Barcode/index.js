import { Autocomplete, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { baseUrl } from 'api/apiConfig'
import { headers } from 'api/auth'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import Barcode from 'react-barcode'
import { useTranslation } from 'react-i18next'
import { useReactToPrint } from 'react-to-print'
import MainCard from 'ui-component/cards/MainCard'

const pageSize = `
    @page {
      size: 30mm 20mm ;
      margin-bottom: 20mm;
    }
    @media all{
      .pageBreak{
        display: none
      }
    }
    @media print{
      .pageBreak{
        page-break-before: always;
      }
    }
    @media print {
      html, body {
        height: 100vh; /* Use 100% here to support printing more than a single page*/
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden;
      }
    }
    
`

export default function BarcodeGenerator() {
  const { t } = useTranslation()
  const language = localStorage.getItem('i18nextLng');
  const [products, setProducts] = useState([])
  const [searchProducts, setSearchProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(products[0] || null);
  const [variations, setVariation] = useState([])
  const [selectedVariation, setSelectedVariation] = useState([])
  const [qty, setQty] = useState(0)
  const componentRef = useRef();

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const response = await axios.get(`${baseUrl}/allProduct`, {
      headers: headers
    });
    setProducts(response.data.data);
  }
  const getVariation = async (id) => {
    const response = await axios.get(`${baseUrl}/getVariation/${id}`, {
      headers: headers
    });
    return response.data.data;
  }
  const handleProduct = async (e) => {
    const product = e.target.value;
    const variationData = await getVariation(product);
    setVariation(variationData);
  }
  const handleBarcode = async (e) => {
    const getProduct = await axios.post(`${baseUrl}/getProduct`, { product_id: selectedProduct, variation_id: selectedVariation }, {
      headers: headers
    });
    setSearchProducts(getProduct.data.data)
    // products.filter(res=>{
    //   if(res.id === selectedProduct){
    //     return res
    //   }
    // })
  }
  const Print = () => {
    //console.log('print');  
    let printContents = document.getElementById('printarea').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();

    document.body.innerHTML = originalContents;
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: pageSize
  });
  console.log('searchProducts', qty)
  return (
    <form>
      <MainCard title={t('Barcode')} content={false}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <FormControl style={{ minWidth: 350 }}>
                {/* <InputLabel id="demo-simple-select-filled-label">{t('Select Product')}</InputLabel> */}
                <Autocomplete
                  options={products}
                  getOptionLabel={(option) =>
                    language === 'bn' ? option.product_name_bn : option.product_name
                  }
                  value={selectedProduct}
                  onChange={(e, value) => { setSelectedProduct(value); handleProduct(e) }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Product"
                      fullWidth
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl style={{ minWidth: 140 }}>
                <InputLabel id="demo-simple-select-filled-label">{t('Select Variation')}</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  fullWidth
                  value={selectedVariation}
                  required
                  label="Variation"
                  onChange={(e) => setSelectedVariation(e.target.value)}
                >
                  <MenuItem value="" selected>
                    <em>None</em>
                  </MenuItem>
                  {variations?.length > 0 && variations.map((option, index) => {
                    return <MenuItem key={index} value={option.id}>
                      {language === 'bn' ? option.name_bn : option.name}
                    </MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                type='number'
                label="Qty"
                defaultValue={'Qty'}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" onClick={handleBarcode}>Genarate Barcode</Button>
            </Grid>
            <Grid spacing={2} mt={3} xs={12}>
              <Button style={{ float: "right" }} variant="contained" onClick={() => handlePrint()}>Print Barcode</Button>
            </Grid>
            <Grid spacing={2} mt={3}>
              <div id="printarea" style={{ textAlign: 'center' }} ref={componentRef}>
                {searchProducts.map(res => {
                  return qty !== '' && Array.from(Array(parseInt(qty)), (e, i) => {

                    // return <CardContent>
                    //   <Typography variant="h5" component="div">
                    //     {res?.product_name}{ }
                    //   </Typography>
                    //   <Barcode value={res?.barcode} format="CODE256" height={40} />

                    //   <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    //     ৳ {res?.sale_price !== 0 ? res?.sale_price : 0}
                    //   </Typography>
                    // </CardContent>

                    return <Card >
                      {/* <CardTitle title={res?.product_name} subtitle={res?.product_name}/> */}
                      <Typography variant="h5" component="div">
                        {res?.product_name}{ }
                      </Typography>
                      <CardContent>
                        {/* <Barcode value={res?.barcode} format="CODE128" /> */}
                        <Barcode value={res?.barcode} format="CODE39" height={40} width={1} />
                      </CardContent>
                    </Card>
                  })
                })}
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </MainCard>
    </form>
  )
}
