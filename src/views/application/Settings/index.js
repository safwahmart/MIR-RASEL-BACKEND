import React from 'react';
import { Tabs, Tab, Paper, Box, Typography } from '@mui/material';
import CompanySetting from './CompanySetting'; // Create separate components for each setting
import OrderSetting from './OrderSetting';
import EmailSetting from './EmailSetting';
import CMSSetting from './CmsSetting.js';
import PointSetting from './PointSetting';

const Settings = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={3}>
      <Box p={3}>
        {/* <Typography variant="h4" gutterBottom>
          Settings
        </Typography> */}
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            sm={{ borderRight: 1, borderColor: 'divider' }}
            sx={{minWidth: '200px'}}
          >
            <Tab label="Company Setting" />
            <Tab label="Order Setting" />
            <Tab label="Email Setting" />
            <Tab label="CMS Setting" />
            <Tab label="Point Setting" />
          </Tabs>
          
          <TabPanel value={value} index={0}>
            <CompanySetting />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OrderSetting />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <EmailSetting />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <CMSSetting />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <PointSetting />
          </TabPanel>
        </Box>
      </Box>
    </Paper>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component="div" sx={{ p: 2 }}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Settings;
