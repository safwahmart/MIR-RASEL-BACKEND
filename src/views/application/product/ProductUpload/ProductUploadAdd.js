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
} from '@mui/material';
import { Formik, Form, ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';
import { useTranslation } from 'react-i18next';
import ProductUploadFile from './ProductUploadFile';
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
});

const ProductUploadAdd = ({ open, handleCloseDialog, handelFatchProductUpload, selectedData }) => {
    const showToast = useToast();
    const { t } = useTranslation();
    const initialValues = {
    };

    const onSubmit = async (values) => {
        // debugger;
        try {
            const formData = new FormData();
            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            if (values.product_upload_file) {
                formData.append('product_upload_file', values.product_upload_file);
            }
            const response = await axios.post(`${baseUrl}/productUploads`, formData, {
                headers: headers
            });
            if (response.status === 200) {
                showToast('Save Successfully ', 'success');
                handelFatchProductUpload()
                handleCloseDialog();
            }
            if (response?.errors?.length > 0) {
                showToast(response.errors[0], 'error');
            }
            handleCloseDialog()
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
            fullWidth={true}
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
                            <DialogTitle>{Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t("Your ProductUpload")}</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <ProductUploadFile setFieldValue={setFieldValue}></ProductUploadFile>
                                        <ErrorMessage
                                            name="image"
                                            component="div"
                                            className="error"
                                        />

                                    </Grid>


                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <AnimateButton>
                                    <a href={`${process.env.REACT_APP_ASSET_BASE}/uploads/product-samples.csv`} download><Button type="button" variant="contained" >
                                        {t("Download Sample")}
                                    </Button></a>
                                </AnimateButton>
                                <AnimateButton>
                                    <a href={`${process.env.REACT_APP_ASSET_BASE}/uploads/product-upload-required-data.xlsx`} download><Button type="button" variant="contained">
                                        {t("Download Require Data")}
                                    </Button></a>
                                </AnimateButton>
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

ProductUploadAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
};

export default ProductUploadAdd;
