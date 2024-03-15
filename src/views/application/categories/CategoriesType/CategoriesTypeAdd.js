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
import { Formik, Form, Field,  } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';

// ... (existing code remains the same)

const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

// Form validation schema using Yup
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Categories Type Name is required'),
    description: Yup.string().required().max(255, 'Description is too long'),
});

const CategoriesTypeAdd = ({ open, handleCloseDialog , handelFatchCategory}) => {
    const showToast = useToast();
    const initialValues = {
        name: '',
        description: '',
    };

    const onSubmit =async (values) => {
        const data ={
            ...values ,
            "status": "active"
        }
        try {
            const response = await axios.post(`${baseUrl}/category-type`, data, {
                headers:headers
            });

            if(response.data.success){
                showToast(response.data.message, 'success');
                handelFatchCategory()
                handleCloseDialog();
            }
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
                    {({ errors, touched }) => (
                        <Form>
                            <DialogTitle>Add Categories Type</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field name="name">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Enter Categories Type Name*"
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
                                        <Field name="description">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                    label="Enter Categories Type Description"
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
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <AnimateButton>
                                    <Button type="submit" variant="contained">
                                        Create
                                    </Button>
                                </AnimateButton>
                                <Button variant="text" color="error" onClick={handleCloseDialog}>
                                    Close
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            )}
        </Dialog>
    );
};

CategoriesTypeAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
};

export default CategoriesTypeAdd;
