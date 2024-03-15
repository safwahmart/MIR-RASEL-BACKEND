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
  serial_no: Yup.string().required('Serial No is required'),
});

const AttributeTypeAdd = ({ open, handleCloseDialog, handelFetchReturnReasons, selectedData }) => {
  const showToast = useToast();
  const { t } = useTranslation();
  console.log('Object.keys(selectedData).length', Object.keys(selectedData).length > 0 ? selectedData.free_delivery_amount : '')
  const initialValues = {
    title: Object.keys(selectedData).length > 0 ? selectedData.title : '',
    title_bn: Object.keys(selectedData).length > 0 ? selectedData.title_bn : '',
    description: Object.keys(selectedData).length > 0 ? selectedData.description : '',
    description_bn: Object.keys(selectedData).length > 0 ? selectedData.description_bn : '',
    serial_no: Object.keys(selectedData).length > 0 ? selectedData.serial_no : '',
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title ?? "");
      formData.append('title_bn', values.title_bn ?? "");
      formData.append('description', values.description ?? "");
      formData.append('description_bn', values.description_bn ?? "");
      formData.append('serial_no', values.serial_no ?? "");
      if (Object.keys(selectedData).length > 0) {
        formData.append('_method', 'PUT');
      }
      const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/returnReasons/${selectedData.id}`, formData, {
        headers: headers
      }) : await axios.post(`${baseUrl}/returnReasons`, formData, {
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
                    <Field name="description">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Description") + ''}
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
                          label={t("Description Bn") + ''}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="serial_no">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Serial No") + '*'}
                          type="number"
                          error={errors.serial_no && touched.serial_no}
                          helperText={
                            errors.serial_no && touched.serial_no
                              ? errors.serial_no
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
