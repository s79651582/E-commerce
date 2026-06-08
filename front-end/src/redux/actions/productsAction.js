import { GET_ALL_PRODUCT, GET_PRODUCT_DETALIS, GET_PRODUCT_SIMILAR, GET_ERROR, CREATE_PRODUCT, DELETE_PRODUCT } from '../type'
import useGetData from '../../hooks/useGetData'
import { useInsertData, useInsertDataWithImage } from '../../hooks/useInsertData'
import useDeleteData from '../../hooks/useDeleteData'


// create Product
export const createProduct = (formatData) => async (dispatch) => {
    try {
        console.log('ok')
        const response = await useInsertDataWithImage('/api/v1/products', formatData);
        dispatch({
            type: CREATE_PRODUCT,
            payload: response,
            loading: true
        })
        /* 
        لاكتشاف الاخطأ
        console.log(response);
        console.log(response.data);
        console.log(response.status);
        */

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
        /* 
        لاكتشاف الاخطأ
        console.log(response);
        console.log(response.data);
        console.log(response.status);
        */
    }
}


//get Product with limit
export const getAllProduct = (limit) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?limit=${limit}`);

        dispatch({
            type: GET_ALL_PRODUCT,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}


//get all Product with pagination
export const getAllProductPage = (page = 1, limit = 12) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?limit=${limit}&page=${page}`);

        dispatch({
            type: GET_ALL_PRODUCT,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}


//get all Product of query String
export const getAllProductSearch = (queryString) => async (dispatch) => {
    try {
        //console.log(queryString);
        
        const response = await useGetData(`/api/v1/products?${queryString}`);

        dispatch({
            type: GET_ALL_PRODUCT,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}


//get more sold Product
export const getMoreSoldProduct = (limit) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?sort=sold`);

        dispatch({
            type: GET_ALL_PRODUCT,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}


//get one Product by id
export const getOneProduct = (poductId) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products/${poductId}`);
        console.log(response.data)

        dispatch({
            type: GET_PRODUCT_DETALIS,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}


//get Products similar to the current product
export const getProductSimilar = (categoryId) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?category=${categoryId}`);
        console.log(response.data)

        dispatch({
            type: GET_PRODUCT_SIMILAR,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}


//delete Product by id
export const deleteProduct = (poductId) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/v1/products/${poductId}`);
        console.log(response.data)

        dispatch({
            type: DELETE_PRODUCT,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}