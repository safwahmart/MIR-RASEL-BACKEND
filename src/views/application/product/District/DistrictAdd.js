import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  TextField,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';
import Image from 'views/shared/Image';
import { useTranslation } from 'react-i18next';
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
  name: Yup.string().required('District is required'),
  name_bn: Yup.string().required('District is required'),
  shipping_cost: Yup.string().required('Shipping Cost is required'),
});

const AttributeTypeAdd = ({ open, handleCloseDialog, handelFatchDistricts, selectedData }) => {
  const showToast = useToast();
  const { t } = useTranslation();
  console.log('Object.keys(selectedData).length', Object.keys(selectedData).length > 0 ? selectedData.free_delivery_amount : '')
  const initialValues = {
    name: Object.keys(selectedData).length > 0 ? selectedData.name : '',
    name_bn: Object.keys(selectedData).length > 0 ? selectedData.name_bn : '',
    shipping_cost: Object.keys(selectedData).length > 0 ? selectedData.shipping_cost : '',
    free_delivery_amount: Object.keys(selectedData).length > 0 ? selectedData.free_delivery_amount : '',
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name ?? "");
      formData.append('name_bn', values.name_bn ?? "");
      formData.append('shipping_cost', values.shipping_cost ?? "");
      formData.append('free_delivery_amount', values.free_delivery_amount ?? "");
      if (Object.keys(selectedData).length > 0) {
        formData.append('_method', 'PUT');
      }
      const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/districts/${selectedData.id}`, formData, {
        headers: headers
      }) : await axios.post(`${baseUrl}/districts`, formData, {
        headers: headers
      });
      if (response.status === 201) {
        showToast('Save Successfully ', 'success');
        handelFatchDistricts()
        handleCloseDialog();
      }
      if (response.status === 200) {
        showToast('Updated Successfully ', 'success');
        handelFatchDistricts()
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
          {({ errors, touched }) => (
            <Form>
              <DialogTitle>{Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t("Your District")}</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
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
                    <Field name="shipping_cost">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Enter Shipping Cost") + '*'}
                          error={errors.shipping_cost && touched.shipping_cost}
                          helperText={
                            errors.shipping_cost && touched.shipping_cost
                              ? errors.shipping_cost
                              : ''
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="free_delivery_amount">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Enter Free Delivery Cost")}
                          error={errors.free_delivery_amount && touched.free_delivery_amount}
                          helperText={
                            errors.free_delivery_amount && touched.free_delivery_amount
                              ? errors.free_delivery_amount
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

AttributeTypeAdd.propTypes = {
  open: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};

export default AttributeTypeAdd;
