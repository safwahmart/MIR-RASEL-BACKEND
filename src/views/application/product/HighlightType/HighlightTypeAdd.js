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
  name: Yup.string().required('Highlight Type is required'),
});

const HighlightTypeAdd = ({ open, handleCloseDialog, handelFatchHighlightTypes, selectedData }) => {
  const showToast = useToast();
  const { t } = useTranslation()
  const initialValues = {
    name: Object.keys(selectedData).length > 0 ? selectedData.name : '',
    name_bn: Object.keys(selectedData).length > 0 ? selectedData.name_bn : '',
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('name_bn', values.name_bn);
      if (Object.keys(selectedData).length > 0) {
        formData.append('_method', 'PUT');
      }
      const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/highlightTypes/${selectedData.id}`, formData, {
        headers: headers
      }) : await axios.post(`${baseUrl}/highlightTypes`, formData, {
        headers: headers
      });
      if (response.status === 201) {
        showToast('Save Successfully ', 'success');
        handelFatchHighlightTypes()
        handleCloseDialog();
      }
      if (response.status === 200) {
        showToast('Updated Successfully ', 'success');
        handelFatchHighlightTypes()
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
              <DialogTitle>{Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t('Your Highlight Type')}</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field name="name">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t("Enter Name")+"*"}
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
                          label={t("Enter Name bn")+"*"}
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

HighlightTypeAdd.propTypes = {
  open: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};

export default HighlightTypeAdd;
