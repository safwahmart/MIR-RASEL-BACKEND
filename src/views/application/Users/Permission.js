import React, { useState } from 'react';
import { Button, Grid, FormControlLabel, FormGroup, Checkbox, Box, IconButton, Typography, Paper } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import panel from './panelConfig';
import { headers } from 'api/auth';
import axios from 'axios';
import { baseUrl } from 'api/apiConfig';

const validationSchema = Yup.object().shape({
  // You can add validation schema if needed
});

const UserAccessPermission = () => {
  const [panels, setPanels] = useState(panel);
  const [permissions, setPermissions] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});

  const togglePanel = (panelIndex) => {
    const updatedPanels = [...panels];
    updatedPanels[panelIndex].open = !updatedPanels[panelIndex].open;
    setPanels(updatedPanels);
  };

  const handleSelectAllChange = (panelIndex) => (event) => {
    const { checked } = event.target;
    const updatedPanels = [...panels];
    updatedPanels[panelIndex].selectAll = checked;
    updatedPanels[panelIndex].fields.forEach((field) => (field.checked = checked));
    setPanels(updatedPanels);
    setPermissions([...updatedPanels]);
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [`${panels[panelIndex].name}`]: checked
    }));
  };

  const handlePermissionChange = (panelIndex, fieldName) => (event) => {
    const { checked } = event.target;
    const updatedPanels = [...panels];
    const fieldIndex = updatedPanels[panelIndex].fields.findIndex((field) => field.name === fieldName);
    updatedPanels[panelIndex].fields[fieldIndex].checked = checked;
    updatedPanels[panelIndex].selectAll = updatedPanels[panelIndex].fields.every((field) => field.checked);
    setPanels(updatedPanels);
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [`${fieldName}`]: checked
    }));
  };

  const handleSubmit = async (values, actions) => {
    const response = await axios.post(`${baseUrl}/storePermission`, { permissions: permissions, user_id: 1 }, {
      headers: headers
    });

  };
  console.log('permissions', permissions)
  return (
    <Box>
      {panels.map((panel, panelIndex) => (
        <Paper key={panel.name} variant="outlined" style={{ marginBottom: '16px' }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={2}
            py={1}
            bgcolor="#f2f2f2"
            onClick={() => togglePanel(panelIndex)}
            style={{ cursor: 'pointer' }}
          >
            <Typography variant="h6">{panel.name} Permission</Typography>
            <IconButton>{panel.open ? <RemoveIcon /> : <AddIcon />}</IconButton>
          </Box>
          {panel.open && (
            <Formik initialValues={{}} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ errors, touched, values, handleChange }) => (
                <Form>
                  <Grid container spacing={3} p={2}>
                    <Grid item xs={12}>
                      {panel.fields.length > 1 && ( // Render "Select All" checkbox only if there are more than one field
                        <FormControlLabel
                          control={
                            <Checkbox checked={panel.selectAll} onChange={handleSelectAllChange(panelIndex)} />
                          }
                          label="Select All"
                        />
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <FormGroup row>
                        {panel.fields.map((field) => (
                          <FormControlLabel
                            key={field.name}
                            control={
                              <Checkbox
                                checked={field.checked || false}
                                onChange={handlePermissionChange(panelIndex, field.name)}
                              />
                            }
                            label={field.label}
                          />
                        ))}
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          )}
        </Paper>
      ))}
      <Grid container justifyContent="flex-end">
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Grid>
    </Box>
  );
};

export default UserAccessPermission;
