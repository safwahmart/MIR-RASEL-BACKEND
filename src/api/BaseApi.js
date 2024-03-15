import Axios from 'axios';

import { baseUrl } from './apiConfig';

export default class BaseApi {
    static Axios = Axios.create({
        baseURL: baseUrl,
        validateStatus: (status) => status < 500
    });

    static init = (id, token) => {
        this.Axios.defaults.headers.common.Authorization = token;
        this.Axios.defaults.headers.common.id = id;
        this.Axios.defaults.headers.common.XRequestedWith = 'XMLHttpRequest';
    };
}
