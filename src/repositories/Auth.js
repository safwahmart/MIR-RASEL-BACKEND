import AuthFetch from 'api/auth';
import SuperFetch from 'api/SuperFetch';
/* eslint-disable */

const AccountAuth = {
    loginAuth: (values) => {
        const data = { ...values, social: false }
        return AuthFetch('login', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    changePassword: (values) => {
        return SuperFetch('change-pass', {
            method: 'POST',
            data: values
        });
    }
};

export default AccountAuth;
