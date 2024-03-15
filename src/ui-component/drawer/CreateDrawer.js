import PropTypes from 'prop-types';
import { Cancel } from '@mui/icons-material';
import { Box, Drawer, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 440,
        width: 440
    },
    head: {
        display: 'flex',
        background: theme.palette.secondary.main
    },
    iconBox: {
        padding: theme.spacing(2),
        cursor: 'pointer'
    },
    arrowIcon: {
        fontSize: '3rem',
        color: theme.palette.background.default
    },
    titleBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: theme.spacing(2)
    },
    body: {
        padding: theme.spacing(2)
    }
}));

const CreateDrawer = ({ open, onClose, children, title, drawerWidth = 440 }) => {
    const classes = useStyles();
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box className={classes.root} style={{ maxWidth: drawerWidth }}>
                <Box className={classes.head}>
                    <Box className={classes.iconBox} role="button" onClick={onClose}>
                        <Cancel className={classes.arrowIcon} />
                    </Box>
                    <Box className={classes.titleBox}>
                        <Typography variant="h4" color="white" align="left">
                            {title}
                        </Typography>
                    </Box>
                </Box>
                <Box className={classes.body}>{children}</Box>
            </Box>
        </Drawer>
    );
};

export default CreateDrawer;
