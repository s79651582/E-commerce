import { GET_ALL_SUBCATEGORY, GET_ERROR, CREATE_SUBCATEGORY } from '../type'
import useGetData from '../../hooks/useGetData'
import { useInsertData } from '../../hooks/useInsertData'


//get all sub category
export const getAllSubCategory = (limit) => async (dispatch) => {
    try {
        //const response = await useGetData(`/api/v1/subcategories?limit=${limit}`);
        const response = await useGetData(`/api/v1/subcategories`);

        dispatch({
            type: GET_ALL_SUBCATEGORY,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}


//get list of subcategory of specific category
export const getSubcategories = (categoryId) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/categories/${categoryId}/subcategories`);
        console.log(response.data)

        dispatch({
            type: GET_ALL_SUBCATEGORY,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}


// create subCategory
export const createSubCategory = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/subcategories`, data);
        dispatch({
            type: CREATE_SUBCATEGORY,
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