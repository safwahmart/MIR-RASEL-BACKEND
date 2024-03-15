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
import { useTranslation } from 'react-i18next';
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
  from_amount: Yup.string().required('From Amount is required'),
  to_amount: Yup.string().required('To Amount is required'),
  discount: Yup.string().required('Discount is required'),
});

const AttributeTypeAdd = ({ open, handleCloseDialog, handelFetchShippingCostDisc, selectedData }) => {
  const showToast = useToast();
  const { t } = useTranslation();
  console.log('Object.keys(selectedData).length', Object.keys(selectedData).length > 0 ? selectedData.free_delivery_amount : '')
  const initialValues = {
    from_amount: Object.keys(selectedData).length > 0 ? selectedData.from_amount : '',
    to_amount: Object.keys(selectedData).length > 0 ? selectedData.to_amount : '',
    discount: Object.keys(selectedData).length > 0 ? selectedData.discount : '',
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('from_amount', values.from_amount ?? "");
      formData.append('to_amount', values.to_amount ?? "");
      formData.append('discount', values.discount ?? "");

      if (Object.keys(selectedData).length > 0) {
        formData.append('_method', 'PUT');
      }
      const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/shippingCostDiscounts/${selectedData.id}`, formData, {
        headers: headers
      }) : await axios.post(`${baseUrl}/shippingCostDiscounts`, formData, {
        headers: headers
      });
      if (response.status === 201) {
        showToast('Save Successfully ', 'success');
        handelFetchShippingCostDisc()
        handleCloseDialog();
      }
      if (response.status === 200) {
        showToast('Updated Successfully ', 'success');
        handelFetchShippingCostDisc()
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
              <DialogTitle>{Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t("Your Extra Shipping Cost")}</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field name="from_amount">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("From Amount") + '*'}
                          type="number"
                          error={errors.from_amount && touched.from_amount}
                          helperText={
                            errors.from_amount && touched.from_amount
                              ? errors.from_amount
                              : ''
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="to_amount">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("To Amount") + '*'}
                          type="number"
                          error={errors.to_amount && touched.to_amount}
                          helperText={
                            errors.to_amount && touched.to_amount
                              ? errors.to_amount
                              : ''
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="discount">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Discount") + '*'}
                          type="number"
                          error={errors.discount && touched.discount}
                          helperText={
                            errors.discount && touched.discount
                              ? errors.discount
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
