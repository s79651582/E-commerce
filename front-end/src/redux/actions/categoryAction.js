import { GET_ALL_CATEGORY, GET_ONE_CATEGORY, GET_ERROR, CREATE_CATEGORY } from '../type'
import useGetData from '../../hooks/useGetData'
import { useInsertDataWithImage } from '../../hooks/useInsertData'


//get all category
export const getAllCategory = (limit) => async (dispatch) => {
    try {
        //const response = await useGetData(`/api/v1/categories?limit=${limit}`);
        const response = await useGetData(`/api/v1/categories`);

        dispatch({
            type: GET_ALL_CATEGORY,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}


//get all category with pagination
export const getAllCategoryPage = (page = 1, limit = 10) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/categories?limit=${limit}&page=${page}`);

        dispatch({
            type: GET_ALL_CATEGORY,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}


//get one category
export const getOneCategory = (categoryID) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/categories/${categoryID}`);

        dispatch({
            type: GET_ONE_CATEGORY,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}


// create Category
export const createCategory = (formData) => async (dispatch) => {
    try {
        const response = await useInsertDataWithImage(`/api/v1/categories`, formData);
        dispatch({
            type: CREATE_CATEGORY,
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