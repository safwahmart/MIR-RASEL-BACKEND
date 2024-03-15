import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';
import { useTranslation } from 'react-i18next';
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Attribute is required'),
  attribute_type_id: Yup.string().required('Attribute Type is required'),
});

const AttributeAdd = ({ open, handleCloseDialog, handelFatchAttributes, selectedData }) => {
  const showToast = useToast();
  const [attributeTypes, setAttributeTypes] = useState([])
  const [selectedType, setSelectedType] = useState(Object.keys(selectedData).length > 0 ? selectedData.attribute_type_id : "")
  const { t } = useTranslation();
  const initialValues = {
    name: Object.keys(selectedData).length > 0 ? selectedData.name : '',
    name_bn: Object.keys(selectedData).length > 0 ? selectedData.name_bn : '',
    color_code: Object.keys(selectedData).length > 0 ? selectedData.color_code : '',
    description: Object.keys(selectedData).length > 0 ? selectedData.description : '',
    description_bn: Object.keys(selectedData).length > 0 ? selectedData.description_bn : '',
    attribute_type_id: Object.keys(selectedData).length > 0 ? selectedData.attribute_type_id : '',
  };
  const language = localStorage.getItem('i18nextLng');
  useEffect(() => {
    getAttributeTypesData();
  }, []);

  const getAttributeTypesData = async () => {
    const response = await axios.get(`${baseUrl}/attributeTypes`, {
      headers: headers
    });
    setAttributeTypes(response.data.data);
  }

  const handleAttributeType = (e) => {
    setSelectedType(e.target.value);
  }

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('name_bn', values.name_bn);
      formData.append('color_code', values.color_code ?? "");
      formData.append('description', values.description ?? "");
      formData.append('description_bn', values.description_bn ?? "");
      formData.append('attribute_type_id', values.attribute_type_id);
      if (Object.keys(selectedData).length > 0) {
        formData.append('_method', 'PUT');
      }
      const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/attributes/${selectedData.id}`, formData, {
        headers: headers
      }) : await axios.post(`${baseUrl}/attributes`, formData, {
        headers: headers
      });
      if (response.status === 201) {
        showToast('Save Successfully ', 'success');
        handelFatchAttributes()
        handleCloseDialog();
      }
      if (response.status === 200) {
        showToast('Updated Successfully ', 'success');
        handelFatchAttributes()
        handleCloseDialog();
      }
      if (response?.errors?.length > 0) {
        showToast(response.errors[0], 'error');
      }
      handleCloseDialog()
    } catch (error) {
      showToast(error.response.data.errors[0], 'error');
    }
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
    // ... (existing sx styles)
    >
      {open && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              <DialogTitle>{Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t("Your Attribute")}</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-filled-label">{t('Attribute Type')}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      fullWidth
                      // value={selectedType}
                      value={values.attribute_type_id}
                      label="Attribute Type"
                      // onChange={handleAttributeType}
                      onChange={e => setFieldValue('attribute_type_id', e.target.value)}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {attributeTypes.length > 0 && attributeTypes.map((option, index) => {
                        return <MenuItem key={index} value={option.id}>
                          {language === 'bn' ? option.name_bn : option.name}
                        </MenuItem>
                      })}
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="name">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Enter Name") + '*'}
                          error={errors.name && touched.name}
                          helperText={
                            errors.name && touched.name
                              ? errors.name
                              : ''
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="name_bn">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Enter Name bn") + '*'}
                          error={errors.name_bn && touched.name_bn}
                          helperText={
                            errors.name_bn && touched.name_bn
                              ? errors.name_bn
                              : ''
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="color_code">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Enter Color Code") + '*'}
                          error={errors.color_code && touched.color_code}
                          helperText={
                            errors.color_code && touched.color_code
                              ? errors.color_code
                              : ''
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="description">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          multiline
                          rows={3}
                          label={t("Enter description") + '*'}
                          error={errors.description && touched.description}
                          helperText={
                            errors.description && touched.description
                              ? errors.description
                              : ''
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="description_bn">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          multiline
                          rows={3}
                          label={t("Enter description bn") + '*'}
                          error={errors.description_bn && touched.description_bn}
                          helperText={
                            errors.description_bn && touched.description_bn
                              ? errors.description_bn
                              : ''
                          }
                        />
                      )}
                    </Field>
                  </Grid>

                </Grid>
              </DialogContent>
              <DialogActions>
                <AnimateButton>
                  <Button type="submit" variant="contained">
                    {Object.keys(selectedData).length > 0 ? t("Update") : t("Create")}
                  </Button>
                </AnimateButton>
                <Button variant="text" color="error" onClick={handleCloseDialog}>
                  {t("Close")}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};

AttributeAdd.propTypes = {
  open: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};

export default AttributeAdd;
