import { baseUrl } from './apiConfig';
import { getAuth, clearAuth } from './auth';
import axios from 'axios';
import BaseApi from './BaseApi';

/**
 * Maps queries to REST API
 *
 * @param {string} url Request url with query, e.g orders?page=1
 * @param {Object} optionProps fetch options, e.g. { method: 'POST', headers: { 'Authorization': 'token' } }
 * @returns {Promise} the Promise for json
 */
const { id, token } = getAuth();
const instance = axios.create({
    baseURL: baseUrl
});

instance.defaults.headers.common.XRequestedWith = 'XMLHttpRequest';

if (id && token) {
    instance.defaults.headers.common.Authorization = token;
    instance.defaults.headers.common.id = id;
}

export function updateToken(response) {
    // localStorage.setItem('service_id', response.id);
    localStorage.setItem('serviceToken', response.token);
    instance.defaults.headers.common.Authorization = `Bearer ${response.token}`;
    // instance.defaults.headers.common.id = response.id;
    BaseApi.init(response.id, response.token);
}

export default async (url, optionsProps = {}, fileUpload) => {
    if (typeof window !== 'undefined') {
        const { id, token, logout } = getAuth();
        const instance = axios.create({
            baseURL: baseUrl
        });
        instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        instance.defaults.headers.common['Accept'] = 'application/json';
        instance.defaults.headers.common['id'] = id;
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        instance.defaults.headers.common['withCredentials'] = true;

        const options = {
            method: 'GET',
            mode: 'cors',
            url: url,
            ...optionsProps
        };

        if (fileUpload) {
            delete options.headers['Content-Type'];
        }
        try {
            const response = await instance(options);
            if (response.status === 401 || response.status === 403) {
                clearAuth();
                logout();
                throw new Error(response.statusText);
            }
            return {
                status: response.status,
                ...response.data
            };
        } catch (error) {
            console.log('error', error);
            if (error.response) {
                if (error.response.status === 401) {
                    clearAuth();
                    logout();
                    throw new Error(error.response.statusText);
                }
            } else if (error.request) {
                console.error(error.request);
            } else {
                console.error('Error', error.message);
            }
            throw error;
        }
    }
};

export const SuperUploader = async (url, optionsProps = {}) => {
    if (typeof window !== 'undefined') {
        const { id, token } = getAuth();
        const options = {
            method: 'POST',
            mode: 'cors',
            ...optionsProps,
            headers: new Headers({
                id: id,
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'X-Requested-With': 'XMLHttpRequest',
                ...optionsProps.headers
            })
        };

        try {
            const response = await fetch(`${baseUrl}/${url}`, options);
            if (response.status === 401) {
                clearAuth();
                throw new Error(response.statusText);
            }
            if (!response.ok) {
                const data = await response.json();
                const e = new Error(data.message);
                e.response = data;
                throw e;
            }

            const json = await response.json();
            return {
                status: response.status,
                ...json
            };
        } catch (error) {
            console.log('SuperFetch Error ->', error.response);
            return error.response;
        }
    }
};
