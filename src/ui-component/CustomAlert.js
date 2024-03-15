import PropTypes from 'prop-types';

// material-ui
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { IconAlertCircle } from '@tabler/icons';

// ==============================|| KANBAN BOARD - ITEM DELETE ||============================== //

export default function CustomAlert({ title, handleClose, open, apiHandler }) {
    return (
        <Dialog
            open={open}
            onClose={() => handleClose(true)}
            keepMounted
            maxWidth="xs"
            aria-labelledby="item-delete-title"
            aria-describedby="item-delete-description"
        >
            {open && (
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconAlertCircle stroke={1} size="7em" color="#f0ad4e" />
                    </Box>
                    <DialogTitle id="item-delete-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="column-delete-description">
                            This action can not be undone. Do you want to continue?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ mr: 2 }}>
                        <Button
                            disableElevation
                            variant="contained"
                            color="error"
                            style={{ marginRight: 15, width: 80 }}
                            onClick={() => handleClose(true)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            disableElevation
                            style={{ width: 80,color:'white' }}
                            onClick={() => {
                                apiHandler();
                                handleClose(true);
                            }}
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Box>
            )}
        </Dialog>
    );
}

CustomAlert.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string
};
