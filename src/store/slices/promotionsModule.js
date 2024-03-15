import { createSlice, createSelector } from '@reduxjs/toolkit';
import PromotionsRepo from 'repositories/PromotionsRepo';
import { openSnackbar } from './snackbar';

const promotionsModuleSlice = createSlice({
    name: 'promotionsModule',
    initialState: {
        loading: false,
        error: null,
        data: [],
        single: {},
        singleLoading: false
    },
    reducers: {
        // GET All promotions
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
        //create promotions
        createPromotion: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        createPromotionSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        createPromotionFailed: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        // Get promotions Details
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
        // update promotions
        updatePromotions: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        updatePromotionsSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        updatePromotionsFailed: (state, action) => {
            state.loading = false;
            state.error = null;
        },

        updatePromotionsImageSuccess: (state, action) => {
            state.blogImage = action.payload;
        },
        //delete promotions
        deletePromotions: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        deletePromotionsSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        deletePromotionsFailed: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        //push promotions
        pushPromotions: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        pushPromotionsSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        pushPromotionsFailed: (state, action) => {
            state.loading = false;
            state.error = true;
        }
    }
});

const { actions, reducer } = promotionsModuleSlice;

const getPromotions = (state) => state.promotionsModule.data;
const getIsLoading = (state) => state.promotionsModule.loading;
const getSingleLoading = (state) => state.promotionsModule.singleLoading;
const singlePromotion = (state) => state.promotionsModule.single;

const selectors = {
    data: createSelector(getPromotions, (data) => data),
    isLoading: createSelector(getIsLoading, (data) => data),
    single: createSelector(singlePromotion, (data) => data),
    singleLoading: createSelector(getSingleLoading, (data) => data)
};

const getAll = (query) => async (dispatch) => {
    dispatch(actions.getAll());
    try {
        const response = await PromotionsRepo.getAll(query);
        if (response.success || response.status === 200) {
            dispatch(actions.getAllSuccess(response));
            return {
                data: response.data,
                page: response.current_page - 1,
                totalCount: response.total
            };
        } else {
            throw Error(response.errMgs ? response.errMgs : 'Get All Promotions Failed');
        }
    } catch (error) {
        console.log(error);
        dispatch(actions.getAllFailed(error.message));
        return error;
    }
};

const createPromotion = (query, formData) => async (dispatch) => {
    dispatch(actions.createPromotion());
    try {
        const response = await PromotionsRepo.createPromotions(query, formData);
        if (response.success || response.status === 200) {
            dispatch(actions.createPromotionSuccess(response));
            dispatch(
                openSnackbar({
                    open: true,
                    message: response.message,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
            return { ...response };
        } else {
            const e = new Error(response.message);
            e.response = response;
            throw e;
        }
    } catch (error) {
        dispatch(actions.createPromotionFailed(error.message));
        dispatch(
            openSnackbar({
                open: true,
                message: 'Failed to create Promotions',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                close: true
            })
        );
        return error.response;
    }
};

const getSingle = (query) => async (dispatch) => {
    dispatch(actions.getSingle());
    try {
        const response = await PromotionsRepo.getSingle(query);
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

const updatePromotions = (id, query, formData) => async (dispatch) => {
    dispatch(actions.updatePromotions());
    try {
        const response = await PromotionsRepo.updatePromotions(id, query, formData);

        if (response.success || response.status === 200) {
            dispatch(actions.updatePromotionsSuccess(response));
            dispatch(
                openSnackbar({
                    open: true,
                    message: response.message,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
            return {
                ...response
            };
        } else {
            throw Error(response.errMgs ? response.errMgs : ' Blog Update Failed');
        }
    } catch (error) {
        console.log(error);
        dispatch(actions.updatePromotionsFailed(error.message));
        dispatch(
            openSnackbar({
                open: true,
                message: 'Failed to update Promotions',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                close: true
            })
        );
        return error;
    }
};

const deletePromotions = (query, formData) => async (dispatch) => {
    dispatch(actions.deletePromotions());
    try {
        const response = await PromotionsRepo.deletePromotions(query, formData);
        if (response.success || response.status === 200) {
            dispatch(actions.deletePromotionsSuccess(response));
            dispatch(
                openSnackbar({
                    open: true,
                    message: response.message,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
            return { ...response };
        } else {
            throw Error(response.message ? response.message : 'Failed to delete Promtoion');
        }
    } catch (error) {
        console.log(error);
        dispatch(actions.deletePromotionsFailed(error.message));
        dispatch(
            openSnackbar({
                open: true,
                message: 'Failed to delete Promtions.',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                close: true
            })
        );

        return error;
    }
};

const pushPromotions = (query, formData) => async (dispatch) => {
    dispatch(actions.pushPromotions());
    try {
        const response = await PromotionsRepo.pushPromotions(query, formData);
        if (response.success || response.status === 200) {
            dispatch(actions.pushPromotionsSuccess(response));
            dispatch(
                openSnackbar({
                    open: true,
                    message: response.message,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
            return { ...response };
        } else {
            throw Error(response.message ? response.message : 'Failed to push promotions');
        }
    } catch (error) {
        console.log(error);
        dispatch(actions.pushPromotionsFailed(error.message));
        dispatch(
            openSnackbar({
                open: true,
                message: 'Failed to push Promtions.',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                close: true
            })
        );
        return error;
    }
};

export default {
    actions,
    reducer,
    selectors,
    getAll,
    getSingle,
    createPromotion,
    updatePromotions,
    deletePromotions,
    pushPromotions
};
