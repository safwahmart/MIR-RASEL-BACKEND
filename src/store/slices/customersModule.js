import { createSlice, createSelector } from '@reduxjs/toolkit';
import Customers from 'repositories/Customers';

const customersModuleSlice = createSlice({
    name: 'customersModule',
    initialState: {
        loading: false,
        error: null,
        data: [],
        single: {},
        singleLoading: false
    },
    reducers: {
        // GET All Customers
        getAll: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        getAllSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.data = action.payload.data;
        },
        getAllFailed: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        // Get Customer Details
        getSingle: (state, action) => {
            state.detailLoading = true;
            state.error = null;
        },
        getSingleSuccess: (state, action) => {
            state.detailLoading = false;
            state.error = null;
            state.single = action.payload.data;
        },
        getSingleFailed: (state, action) => {
            state.detailLoading = false;
            state.error = true;
        },
      
    }
});

const { actions, reducer } = customersModuleSlice;

const getCustomers = (state) => state.customersModule.data;
const getIsLoading = (state) => state.customersModule.loading;
const getSingleLoading = (state) => state.customersModule.singleLoading;
const singleCustomer = (state) => state.customersModule.single;


const selectors = {
  data: createSelector(getCustomers, (data) => data),
  isLoading: createSelector(getIsLoading, (data) => data),
  single: createSelector(singleCustomer, (data) => data),
  singleLoading: createSelector(getSingleLoading, (data) => data),
 
};

const getAll = (query) => async (dispatch) => {
  dispatch(actions.getAll());
  try {
    const response = await Customers.getAll(query);
    if (response.success || response.status === 200) {
      dispatch(actions.getAllSuccess(response));
      return {
        data: response.data,
        page: response.current_page - 1,
        totalCount: response.total,
      };
    } else {
      throw Error(response.errMgs ? response.errMgs : 'Get All Customer Failed');
    }
  } catch (error) {
    console.log(error);
    dispatch(actions.getAllFailed(error.message));
    return error;
  }
};


const getSingle = (query) => async (dispatch) => {
  dispatch(actions.getSingle());
  try {
    const response = await Customers.getSingle(query);
    if (response.success || response.status === 200) {
      dispatch(actions.getSingleSuccess(response));
      return response.data;
    } else {
      throw Error(response.errMgs ? response.errMgs : 'Get Customer Details Failed');
    }
  } catch (error) {
    console.log(error);
    dispatch(actions.getSingleFailed(error.message));
    return error;
  }
};

const getAssociatAccount = (query) => async (dispatch) => {
  dispatch(actions.getAssociatAccount());
  try {
    const response = await Customers.getAssociatAccount(query);
    if (response.success || response.status === 200) {
      dispatch(actions.getAssociatAccountSuccess(response));
      return response.data;
    } else {
      throw Error(response.errMgs ? response.errMgs : 'Get Customer Associat Account Failed');
    }
  } catch (error) {
    console.log(error);
    dispatch(actions.getAssociatAccountFailed(error.message));
    return error;
  }
};

export default {
  actions,
  reducer,
  selectors,
  getAll,
  getSingle,
  getAssociatAccount,
};
