import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { baseUrl } from 'api/apiConfig';
import { headers } from 'api/auth';
import axios from 'axios';
import { gridSpacing } from 'store/constant';
import AlertDashboard from './AlertDashboard';
import EarningCard from './EarningCard';
import StockOutDashboard from './StockOutDashboard';
import TotalCustomerLineChartCard from './TotalCustomerLineChartCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalProductLineChartCard from './TotalProductLineChartCard';
import TotalSaleLineChartCard from './TotalSaleLineChartCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [todaySale, setTodaySale] = useState(0);
    const [products, setProducts] = useState([]);
    // const [products, setProducts] = useState([]);
    const [totalSale, setTotalSale] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    useEffect(() => {
        setLoading(false);
        getCustomer();
        getTodaySale();
        getProduct();
        getProducts();
        getSales();
        getBarcode('today');
        getOrder('today');
    }, []);

    const getCustomer = async (id) => {
        const response = await axios.get(`${baseUrl}/totalCustomer`, {
            headers: headers
        });
        setTotalCustomer(response.data);
    }
    const getTodaySale = async (id) => {
        const response = await axios.get(`${baseUrl}/todaySale`, {
            headers: headers
        });
        setTodaySale(response.data);
    }
    const getProduct = async (id) => {
        const response = await axios.get(`${baseUrl}/totalProduct`, {
            headers: headers
        });
        setTotalProduct(response.data);
    }
    const getProducts = async (id) => {
        const response = await axios.get(`${baseUrl}/getProducts`, {
            headers: headers
        });
        setProducts(response.data.data);
    }
    const getSales = async (id) => {
        const response = await axios.get(`${baseUrl}/totalSale`, {
            headers: headers
        });
        setTotalSale(response.data);
    }
    const getBarcode = async (filter) => {
        const response = await axios.get(`${baseUrl}/saleBarcode?filter=${filter}`, {
            headers: headers
        });
        debugger;
        // setTotalSale(response.data);
    }
    const getOrder = async (filter) => {
        const response = await axios.get(`${baseUrl}/totalOrder?filter=${filter}`, {
            headers: headers
        });
        setTotalOrder(response.data);
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} totalSale={totalSale} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} totalOrder={totalOrder} handleOrder={getOrder} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalProductLineChartCard isLoading={isLoading} totalProduct={totalProduct} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalCustomerLineChartCard isLoading={isLoading} totalCustomer={totalCustomer} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalSaleLineChartCard isLoading={isLoading} todaySale={todaySale} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <AlertDashboard isLoading={isLoading} products={products} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <StockOutDashboard isLoading={isLoading} products={products} />
                    </Grid>
                    {/* <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid> */}
                    {/* <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {/* <PopularCard isLoading={isLoading} /> */}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
