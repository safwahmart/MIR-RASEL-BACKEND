import { TabContext, TabList } from '@mui/lab';
import { Button, CardContent, FormControl, Grid, InputLabel, Select, Tab, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';

import TabPanel from '@mui/lab/TabPanel';

const OrderCreate = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <MainCard content={false}>
                <CardContent>
                    {/* Header  */}
                    <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
                        <Grid item xs={12} sm={12}>
                            {/* Search Product By barcode */}
                            <Grid item xs={12} sm={12} mb={3}>
                                <label style={{ marginBottom: '10px', display: 'block' }}>Search Product By barcode / SKU</label>
                                <TextField fullWidth variant="outlined" label="Search Product By barcode" />
                            </Grid>

                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Pending Order" value="1" />
                                        <Tab label="Confirm Order" value="2" />
                                        <Tab label="Shipped" value="3" />
                                        <Tab label="Delivered" value="4" />
                                        <Tab label="Cancelled" value="5" />
                                        <Tab label="Returned" value="6" />
                                        <Tab label="Follow Up" value="7" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1"> Akhne Table hobe r tabile er upore oije add order er plus icon ta hobe dada </TabPanel>
                                <TabPanel value="2">Akhne Table </TabPanel>
                                <TabPanel value="3">Akhne Table</TabPanel>
                                <TabPanel value="4">Akhne Table</TabPanel>
                                <TabPanel value="5">Akhne Table</TabPanel>
                                <TabPanel value="6">Akhne Table</TabPanel>
                                <TabPanel value="7">Akhne Table</TabPanel>
                            </TabContext>
                        </Grid>
                    </Grid>
                </CardContent>
            </MainCard>
        </>
    );
};

export default OrderCreate;

// <Grid item xs={12} sm={3}>
//     <label style={{ marginBottom: '10px', display: 'block' }}>Customer Mobile</label>
//     <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Customer Mobile</InputLabel>
//         <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age"></Select>
//     </FormControl>
// </Grid>;

// <Grid item xs={12} sm={3}>
//     <label style={{ marginBottom: '10px', display: 'block' }}>Warehouse</label>
//     <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Warehouse</InputLabel>
//         <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age"></Select>
//     </FormControl>
// </Grid>;
