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
  title: Yup.string().required('Title is required'),
  title_bn: Yup.string().required('Title Bn is required'),
  max_purchase_amount: Yup.string().required('Max Purchase Amount is required'),
  min_purchase_amount: Yup.string().required('Min Purchase Amount is required'),
  point: Yup.string().required('Point is required'),
});

const AttributeTypeAdd = ({ open, handleCloseDialog, handelFetchReturnReasons, selectedData }) => {
  const showToast = useToast();
  const { t } = useTranslation();
  console.log('Object.keys(selectedData).length', Object.keys(selectedData).length > 0 ? selectedData.free_delivery_amount : '')
  const initialValues = {
    title: Object.keys(selectedData).length > 0 ? selectedData.title : '',
    title_bn: Object.keys(selectedData).length > 0 ? selectedData.title_bn : '',
    max_purchase_amount: Object.keys(selectedData).length > 0 ? selectedData.max_purchase_amount : '',
    min_purchase_amount: Object.keys(selectedData).length > 0 ? selectedData.min_purchase_amount : '',
    point: Object.keys(selectedData).length > 0 ? selectedData.point : '',
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title ?? "");
      formData.append('title_bn', values.title_bn ?? "");
      formData.append('max_purchase_amount', values.max_purchase_amount ?? "");
      formData.append('min_purchase_amount', values.min_purchase_amount ?? "");
      formData.append('point', values.point ?? "");
      if (Object.keys(selectedData).length > 0) {
        formData.append('_method', 'PUT');
      }
      const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/points/${selectedData.id}`, formData, {
        headers: headers
      }) : await axios.post(`${baseUrl}/points`, formData, {
        headers: headers
      });
      if (response.status === 201) {
        showToast('Save Successfully ', 'success');
        handelFetchReturnReasons()
        handleCloseDialog();
      }
      if (response.status === 200) {
        showToast('Updated Successfully ', 'success');
        handelFetchReturnReasons()
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
              <DialogTitle>{Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t("Your Return Reason")}</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field name="title">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Title") + '*'}
                          error={errors.title && touched.title}
                          helperText={
                            errors.title && touched.title
                              ? errors.title
                              : ''
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="title_bn">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Title Bn") + '*'}
                          error={errors.title_bn && touched.title_bn}
                          helperText={
                            errors.title_bn && touched.title_bn
                              ? errors.title_bn
                              : ''
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="max_purchase_amount">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Max Purchase Amount") + '*'}
                          type="number"
                          error={errors.max_purchase_amount && touched.max_purchase_amount}
                          helperText={
                            errors.max_purchase_amount && touched.max_purchase_amount
                              ? errors.max_purchase_amount
                              : ''
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="min_purchase_amount">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Min Purchase Amount") + '*'}
                          type="number"
                          error={errors.min_purchase_amount && touched.min_purchase_amount}
                          helperText={
                            errors.min_purchase_amount && touched.min_purchase_amount
                              ? errors.min_purchase_amount
                              : ''
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="point">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Point") + '*'}
                          type="number"
                          error={errors.point && touched.point}
                          helperText={
                            errors.point && touched.point
                              ? errors.point
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
