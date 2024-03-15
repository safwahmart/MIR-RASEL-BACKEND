import { baseUrl } from './apiConfig';
import jwt_decode from "jwt-decode";
/* eslint-disable */
export const getAuth = () => {
    const id = localStorage.getItem('service_id');
    const token = localStorage.getItem('serviceToken');
    return {
        id,
        token
    };
};

export const token=localStorage.getItem('serviceToken');

export const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/multipart/form-data',
    'X-Requested-With': 'XMLHttpRequest',
};


export const isTokenExpired = (token) => {
    const tokenData = jwt_decode(token); // You may need a token decoding library
    const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
    return Date.now() > expirationTime;
  }

export const clearAuth = () => {
    localStorage.clear();
    window.location.reload(false);
};

export default async (url, optionsProps = {}) => {
    const options = {
        method: 'GET',
        mode: 'cors',
        ...optionsProps,
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...optionsProps.headers
        })
    };

    try {
        const response = await fetch(`${baseUrl}/${url}`, options);
        console.log('before', response);
        let res = await response.json();
        if (response.status === 422) {
            const errorRes = {
                status: response.status,
                ...res
            };
            return errorRes;
        } else if (response.status === 200) {
            return res;
        } else if (response.status === 401) {
            return res;
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.log('---AUTH ERROR---', error);
        return error;
    }
};
