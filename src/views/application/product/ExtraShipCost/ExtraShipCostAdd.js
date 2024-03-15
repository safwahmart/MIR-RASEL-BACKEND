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
  from_weight: Yup.string().required('From Weight is required'),
  to_weight: Yup.string().required('To Weight is required'),
  extra_cost: Yup.string().required('Extra Cost is required'),
});

const AttributeTypeAdd = ({ open, handleCloseDialog, handelFetchExtraShipCost, selectedData }) => {
  const showToast = useToast();
  const { t } = useTranslation();
  console.log('Object.keys(selectedData).length', Object.keys(selectedData).length > 0 ? selectedData.free_delivery_amount : '')
  const initialValues = {
    from_weight: Object.keys(selectedData).length > 0 ? selectedData.from_weight : '',
    to_weight: Object.keys(selectedData).length > 0 ? selectedData.to_weight : '',
    extra_cost: Object.keys(selectedData).length > 0 ? selectedData.extra_cost : '',
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('from_weight', values.from_weight.toFixed(2) ?? "");
      formData.append('to_weight', values.to_weight.toFixed(2) ?? "");
      formData.append('extra_cost', values.extra_cost.toFixed(2) ?? "");

      if (Object.keys(selectedData).length > 0) {
        formData.append('_method', 'PUT');
      }
      const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/extraShippCosts/${selectedData.id}`, formData, {
        headers: headers
      }) : await axios.post(`${baseUrl}/extraShippCosts`, formData, {
        headers: headers
      });
      if (response.status === 201) {
        showToast('Save Successfully ', 'success');
        handelFetchExtraShipCost()
        handleCloseDialog();
      }
      if (response.status === 200) {
        showToast('Updated Successfully ', 'success');
        handelFetchExtraShipCost()
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
                    <Field name="from_weight">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("From Weight") + '*'}
                          type="number"
                          error={errors.from_weight && touched.from_weight}
                          helperText={
                            errors.from_weight && touched.from_weight
                              ? errors.from_weight
                              : ''
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="to_weight">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("To Weight") + '*'}
                          type="number"
                          error={errors.to_weight && touched.to_weight}
                          helperText={
                            errors.to_weight && touched.to_weight
                              ? errors.to_weight
                              : ''
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="extra_cost">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Extra Cost") + '*'}
                          type="number"
                          error={errors.extra_cost && touched.extra_cost}
                          helperText={
                            errors.extra_cost && touched.extra_cost
                              ? errors.extra_cost
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
