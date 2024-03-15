import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import AccountAuth from 'repositories/Auth';
import { updateToken } from 'api/SuperFetch';
import { setPermission } from 'utils/adminPermission/hasPermission';


// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    data: {
        id: null,
        token: null,
        email: null
    },
    accounts: [],
    permissionList: [],
    error: '',
    success: ''
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        //     axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
        // } else {
        //     localStorage.clear();
        //     delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                if (serviceToken) {
                    setSession(serviceToken);
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            error: '',
                            success: 'Login Successful! Welcome home! :D'
                        }
                    });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    const loginFunc = async (email, password) => {
        try {
            const response = await AccountAuth.loginAuth({ email, password });
            console.log('response', response.message);
            // if (response?.status === 422) {
            //     const allErrors = Object.keys(response?.errors).map((errKey) => {
            //         return response?.errors?.[errKey].join('\n');
            //     });
            //     return { errMsg: allErrors?.join('\n') };
            // } else if (!response.data) {
            //     return { errMsg: response.message ? response.message : 'Login Failed' };
            // } else
            if (response.status === true) {
                updateToken(response);
                setPermission(JSON.stringify(response.permissions));
                setSession(response.token);
                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        error: '',
                        success: 'Login Successful! Welcome home! :D',
                        ...response
                    }
                });
            } else if (response?.status === 422) {
                return { errMsg: response.message ? response.message : 'Login Failed' };
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    const resetPassword = (email) => console.log(email);

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return <JWTContext.Provider value={{ ...state, loginFunc, logout, resetPassword }}>{children}</JWTContext.Provider>;
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
