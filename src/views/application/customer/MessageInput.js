import { TextField } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm, useFormContext } from 'react-hook-form';

const MessageInput = ({ name, defaultValue, label, ...restProps }) => {
    const { control, errors } = useFormContext();
    return (
        <Controller
            control={control}
            name="test"
            render={({ field }) => {
                return <TextField autoFocus size="small" placeholder={label} label={label} fullWidth />;
            }}
        />
    );
};

export default MessageInput;
