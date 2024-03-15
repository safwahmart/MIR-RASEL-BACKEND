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
import Notification from 'views/shared/Notification';
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const validationSchema = Yup.object().shape({
    // name: Yup.string().required('Feedbacks Name is required'),
    // image: Yup.string().required('Image is required'),
});

const FeedbacksAdd = ({ open, handleCloseDialog, handelFatchFeedbacks, selectedData }) => {
    const showToast = useToast();
    const { t } = useTranslation();
    const initialValues = {
        image: Object.keys(selectedData).length > 0 ? selectedData.image : '',
    };

    const onSubmit = async (values) => {
        debugger;
        try {
            const formData = new FormData();
            if (Object.keys(selectedData).length > 0) {
                formData.append('_method', 'PUT');
            }
            if (values.image) {
                formData.append('image', values.image);
            }
            const response = Object.keys(selectedData).length > 0 ? await axios.post(`${baseUrl}/popupNotifications/${selectedData.id}`, formData, {
                headers: headers
            }) : await axios.post(`${baseUrl}/feedbacks`, formData, {
                headers: headers
            });
            if (response.status === 201) {
                showToast('Save Successfully ', 'success');
                handelFatchFeedbacks()
                handleCloseDialog();
            }
            if (response.status === 200) {
                showToast('Updated Successfully ', 'success');
                handelFatchFeedbacks()
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
                            <DialogTitle>{Object.keys(selectedData).length > 0 ? t('Edit') : t('Add')} {t("Your Feedbacks")}</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2} width={500}>

                                    <Grid item xs={12}>
                                        <Notification setFieldValue={setFieldValue}></Notification>
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

FeedbacksAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
};

export default FeedbacksAdd;
